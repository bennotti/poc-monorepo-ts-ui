import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LayoutState {
  layout: 'auth' | 'application';
  isSidebarCollapsed: boolean;
}

const layoutSlice = createSlice({
  initialState: {
    layout: 'application',
    isSidebarCollapsed: false,
  } as LayoutState,
  name: 'layout',
  reducers: {
    updateLayout(state, action: PayloadAction<'auth' | 'application'>) {
      state.layout = action.payload;
    },
    toggleSidebar(state) {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
  },
  extraReducers(builder) {

  },
});

export const layoutReducer = layoutSlice.reducer;

export const { updateLayout, toggleSidebar } = layoutSlice.actions;
