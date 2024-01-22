import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookService from "../services/book/book.service"
import { setMessage } from "./message";
import booksSlice from "./booksSlice";
const bookInit = [];
export const AddBook = createAsyncThunk("book/addbook",

    async ({ name, title, img, author, isbn, publisher, quantityTotal, quantityAvailabel, Cateid }, thunkAPI) => {
        try {

            const response = await bookService.AddBook(name, title, img, author, isbn, publisher, quantityTotal, quantityAvailabel, Cateid);

            return response.data
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue();
        }
    }
)
export const getAllBook = createAsyncThunk("book/getall",
    async ({ }, thunkAPI) => {
        try {

            const response = await bookService.getAllbook({});
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
)
export const getDetailBook = createAsyncThunk("book/getdetail",
    async (id, thunkAPI) => {
        try {

            const response = await bookService.getBookId(id);
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
)
export const updateBook = createAsyncThunk("book/update",
    async ({ id, name, title, img, author, isbn, publisher, quantityTotal, quantityAvailabel, Cateid }, thunkAPI) => {
        try {

            const response = await bookService.UpdateBook(id, name, title, img, author, isbn, publisher, quantityTotal, quantityAvailabel, Cateid);
            thunkAPI.dispatch(setMessage(response.data.message));
            console.log("response.data", response.data)
            return response.data
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
)
export const BorrowBook = createAsyncThunk("book/borrow",
    async ({ bookid, quantity }, thunkAPI) => {
        try {

            const response = await bookService.BorrowBook(bookid, quantity);
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
)
const initialState = {

    addbooks: []
};
const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        getBookByCategory: {
            reducer(state, action) {
                state.books.filter()
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(AddBook.fulfilled, (state, action) => state.books.push(action.payload))
            .addCase(getAllBook.fulfilled, (state, action) => {
                // Xử lý khi lấy danh sách sách thành công
                // Ví dụ, cập nhật danh sách sách trong state nếu cần
                state.books = action.payload;
            })
            .addCase(getAllBook.rejected, (state, action) => {
                // Xử lý khi lấy danh sách sách bị lỗi
                // Ví dụ, có thể hiển thị thông báo lỗi
                console.error("Error getting books:", action.error);
            })
            .addCase(getDetailBook.fulfilled, (state, action) => {
                // Xử lý khi lấy thông tin chi tiết sách thành công
                // Ví dụ, cập nhật thông tin chi tiết sách trong state nếu cần
                state.bookDetail = action.payload;
            })
            .addCase(getDetailBook.rejected, (state, action) => {
                // Xử lý khi lấy thông tin chi tiết sách bị lỗi
                // Ví dụ, có thể hiển thị thông báo lỗi
                console.error("Error getting book detail:", action.error);
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                const update = action.payload;
                console.log(update)
            })
            .addCase(BorrowBook.fulfilled, (state, action) => {
                const check = action.payload
            })
            ;
    },
});

export default bookSlice.reducer;
