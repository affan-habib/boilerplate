import { createSlice } from '@reduxjs/toolkit';

// Get sidebar state from localStorage, default to true if not found
const savedSidebarState = localStorage.getItem('sidebarExpanded');
const initialSidebarState = savedSidebarState !== null ? savedSidebarState === 'true' : true;

const initialState = {
  sidebarExpanded: initialSidebarState,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarExpanded = !state.sidebarExpanded;
      localStorage.setItem('sidebarExpanded', state.sidebarExpanded);
    },
    setSidebarExpanded: (state, action) => {
      state.sidebarExpanded = action.payload;
      localStorage.setItem('sidebarExpanded', action.payload);
    },
  },
});

export const { toggleSidebar, setSidebarExpanded } = uiSlice.actions;

export default uiSlice.reducer;
