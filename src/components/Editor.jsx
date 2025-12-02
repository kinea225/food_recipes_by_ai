import { useContext, useRef, useState } from "react";
import "./Editor.css";
import { FoodDispatchContext } from "../contexts/FoodContext";
import { getFormattedDate } from "../../utill";
const Editor = () =>{
    const {onCreate} =useContext(FoodDispatchContext);
    const [foodName, setFoodName] = useState("");
    const [foodDate, setFoodDate] = useState(new Date());
    const nameRef = useRef();
    const dateRef = useRef();
    console.log(foodDate);
    const onChangeName= (e)=>{
        setFoodName(e.target.value);
    }
    const onChageDate = (e) =>{
        setFoodDate(e.target.value)
    }
    const onSubmit =() =>{
        if(!foodName){
            nameRef.current.focus();
            return;
        }
        onCreate(foodName, new Date(foodDate));
        setFoodName("");
        setFoodDate(getFormattedDate(new Date()));
    }
    return (
        <div className="Editor">
            <div className="editor_wrapper">
                <h4 className="item_title">+ 식품 추가</h4>
                <p>식품 이름</p>
                <input ref ={nameRef} onChange={onChangeName} value={foodName} type="text" placeholder="추가할 식품을 입력하세요"/>
                <p>유통기한</p>
                <input ref={dateRef} onChange={onChageDate} type="date" value={getFormattedDate(new Date(foodDate))}/>    
                <button onClick={onSubmit}>추가하기</button>        
            </div>
        </div>
    )
}
export default Editor;