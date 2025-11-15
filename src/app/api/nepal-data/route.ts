import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch all data in parallel
    const [provincesRes, districtsRes, localLevelsRes] = await Promise.all([
      fetch('https://raw.githubusercontent.com/sandipbgt/nepal-location-api/master/api/v1/provinces.json'),
      fetch('https://raw.githubusercontent.com/sandipbgt/nepal-location-api/master/api/v1/districts.json'),
      fetch('https://raw.githubusercontent.com/sandipbgt/nepal-location-api/master/api/v1/local-levels.json')
    ]);

    // Get text first, then clean and parse
    const [provincesText, districtsText, localLevelsText] = await Promise.all([
      provincesRes.text(),
      districtsRes.text(),
      localLevelsRes.text()
    ]);

    // Clean BOM and parse JSON
    const cleanAndParse = (text: string) => {
      const cleaned = text.replace(/^\uFEFF/, '').trim();
      return JSON.parse(cleaned);
    };

    const provincesData = cleanAndParse(provincesText);
    const districtsData = cleanAndParse(districtsText);
    const localLevelsData = cleanAndParse(localLevelsText);

    return NextResponse.json({
      provinces: provincesData.provinces || [],
      districts: districtsData.districts || [],
      localLevels: localLevelsData.local_levels || []
    });

  } catch (error) {
    console.error('Error fetching Nepal data:', error);
    
    // Return comprehensive fallback data
    return NextResponse.json({
      provinces: [
        { id: 1, name: "Koshi Province" },
        { id: 2, name: "Madhesh Province" },
        { id: 3, name: "Bagmati Province" },
        { id: 4, name: "Gandaki Province" },
        { id: 5, name: "Lumbini Province" },
        { id: 6, name: "Karnali Province" },
        { id: 7, name: "Sudurpashchim Province" }
      ],
      districts: [
        { id: 1, name: "Kathmandu", province_id: 3 },
        { id: 2, name: "Lalitpur", province_id: 3 },
        { id: 3, name: "Bhaktapur", province_id: 3 },
        { id: 4, name: "Kaski", province_id: 4 },
        { id: 5, name: "Chitwan", province_id: 3 },
        { id: 6, name: "Morang", province_id: 1 },
        { id: 7, name: "Jhapa", province_id: 1 }
      ],
      localLevels: [
        { id: 1, name: "Kathmandu Metropolitan City", district_id: 1 },
        { id: 2, name: "Lalitpur Metropolitan City", district_id: 2 },
        { id: 3, name: "Bhaktapur Municipality", district_id: 3 },
        { id: 4, name: "Pokhara Metropolitan City", district_id: 4 },
        { id: 5, name: "Bharatpur Metropolitan City", district_id: 5 },
        { id: 6, name: "Biratnagar Metropolitan City", district_id: 6 },
        { id: 7, name: "Birtamod Municipality", district_id: 7 }
      ]
    });
  }
}