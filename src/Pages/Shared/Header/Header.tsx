import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useFirebase from "../../../hooks/useFirebase";
import { RootState } from "../../../redux/store/store";

const Header = () => {
  const { googleSignIn, logOut } = useFirebase();
  const user = useSelector((state: RootState) => state.users.user);
  return (
    <div className="sticky top-0">
      <nav className="flex justify-center text-xs bg-blue-900 py-4 w-full">
        <NavLink
          className="font-bold uppercase text-white lg:text-md px-2 py-2 hover:text-gray-200 hover:bg-black"
          to="/"
        >
          Home
        </NavLink>
        {user.email === "mbm.21.02.16@gmail.com" && (
          <NavLink
            className="font-bold uppercase text-white lg:text-md px-2 py-2 hover:text-gray-200 hover:bg-black"
            to="/admin"
          >
            Admin
          </NavLink>
        )}
        <NavLink
          className="font-bold uppercase text-white lg:text-md px-2 py-2 hover:text-gray-200 hover:bg-black"
          to="/questions"
        >
          Question
        </NavLink>
        {user.email === "mbm.21.02.16@gmail.com" && (
          <NavLink
            className="font-bold uppercase text-white lg:text-md px-2 py-2 hover:text-gray-200 hover:bg-black"
            to="/manage"
          >
            Manage
          </NavLink>
        )}
        <div className="text-center bg-blue-900">
          {!user.email ? (
            <button
              className=" bg-lime-600 mx-3 px-5 font-bold text-white uppercase rounded hover:bg-green-700 py-2"
              onClick={googleSignIn}
            >
              login
            </button>
          ) : (
            <button
              className=" bg-red-600 mx-3 px-5 font-bold text-white uppercase rounded hover:bg-red-700 py-2"
              onClick={logOut}
            >
              Log out
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
