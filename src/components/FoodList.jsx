import { useContext } from "react";
import "./FoodList.css";
import Item from "./Item";
import { FoodDispatchContext, FoodstateContext } from "../contexts/FoodContext";
const FoodList = () =>{
    const food = useContext(FoodstateContext);
    const {onDeleteDate} = useContext(FoodDispatchContext);
     function onClickDeleteDate(){
        onDeleteDate();
    }
    return (
        <div className="FoodList">
            <div className="list_title">
                <h4 className="item_title">보유 음식</h4>
                <button onClick={onClickDeleteDate}>기한 지난 음식 삭제</button>
            </div>
            <div className="food_wrapper">
                <div className="food_list">
                    {food.map((it) =>{return <Item key={it.id} {...it}/>})}
                </div>
            </div>
            
        </div>
    )
}
export default FoodList;