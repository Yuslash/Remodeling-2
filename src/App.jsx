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
import LowPoly from "./Remodeling/Model/LowPoly";
import PartTwoBlenderAnimations from "./Remodeling/PartTwoBlenderAnimation";

export default function App() {

  return <div className="w-full h-full flex flex-col top-0 left-0 absolute">
    <NoiseTexture />
  </div>
}
