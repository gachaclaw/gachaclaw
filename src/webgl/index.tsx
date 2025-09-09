import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useAuth } from "src/context/UserContext";

const PongGameWebGLBuild = () => {
  const { isLoggedIn } = useAuth();

  const { unityProvider } = useUnityContext({
    loaderUrl: "build/webgl/webgl.loader.js",
    dataUrl: "build/webgl/webgl.data",
    frameworkUrl: "build/webgl/webgl.framework.js",
    codeUrl: "build/webgl/webgl.wasm",
  });

  if (!isLoggedIn) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black text-white text-2xl">
        Please log in to play the game.
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <div className="mx-auto">
        <Unity
          unityProvider={unityProvider}
          style={{
            width: "1024px",
            height: "600px",
            border: "none",
          }}
        />
      </div>
    </div>
  );
};

export default PongGameWebGLBuild;
