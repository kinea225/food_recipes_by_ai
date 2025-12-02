import { useState } from "react";
import "./AiRecipe.css"
const AiRecipe = () =>{
    const [searchText, setSearchText] = useState("");
    const [isDragOver, setIsDragOver] = useState(false); // 드래그 효과용 상태

    // 드래그한 요소가 검색창 위로 올라왔을 때
  const handleDragOver = (e) => {
    e.preventDefault(); //이걸 안 하면 drop 이벤트가 발생 안 함
    setIsDragOver(true);
  };

  //검색창 밖으로 나갔을 때
  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  // 3. 드래그한 요소를 떨어뜨렸을 때 (핵심)
  const handleDrop = (e) => {
    e.preventDefault(); // 브라우저 기본 동작(파일 열기 등) 방지
    setIsDragOver(false);

    // FoodItem에서 담았던 "foodName" 꺼내기
    const droppedFoodName = e.dataTransfer.getData("foodName");
        if (droppedFoodName) {
        // 기존 텍스트가 있으면 쉼표(,) 붙여서 추가
        setSearchText((prev) => 
            prev ? `${prev}, ${droppedFoodName}` : droppedFoodName
        );
        }
    };
    const onChangeSearch = (e) => {
        setSearchText(e.target.value);
    }
    return (
        <div className="AiRecipe">
            <div className="ai_wrapper">
                <div className="ai_title">
                    <div className="search_wrapper"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}>
                        
                    <h4 className="item_title">AI 레시피</h4>
                        <input type="text"
                            value={searchText}
                            onChange={onChangeSearch}
                            placeholder="음식을 드래그 및 입력(, 구분)" />
                        <button>검색해보기</button>
                    </div>  
                </div>
                <div className="prompt_content">프롬프트</div>
            </div>
        </div>
    )
}
export default AiRecipe;