import React, { useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import type PongGame from "~/routes/pong-game";

const PongGameWebGLBuild = () => {

  const { unityProvider, sendMessage } = useUnityContext({
    loaderUrl: "build/webgl/webgl.loader.js",
    dataUrl: "build/webgl/webgl.data",
    frameworkUrl: "build/webgl/webgl.framework.js",
    codeUrl: "build/webgl/webgl.wasm",
  });

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