import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from '../api/client';

export interface Expense { id:string; amount:number; category:string; description:string; date:string; status:string; }

interface ExpenseState { list: Expense[]; }
const initialState:ExpenseState = { list: [] };

export const fetchExpenses = createAsyncThunk('expenses/fetch',
  async () => {
    const res = await client.get('/expenses');
    return res.data.data as Expense[];
  }
);
export const createExpense = createAsyncThunk('expenses/create',
  async (data: Omit<Expense,'id'|'status'>) => {
    const res = await client.post('/expenses', data);
    return res.data.data as Expense;
  }
);
export const updateStatus = createAsyncThunk('expenses/updateStatus',
  async ({id, status, remarks}: {id:string, status:string,remarks:string}) => {
    const res = await client.patch(`/admin/expenses/${id}`, {status, remarks});
    return res.data.data as Expense;
  }
);

const expenseSlice = createSlice({
  name: 'expenses', initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.list = action.payload;
    })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        const idx = state.list.findIndex(e => e.id === action.payload.id);
        if(idx > -1) state.list[idx] = action.payload;
      });
  }
});

export default expenseSlice.reducer;