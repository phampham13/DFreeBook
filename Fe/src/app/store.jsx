import { configureStore } from '@reduxjs/toolkit'

import booksReducer from '../features/booksSlice'
import borrowerCardReducer from '../features/borrowerCardSlice'
import authReducer from "../features/auth";
import messageReducer from "../features/message";
import bookReducer from "../features/BookSilce";

const reducer = {
  auth: authReducer,
  books: booksReducer,
  borrowerCard: borrowerCardReducer,
  book: bookReducer,
  message: messageReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;