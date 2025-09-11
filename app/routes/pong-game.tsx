import PongGameWebGLBuild from "src/webgl";

export default function PongGame() {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <PongGameWebGLBuild />
      </div>
    </>
  );
}