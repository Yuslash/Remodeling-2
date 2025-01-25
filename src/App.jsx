import FollowPath from "./Animation/FollowPath";
import NewSurface from "./Animation/NewSurface";
import NewSurfaceClass from "./Class/NewSurfaceClass";
import Overlay from "./Objects/Overlay";
import RingMesh from "./Objects/RingMesh";
import RocksObject from "./Objects/RocksObject";
import RotationAnimation from "./Objects/RotationAnimation";
import Animations from "./Remodeling/Animations";
import BlenderAnimatoin from "./Remodeling/BlenderAnimation";
import DifferentShape from "./Remodeling/DifferentShape";
import EnvTesting from "./Remodeling/Environment/EnvTesting";
import Experience from "./Remodeling/Experience";
import AntLandscape from "./Remodeling/Landscape/AntLandscape";
import NoiseTexture from "./Remodeling/Landscape/NoiseTexture";
import ShadowLand from "./Remodeling/Landscape/ShadowLand";
import BlenderEnv from "./Remodeling/Lights/BlenderEnv";
import BlenderLights from "./Remodeling/Lights/BlenderLights";
import SpotLight from "./Remodeling/Lights/SpotLight";
import Bending from "./Remodeling/Model/Bending";
import CertificateModel from "./Remodeling/Model/CertificateModel";
import HallModel from "./Remodeling/Model/HallModel";
import LowPoly from "./Remodeling/Model/LowPoly";
import StudioModel from "./Remodeling/Model/StudioModel";
import PartTwoBlenderAnimations from "./Remodeling/PartTwoBlenderAnimation";
import Texture from "./TextureModel/Texture";

export default function App() {

  return (
    <div className="w-screen h-screen relative">
      {/* Canvas Container */}
      <div className="w-full h-full absolute z-0">
        <RotationAnimation />
      </div>
      
      {/* Overlay Container */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-white z-10 opacity-50 pointer-events-none">
        {/* Your overlay content here */}
      </div>
    </div>
  )
}
