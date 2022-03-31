import { useSelector } from "react-redux";
import { Quiz } from "../../../interfaces/interfaces";
import { RootState } from "../../../redux/store/store";
import SingleQuiz from "../SingleQuiz/SingleQuiz";

const AdminHome = () => {
  const quizes = useSelector(
    (state: RootState) => state.admin.withoutApproveQuiz
  );
  console.log(quizes);
  return (
    <div className="bg-black">
      <h1 className="text-center font-bold text-white uppercase text-4xl py-10">
        Admin Management
      </h1>
      <div className="grid grid-cols-4 gap-6 container mx-auto">
        {quizes.map((item: Quiz, i: number) => (
          <SingleQuiz key={i} item={item} i={i} />
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
