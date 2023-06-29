import Input from "../Input/Input";
import { useSelector } from "react-redux";

const CommentList = () => {
  const { commentsList } = useSelector((state) => state.comments);
  console.log(commentsList);
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-2/3">
        <Input top />
        {commentsList.map((item) => (
          <Input data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
