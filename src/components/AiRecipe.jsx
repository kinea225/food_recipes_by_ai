import { useContext, useState } from "react";
import "./AiRecipe.css"
import { FoodstateContext } from "../contexts/FoodContext";
import RecipeCard from "./RecipeCard";

// ★ 중요: import.meta.env.VITE_GEMINI_API 및 @google/generative-ai 관련 코드는 제거합니다.
// 프론트엔드는 이제 "재료"만 서버로 던져주면 됩니다.

const AiRecipe = () => {
    const [searchText, setSearchText] = useState("");
    const [isDragOver, setIsDragOver] = useState(false);
    
    const data = useContext(FoodstateContext); 
    const [recipes, setRecipes] = useState([]);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);

        const droppedFoodName = e.dataTransfer.getData("foodName");
        if (droppedFoodName) {
            setSearchText((prev) => 
                prev ? `${prev}, ${droppedFoodName}` : droppedFoodName
            );
        }
    };

    const onChangeSearch = (e) => {
        setSearchText(e.target.value);
    }
    
    // ★ 서버로 레시피 요청하는 함수 (수정됨)
    const fetchRecipes = async () => {
        if (data.length === 0) {
            alert('보유하지 않은 식품입니다.');
            return;
        }
        
        const foodNames = searchText;
        if(!foodNames){
            alert("레시피를 볼 음식이 없습니다.")
            return;
        }

        setRecipes([]); // 초기화

        try {
            // ★ 변경점: 외부 Gemini API가 아니라, 내 서버(/api/recipes)로 요청을 보냅니다.
            const response = await fetch('/api/recipes', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                // ★ 변경점: 복잡한 프롬프트 대신 "재료 목록"만 깔끔하게 보냅니다.
                body: JSON.stringify({ 
                    ingredients: foodNames 
                }),
            });

            if (!response.ok) {
                throw new Error('서버 통신 실패');
            }

            const responseData = await response.json();
            
            // 서버에서 이미 JSON 파싱을 해서 보내준다고 가정하면 바로 쓸 수 있습니다.
            setRecipes(responseData);

        } catch (error) {
            console.error('레시피 추천 에러:', error);
            // 에러 발생 시 처리 (필요시 mock 데이터 로직 유지)
            setRecipes([]);
        }
    };

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
                        <button onClick={fetchRecipes}>검색해보기</button>
                    </div>  
                </div>
                <div className="prompt_content">
                    {recipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} index={index}/>
                    ))}
                </div>
                
            </div>
        </div>
    )
}

export default AiRecipe;