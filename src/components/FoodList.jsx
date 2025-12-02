import { useContext } from "react";
import "./FoodList.css";
import Item from "./Item";
import { FoodstateContext } from "../contexts/FoodContext";
const FoodList = () =>{
    const food = useContext(FoodstateContext);

    return (
        <div className="FoodList">
                <h4 className="item_title">보유 음식</h4>
            <div className="food_wrapper">
                <div className="food_list">
                    {food.map((it) =>{return <Item key={it.id} {...it}/>})}
                </div>
            </div>
            
        </div>
    )
}
export default FoodList;