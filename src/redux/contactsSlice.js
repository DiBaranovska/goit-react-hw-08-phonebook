import {
  fetchAll,
  addContactThunk,
  deleteContactThunk,
} from './contacts/thunks';
import { initialStateContact } from './contacts/initialStateContact';
const { createSlice, isAnyOf } = require('@reduxjs/toolkit');

const handlePending = state => {
  state.isLoading = true;
};

const handleFulfilled = state => {
  state.isLoading = false;
  state.error = '';
};

const handleFulfilledGetContacts = (state, { payload }) => {
  state.contacts = payload;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const handleFulfilledPostContact = (state, { payload }) => {
  state.contacts.push(payload);
};

const handleFulfilledDeleteContact = (state, { payload }) => {
  state.contacts = state.contacts.filter(contact => contact.id !== payload.id);
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialStateContact,
  extraReducers: builder => {
    builder
      .addCase(fetchAll.fulfilled, handleFulfilledGetContacts)
      .addCase(addContactThunk.fulfilled, handleFulfilledPostContact)
      .addCase(deleteContactThunk.fulfilled, handleFulfilledDeleteContact)
      .addMatcher(
        isAnyOf(
          fetchAll.pending,
          addContactThunk.pending,
          deleteContactThunk.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          fetchAll.rejected,
          addContactThunk.rejected,
          deleteContactThunk.rejected
        ),
        handleRejected
      )
      .addMatcher(
        isAnyOf(
          fetchAll.fulfilled,
          addContactThunk.fulfilled,
          deleteContactThunk.fulfilled
        ),
        handleFulfilled
      );
  },
});
export const contactsReducer = contactsSlice.reducer;

const initialStateFilter = { filter: '' };

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialStateFilter,
  reducers: {
    filterContacts: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const { filterContacts } = filterSlice.actions;
