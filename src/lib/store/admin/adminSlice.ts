import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../http/api';

interface AdminState {
  users: any[];
  donors: any[];
  bloodRequests: any[];
  donations: any[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  users: [],
  donors: [],
  bloodRequests: [],
  donations: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk('admin/fetchUsers', async () => {
  const response = await API.get('admin/dashboard/users');
  return response.data.data;
});

export const fetchDonors = createAsyncThunk('admin/fetchDonors', async () => {
  const response = await API.get('admin/dashboard/donors');
  return response.data.data;
});

export const fetchBloodRequests = createAsyncThunk('admin/fetchBloodRequests', async () => {
  const response = await API.get('admin/dashboard/blood-requests');
  return response.data.data;
});

export const fetchDonations = createAsyncThunk('admin/fetchDonations', async () => {
  const response = await API.get('admin/dashboard/donations');
  return response.data.data;
});

export const deleteUser = createAsyncThunk('admin/deleteUser', async (id: string) => {
  await API.delete(`admin/dashboard/delete-user/${id}`);
  return id;
});

export const deleteDonor = createAsyncThunk('admin/deleteDonor', async (id: string) => {
  await API.delete(`admin/dashboard/delete-donor/${id}`);
  return id;
});

export const updateBloodRequestStatus = createAsyncThunk(
  'admin/updateBloodRequestStatus',
  async ({ id, status }: { id: string; status: string }) => {
    await API.put(`admin/dashboard/blood-requests/${id}`, { status });
    return { id, status };
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(fetchDonors.fulfilled, (state, action) => {
        state.donors = action.payload;
      })
      .addCase(fetchBloodRequests.fulfilled, (state, action) => {
        state.bloodRequests = action.payload;
      })
      .addCase(fetchDonations.fulfilled, (state, action) => {
        state.donations = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(deleteDonor.fulfilled, (state, action) => {
        state.donors = state.donors.filter(donor => donor.id !== action.payload);
      })
      .addCase(updateBloodRequestStatus.fulfilled, (state, action) => {
        const request = state.bloodRequests.find(req => req.id === action.payload.id);
        if (request) {
          request.status = action.payload.status;
        }
      });
  },
});

export default adminSlice.reducer;