import FollowPath from "./Animation/FollowPath";
import Animations from "./Remodeling/Animations";
import BlenderAnimatoin from "./Remodeling/BlenderAnimation";
import DifferentShape from "./Remodeling/DifferentShape";
import EnvTesting from "./Remodeling/Environment/EnvTesting";
import Experience from "./Remodeling/Experience";
import AntLandscape from "./Remodeling/Landscape/AntLandscape";
import NoiseTexture from "./Remodeling/Landscape/NoiseTexture";
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

  return <div className="w-full h-full flex flex-col top-0 left-0 absolute">
    <Texture />
  </div>
}
