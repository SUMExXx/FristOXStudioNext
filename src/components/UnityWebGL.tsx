// "use client";
// import { Unity, useUnityContext } from "react-unity-webgl";

// const UnityWebGL = (
//     { model }: { model: ModelData }
// ) => {

//     const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
//         loaderUrl: model.loaderUrl,
//         dataUrl: model.dataUrl,
//         frameworkUrl: model.frameworkUrl,
//         codeUrl: model.codeUrl,
//     });

//     return (
//         <div className="w-full md:h-[calc(100vh-80px)] overflow-y-hidden flex justify-center items-center">
//             {!isLoaded && (
//                 <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>
//             )}
//             <Unity
//                 unityProvider={unityProvider}
//                 style={{ display: isLoaded ? "flex" : "none", height: "100%", width: "100%" }}
//             />
//         </div>
//     );
// };

// export default UnityWebGL;

const UnityWebGL = (
    { model }: { model: string }
) => {
    return (
        <div className="w-full h-[calc(100vh-80px)]">
            <iframe
                src={model}
                width="100%"
                height="100%"
                allowFullScreen
                className="border-0"
            />
        </div>
    );
};

export default UnityWebGL;