import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="sticky top-0">
      <nav className="flex justify-center gap-4 bg-blue-900 py-4">
        <NavLink
          className="font-bold uppercase text-white text-sm lg:text-md px-2 py-2 hover:text-gray-200 hover:bg-black"
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className="font-bold uppercase text-white text-sm lg:text-md px-2 py-2 hover:text-gray-200 hover:bg-black"
          to="/admin"
        >
          Admin
        </NavLink>
        <NavLink
          className="font-bold uppercase text-white text-sm lg:text-md px-2 py-2 hover:text-gray-200 hover:bg-black"
          to="/questions"
        >
          Question
        </NavLink>
        <NavLink
          className="font-bold uppercase text-white text-sm lg:text-md px-2 py-2 hover:text-gray-200 hover:bg-black"
          to="/manage"
        >
          Manage
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
