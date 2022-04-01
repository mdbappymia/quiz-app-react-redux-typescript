import { FC } from "react";
import { useDispatch } from "react-redux";
import { approveQuiz, deleteQuiz } from "../../../functions/handleQuiz";
import { Quiz } from "../../../interfaces/interfaces";
import { removeSinglequiz } from "../../../redux/actions/adminAction";

interface IProps {
  item: Quiz;
  i: number;
}
const SingleQuiz: FC<IProps> = ({ item, i }) => {
  const dispatch = useDispatch();
  const { question, options, answer, qid, id, approve, subject } = item;
  const handleApprove = (id: string) => {
    const isApprove = window.confirm("Are you sure?");
    if (isApprove) {
      approveQuiz(id).then((data: any) => {
        if (data.message === "OK") {
          dispatch(removeSinglequiz(qid));
          alert("Success");
        }
      });
    }
  };
  const handleDelete = (id: string) => {
    const isDelete = window.confirm("Are you sure?");
    if (isDelete) {
      deleteQuiz(id).then((data) => {
        if (data.message === "OK") {
          dispatch(removeSinglequiz(qid));
          alert("Success");
        }
      });
    }
  };
  return (
    <div className="p-4 bg-white rounded-md">
      <p className="font-bold mb-2">
        Q{i + 1}: {question}
      </p>
      <p className="font-bold text-xl my-2">Subject: {subject}</p>
      <div>
        <ol className="list-inside list-decimal">
          {options.map((option: string, i: number) => (
            <li key={i} className="list-item">
              {option}
            </li>
          ))}
        </ol>
        <p className="mt-1">
          Correct Answer: <span className="font-bold">{answer}</span>
        </p>
        <p>{id}</p>
      </div>
      <div className="text-white">
        <button
          disabled={approve === true}
          onClick={() => handleApprove(qid)}
          className="uppercase font-bold bg-green-600 hover:bg-green-700 active:bg-green-800 my-2 px-4 py-2 rounded mr-2 disabled:bg-gray-50"
        >
          Approve
        </button>
        <button
          onClick={() => handleDelete(qid)}
          className="uppercase font-bold bg-red-600 hover:bg-red-700 active:bg-red-800 my-2 px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SingleQuiz;
