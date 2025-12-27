import { useContext } from "react";
import { getDateDif, getFormattedDate } from "../../utill";
import "./Item.css";
import { FoodDispatchContext } from "../contexts/FoodContext";

const Item = ({id, name, date}) =>{
    console.log(name);
    const {onDelete} = useContext(FoodDispatchContext);
    function onClickDelete(){
        onDelete(id);
    }
    const handleDragStart =(e) =>{
        e.dataTransfer.setData("foodName", name);
    }
    return (
        <div className={["Item",getDateDif(date) >= 0? "Item_not":"Item_dead"].join(" ")}
            draggable="true"
            onDragStart={handleDragStart}>
            <div className="Item_header">
                <div className="itme_name">{name}</div>
                <div className={["remaining" , getDateDif(date) > 15 ? "remaining_safe": getDateDif(date) >= 5 ? "remaining_almost":"remaining_disposal"].join(" ")}>{getDateDif(date) >= 0?`${getDateDif(date)}일 남음`:`폐기처분필요`}</div>
            </div>
            <p className="use_by_date">유통기한: {getFormattedDate(date)} 까지</p>
            <button onClick={onClickDelete}>삭제</button>
        </div>
    )
}
export default Item;