import {  useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../store/Slices/Comments";
import EditableList from "../EditableList/EditableList";

/* eslint-disable react/prop-types */
const Input = ({ top, data }) => {
  const [topComment, setTopComment] = useState("");
  const dispatch = useDispatch();

  const handleTopComment = () => {
    if (topComment === "") return;
    dispatch(addComment({ top: true, comment: topComment }));
    setTopComment("");
  };

  return (
    <div className="flex w-full py-3">
      {top && (
        <>
          <input
            type="text"
            placeholder="Enter a comment"
            className="mt-1 px-3 py-2 bg-white border 
        shadow-sm border-slate-300 placeholder-slate-400 
        focus:outline-none focus:border-sky-500 focus:ring-sky-500
        block w-full rounded-md sm:text-sm focus:ring-1"
            onChange={(e) => setTopComment(e.target.value)}
            value={topComment}
          />
          <button
            type="button"
            className="blue"
            onClick={handleTopComment}
          >
            Add Comment
          </button>
        </>
      )}
      {data && <EditableList data={data} />}
    </div>
  );
};

export default Input;
