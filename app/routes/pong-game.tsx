import PongGameWebGLBuild from "src/webgl";
import { useCurrency } from "src/context/CurrencyContext";
import { useAuth } from "src/context/UserContext";

export default function PongGame() {
  const { currency, prizesWon } = useCurrency();
  const { isLoggedIn } = useAuth();

  return (
    <>
      <h1>
        {isLoggedIn
          ? `Prizes Won: ${prizesWon}`
          : ""}
      </h1>
      <div className="w-full h-full flex items-center justify-center">
        <PongGameWebGLBuild />
      </div>
    </>
  );
}