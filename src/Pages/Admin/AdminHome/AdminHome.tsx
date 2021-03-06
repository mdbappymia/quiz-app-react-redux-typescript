import { useSelector } from "react-redux";
import { Quiz } from "../../../interfaces/interfaces";
import { RootState } from "../../../redux/store/store";
import SingleQuiz from "../SingleQuiz/SingleQuiz";

const AdminHome = () => {
  document.title = "Admin approval";
  const quizes = useSelector(
    (state: RootState) => state.admin.withoutApproveQuiz
  );
  return (
    <div className="bg-black min-h-screen">
      <h1 className="text-center font-bold text-white uppercase text-4xl py-10">
        All question
      </h1>
      <div className="container mx-auto">
        <div className=" md:grid lg:grid-cols-4 md:grid-cols-2 gap-6">
          {quizes.map((item: Quiz, i: number) => (
            <SingleQuiz key={i} item={item} i={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
