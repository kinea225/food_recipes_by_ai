import Editor from "./Editor";
import FoodList from "./FoodList";
import "./Viewer.css"

const Viewer = () =>{
    return(
        <div className="Viewer">
            <Editor/>
            <FoodList/>
        </div>
        
    )
}

export default Viewer;