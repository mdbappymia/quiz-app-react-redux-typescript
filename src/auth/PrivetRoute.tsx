import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store/store";

const PrivetRoute: FC<any> = ({ children }) => {
  const user = useSelector((state: RootState) => state.users.user);
  if (user.email === "mbm.21.02.16@gmail.com") {
    return children;
  }
  return <Navigate to="/" />;
};

export default PrivetRoute;
