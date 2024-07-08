import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { waitTwoSeconds } from "../../utils";

export const __addToDo = createAsyncThunk(
  "__addToDo",
  async (payload, thunkAPI) => {
    await waitTwoSeconds();
    return payload;
  }
);

export const __deleteTodo = createAsyncThunk(
  "__deleteToDo",
  async (payload, thunkAPI) => {
    await waitTwoSeconds();
    return payload;
  }
);

const initialState = {
  list: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // add todolist
      .addCase(__addToDo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(__addToDo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(__addToDo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // delete todolist
      .addCase(__deleteTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(__deleteTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = state.list.filter((todo) => todo.id !== action.payload.id);
      })
      .addCase(__deleteTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
