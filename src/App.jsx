import "./App.css";
import CommentList from "./components/CommentsList/CommentList";

function App() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="pt-4 text-2xl font-bold">Comment Widget</div>
      <CommentList />
    </div>
  );
}

export default App;
