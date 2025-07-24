import PongGameWebGLBuild from "src/webgl";
import { useCurrency } from "src/context/CurrencyContext";

export default function PongGame() {
  const { currency } = useCurrency();  

  return (
    <>
      <h1>
        PongGame (${currency})  
      </h1>
      <div className="w-full h-full flex items-center justify-center">
        <PongGameWebGLBuild />
      </div>
    </>
  );
}