import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isOpen: false,
    content: null,
    showController: false,
};
const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true;
            state.content = action.payload;
            state.showController = action.payload.showController;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.content = null;
        }
    }
});
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
