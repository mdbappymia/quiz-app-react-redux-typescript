import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewQuestion } from "../../redux/actions/quizAction";
import { RootState } from "../../redux/store/store";

const AddQuestion: FC = () => {
  const dispatch = useDispatch();
  const [optionText, setOptionText] = useState("");
  const [questionOptions, setQuestionOptions] = useState<any>([]);
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const allQuizes = useSelector((state: RootState) => state.quiz.quizes);
  console.log(allQuizes);
  const handleAddOptions = () => {
    setQuestionOptions([...questionOptions, optionText]);
    setOptionText("");
  };
  const handleRemoveOption = (item: string) => {
    const remainOptions = questionOptions.filter(
      (option: string) => option !== item
    );
    setQuestionOptions(remainOptions);
  };
  const handleSubmit = () => {
    const submittedData = {
      id: allQuizes.length + 1,
      question: question,
      options: questionOptions,
      answer: correctAnswer,
    };
    dispatch(addNewQuestion(submittedData));
  };
  return (
    <div>
      <h1>Add question</h1>

      <div>
        <input
          onChange={(e) => setQuestion(e.target.value)}
          type="text"
          placeholder="Question"
          name=""
          id=""
        />
        <h1>ID: {allQuizes.length + 1}</h1>
        <h1>Options</h1>
        {questionOptions.map((item: string) => (
          <li>
            {item}{" "}
            <button
              onClick={() => handleRemoveOption(item)}
              className="bg-red-700 my-1 text-white px-1 rounded-full"
            >
              X
            </button>
          </li>
        ))}
        <h1>Add options</h1>
        <input
          type="text"
          placeholder="Option"
          value={optionText}
          onChange={(e: any) => setOptionText(e.target.value)}
          name=""
          id=""
        />
        <button onClick={handleAddOptions}>Add</button>
        <div>
          <h1>Correct answer</h1>
          <select onChange={(e) => setCorrectAnswer(e.target.value)}>
            {questionOptions.map((item: string) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AddQuestion;
