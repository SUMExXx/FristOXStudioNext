"use client";
import { Unity, useUnityContext } from "react-unity-webgl";

const UnityWebGL = (
    { model }: { model: string }
) => {

    const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
        loaderUrl: `/webgl/${model}/Build/WebBuild.loader.js`,
        dataUrl: `/webgl/${model}/Build/WebBuild.data`,
        frameworkUrl: `/webgl/${model}/Build/WebBuild.framework.js`,
        codeUrl: `/webgl/${model}/Build/WebBuild.wasm`,
    });

    return (
        <div className="w-full md:h-[calc(100vh-80px)] overflow-y-hidden flex justify-center items-center">
            {!isLoaded && (
                <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>
            )}
            <Unity
                unityProvider={unityProvider}
                style={{ display: isLoaded ? "flex" : "none", height: "100%", width: "100%" }}
            />
        </div>
    );
};

export default UnityWebGL;