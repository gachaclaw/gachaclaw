import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";

interface Navbarstring {
  navString: string;
  navLinkString: string;
};

function Navbarcomponent({ navString, navLinkString }: Navbarstring) {
  return <NavLink to = {navLinkString} className="relative left- items-center bg-purple-400
   text-white border-5 m-0.5
  border-opacity-20 lg:h-12 p-10
  hover:bg-pink-600 hover:text-black rounded-2xl 
  hover:rounded-xl transition-all duration-200 ease-linear">
    {navString}</NavLink>;
}

export default Navbarcomponent;
