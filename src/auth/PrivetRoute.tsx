import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store/store";

const PrivetRoute: FC<any> = ({ children }) => {
  const { user, isLoading } = useSelector((state: RootState) => state.users);

  if (isLoading) {
    return (
      <div className="flex bg-black min-h-screen justify-center items-center px-3">
        <h1 className="text-white font-bold text-4xl uppercase">Loaidng ...</h1>
      </div>
    );
  }
  if (user.email === "mbm.21.02.16@gmail.com") {
    return children;
  }
  return <Navigate to="/" />;
};

export default PrivetRoute;
