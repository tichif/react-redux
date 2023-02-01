import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '0',
    name: 'Tichif',
  },
  {
    id: '1',
    name: 'Annie',
  },
  {
    id: '2',
    name: 'Laura',
  },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const selectedUsers = (state) => state.users;

export default usersSlice.reducer;
