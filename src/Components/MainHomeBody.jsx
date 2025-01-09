import MainBodyCanvas from "./SubHomeBody/MainBodyCanvas";
import MainBodyContents from "./SubHomeBody/MainBodyContents";

export default function MainHomeBody() {
  
  

  return <>
     <div className="main-body flex w-full h-full">
        <MainBodyContents />
        <MainBodyCanvas />
    </div> 
  </>
}
