
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "src/context/UserContext";
import { useCurrency } from "src/context/CurrencyContext";
import { clearUserStorage, setUserStorage } from "src/context/storage";

export function useLogout() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setName, setEmail, setProfilePictureUrl } = useAuth();
  const { resetContext } = useCurrency();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setName("");
    setEmail("");
    setProfilePictureUrl(null);

    // Clear localStorage
    clearUserStorage();

    // Reset currency context
    resetContext?.();

    navigate("/");
    toast.success("You are successfully logged out!");
  };

  return handleLogout;
}
