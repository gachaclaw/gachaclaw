
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "src/context/UserContext";

export function useLogout() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setName, setEmail, setProfilePictureUrl } = useAuth();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setName("");
    setEmail("");
    setProfilePictureUrl(null);

    // Clear localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("profilePictureUrl");

    navigate("/");
    toast.success("You are successfully logged out!");
  };

  return handleLogout;
}
