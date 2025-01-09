import MainBodyCanvas from "./SubHomeBody/MainBodyCanvas";
import MainBodyContents from "./SubHomeBody/MainBodyContents";

export default function MainHomeBody() {
  
  

  return <>
     <div className="main-body flex w-full h-full bg-lime-400 ">
        <MainBodyContents />
        <MainBodyCanvas />
    </div> 
  </>
}
