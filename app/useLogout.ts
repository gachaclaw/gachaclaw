
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "src/context/UserContext";

export function useLogout() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setName, setEmail } = useAuth();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setName(null);
    setEmail(null);
    navigate("/");
    toast.success("You are successfully logged out!");
  };

  return handleLogout;
}
