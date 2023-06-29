import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addComment,
  deleteComment,
  editComment,
} from "../../store/Slices/Comments";

/* eslint-disable react/prop-types */
const EditableList = ({ data }) => {
  const [comment, setComment] = useState("");
  const [edit, setEdit] = useState(false);
  const [reply, setReply] = useState(false);
  const dispatch = useDispatch();
  const [replyComment, setReplyComment] = useState("");

  const handleComment = () => {
    if (comment === "") return;
    dispatch(editComment({ top: data.top, comment: comment, id: data.id }));
    setEdit(false);
  };

  const handleSubComment = () => {
    if (replyComment === "") return;
    dispatch(addComment({ top: false, comment: replyComment, id: data.id }));
    setReplyComment("");
  };

  const handleDelete = () => {
    dispatch(deleteComment({ id: data.id }));
  };

  useEffect(() => {
    if (data?.comment) setComment(data.comment);
  }, [data]);

  return (
    <div className="flex flex-col w-full px-5 py-3 rounded-md bg-slate-50">
      <div className="flex w-full items-center">
        <input
          type="text"
          placeholder="Enter a comment"
          className="mt-1 px-3 py-2 bg-white border 
            shadow-sm border-slate-300 placeholder-slate-400 
            focus:outline-none focus:border-sky-500 focus:ring-sky-500
            block w-full rounded-md sm:text-sm focus:ring-1 disabled:bg-slate-100"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          disabled={!edit}
        />
        {edit ? (
          <>
            <button
              type="button"
              className="blue"
              onClick={handleComment}
            >
              Save
            </button>
            <button
              type="button"
              className="red"
              onClick={() => setEdit(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="blue"
              onClick={() => {
                setEdit(true);
                setReply(false);
              }}
            >
              Edit
            </button>
            <button
              type="button"
              className="green"
              onClick={() => setReply(true)}
            >
              Reply
            </button>
            <button
              type="button"
              className="red"
              onClick={handleDelete}
            >
              Delete
            </button>
          </>
        )}
        <span className="font-semibold text-slate-400 whitespace-nowrap">{data?.time}</span>
      </div>
      {reply && (
        <div className="flex w-full pt-2">
          <input
            type="text"
            placeholder="Enter reply"
            className="mt-1 px-3 py-2 bg-white border 
            shadow-sm border-slate-300 placeholder-slate-400 
            focus:outline-none focus:border-sky-500 focus:ring-sky-500
            block w-full rounded-md sm:text-sm focus:ring-1"
            onChange={(e) => setReplyComment(e.target.value)}
          />
          <button
            type="button"
            className="blue"
            onClick={() => {
              handleSubComment();
              setReply(false);
            }}
          >
            Send Reply
          </button>
          <button
            type="button"
            className="red"
            onClick={() => {
              setReply(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}
      {data?.items?.length > 0 &&
        data.items.map((item) => <EditableList data={item} key={item.id} />)}
    </div>
  );
};

export default EditableList;
