import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from '../api/client';

// Types for analytics data
export interface CategoryAnalytics {
  category: string;
  _sum: {
    amount: number;
  };
}

export interface MonthlyAnalytics {
  month: string;
  total: number;
}

export interface StatusAnalytics {
  status: string;
  _count: {
    id: number;
  };
}

export interface AnalyticsState {
  byCategory: CategoryAnalytics[];
  byMonth: MonthlyAnalytics[];
  byStatus: StatusAnalytics[];
  loading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  byCategory: [],
  byMonth: [],
  byStatus: [],
  loading: false,
  error: null,
};

// Async thunk to fetch analytics data from the backend
export const fetchAnalytics = createAsyncThunk(
  'analytics/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await client.get('admin/analytics', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch analytics');
    }
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.byCategory = action.payload.byCategory;
        state.byMonth = action.payload.byMonth;
        state.byStatus = action.payload.byStatus;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default analyticsSlice.reducer;
