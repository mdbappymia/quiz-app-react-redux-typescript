import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, addDoc } from "firebase/firestore";
import { RootState } from "../../redux/store/store";
import { db } from "../../auth/firebase.config";
import { addNewQuestion, setQuizLoading } from "../../redux/actions/quizAction";

const AddQuestion: FC = () => {
  const [optionText, setOptionText] = useState("");
  const [questionOptions, setQuestionOptions] = useState<any>([]);
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [isSelectSubject, setIsSelectSubject] = useState(true);
  const allQuizes = useSelector((state: RootState) => state.quiz.quizes);
  const loading = useSelector((state: RootState) => state.quiz.loading);
  const subjects = useSelector((state: RootState) => state.quiz.subjects);
  const dispatch = useDispatch();
  const handleAddOptions = () => {
    if (optionText === "") {
      return;
    }
    setQuestionOptions([...questionOptions, optionText]);
    setOptionText("");
  };
  const handleRemoveOption = (item: string) => {
    const remainOptions = questionOptions.filter(
      (option: string) => option !== item
    );
    setQuestionOptions(remainOptions);
  };
  const handleSubmit = async () => {
    const submittedData = {
      id: Date.now(),
      question: question,
      options: questionOptions,
      answer: correctAnswer || questionOptions[0],
      subject: subjectName || subjects[0],
      approve: false,
    };
    const isAdded = window.confirm(
      JSON.stringify(submittedData) + "Are you sure added this question?"
    );
    if (question === "") {
      alert("All field required");
      console.log(submittedData);
      return;
    }
    if (isAdded) {
      dispatch(setQuizLoading(true));
      try {
        const docRef = await addDoc(collection(db, "quizes"), submittedData);
        console.log("Document written with ID: ", docRef.id);
        if (docRef.id) {
          dispatch(addNewQuestion(submittedData));
          alert("Added Successfully");
          setQuestionOptions([]);
          setQuestion("");
          setCorrectAnswer("");
          dispatch(setQuizLoading(false));
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-center font-bold uppercase mb-3">
        Add question
      </h1>
      <div className="">
        <div>
          <input
            checked={isSelectSubject}
            onChange={() => setIsSelectSubject(!isSelectSubject)}
            type="radio"
            name="subject"
            id="subjectS"
          />
          <label htmlFor="subjectS"> Select subject</label>
        </div>
        <div>
          <input
            checked={!isSelectSubject}
            onChange={() => setIsSelectSubject(!isSelectSubject)}
            type="radio"
            name="subject"
            id="subjectC"
          />
          <label htmlFor="subjectC"> Create new subject</label>
        </div>
        <div>
          {isSelectSubject ? (
            <select
              className="my-1 w-20 border p-1"
              onChange={(e) => setSubjectName(e.target.value)}
            >
              {subjects.map((item: string, i: number) => (
                <option
                  onChange={(e: any) => setSubjectName(e.target.value)}
                  key={i}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          ) : (
            <input
              className="border my-1 p-1"
              onChange={(e) => setSubjectName(e.target.value)}
              type="text"
            />
          )}
        </div>
      </div>
      <div>
        <input
          onChange={(e) => setQuestion(e.target.value)}
          type="text"
          value={question}
          placeholder="Question"
          className="border w-full text-xl p-1"
        />
        <h1 className="text-xl border my-1 p-1">
          ID: {loading ? <p>Loading...</p> : allQuizes.length + 1}
        </h1>
        <h1 className="text-center my-2 font-bold uppercase">Options</h1>
        {questionOptions.map((item: string, i: number) => (
          <div key={i} className="border flex justify-between w-full p-2">
            <p className="w-full">{item}</p>

            <button
              onClick={() => handleRemoveOption(item)}
              className="bg-red-700 my-1 text-white px-1 rounded-full"
            >
              X
            </button>
          </div>
        ))}
        <h1 className="font-semibold">Add options</h1>
        <input
          type="text"
          className="border my-1 p-1"
          placeholder="Option"
          value={optionText}
          onChange={(e: any) => setOptionText(e.target.value)}
        />
        <button
          className="bg-indigo-600 font-bold text-white uppercase px-3 py-2 rounded"
          onClick={handleAddOptions}
        >
          Add
        </button>
        <div>
          <h1 className="my-2 font-semibold">Select Correct answer</h1>
          <select
            className=" w-20 border"
            onChange={(e) =>
              setCorrectAnswer(e.target.value || questionOptions[0])
            }
          >
            {questionOptions.map((item: string, i: number) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <button
          disabled={loading}
          className="font-bold bg-indigo-700 text-white uppercase px-4 py-2 rounded my-4 disabled:bg-gray-500"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <div className="text-center">
        <button
          className=" bg-amber-600 px-3 py-1 my-3 text-white rounded hover:bg-amber-700"
          onClick={() => window.location.reload()}
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default AddQuestion;
