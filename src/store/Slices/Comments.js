import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  commentsList: [],
};

export const CommentSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addComment: (state, action) => {
      const currentDate = new Date();

      let hour = currentDate.getHours().toString().padStart(2, "0");
      const minute = currentDate.getMinutes().toString().padStart(2, "0");

      const period = hour >= 12 ? "PM" : "AM";
      hour = hour % 12 || 12;

      const timestamp = `${hour}:${minute
        .toString()
        .padStart(2, "0")} ${period}`;

      if (action.payload?.top) {
        state.commentsList.push({
          id: new Date().getTime(),
          top: true,
          comment: action.payload.comment,
          time: timestamp,
          items: [],
        });
      } else {
        const insertNode = (tree, commentId, item) => {
          if (tree.id === commentId) {
            tree.items.push({
              id: new Date().getTime(),
              comment: item,
              time: timestamp,
              top: false,
              items: [],
            });

            return tree;
          }

          let latestNode = [];
          latestNode = tree.items.map((ob) => {
            return insertNode(ob, commentId, item);
          });
          return { ...tree, items: latestNode };
        };
        state.commentsList.map((item) =>
          insertNode(item, action.payload.id, action.payload.comment)
        );
      }
    },
    editComment: (state, action) => {
      const currentDate = new Date();

      let hour = currentDate.getHours().toString().padStart(2, "0");
      const minute = currentDate.getMinutes().toString().padStart(2, "0");
      const period = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12 || 12;
      
      const timestamp = `${hour}:${minute.toString().padStart(2, '0')} ${period}`;
      const editNode = (tree, commentId, value) => {
        if (tree.id === commentId) {
          tree.comment = value;
          tree.time = timestamp;
          return tree;
        }

        tree.items.map((ob) => {
          return editNode(ob, commentId, value);
        });

        return { ...tree };
      };
      state.commentsList.map((item) =>
        editNode(item, action.payload.id, action.payload.comment)
      );
    },
    deleteComment: (state, action) => {
      const deleteNode = (tree, id, index) => {
        if (tree.top && tree.id === id) {
          state.commentsList.splice(index, 1);
          return tree;
        }
        for (let i = 0; i < tree.items.length; i++) {
          const currentItem = tree.items[i];
          if (currentItem.id === id) {
            tree.items.splice(i, 1);
            return tree;
          } else {
            deleteNode(currentItem, id);
          }
        }
        // tree.items.map((item, index) =>
        //   deleteNode(item, action.payload.id, index)
        // );

        return tree;
      };
      state.commentsList.map((item, index) =>
        deleteNode(item, action.payload.id, index)
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { editComment, addComment, deleteComment } = CommentSlice.actions;

export default CommentSlice.reducer;
