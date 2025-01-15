import Animations from "./Remodeling/Animations";
import BlenderAnimatoin from "./Remodeling/BlenderAnimation";
import DifferentShape from "./Remodeling/DifferentShape";
import EnvTesting from "./Remodeling/Environment/EnvTesting";
import Experience from "./Remodeling/Experience";
import BlenderEnv from "./Remodeling/Lights/BlenderEnv";
import BlenderLights from "./Remodeling/Lights/BlenderLights";
import SpotLight from "./Remodeling/Lights/SpotLight";
import PartTwoBlenderAnimations from "./Remodeling/PartTwoBlenderAnimation";

export default function App() {

  return <div className="w-full h-full flex flex-col top-0 left-0 absolute">
    <EnvTesting />
  </div>
}
