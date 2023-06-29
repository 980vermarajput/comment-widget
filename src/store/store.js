import { configureStore } from "@reduxjs/toolkit";
import { CommentSlice } from "./Slices/Comments";

export const store = configureStore({
  reducer: { comments: CommentSlice.reducer },
});
