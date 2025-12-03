import { useContext, useState } from "react";
import "./AiRecipe.css"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FoodstateContext } from "../contexts/FoodContext";
import RecipeCard from "./RecipeCard";

const API_KEY = import.meta.env.VITE_GEMINI_API;
if (!API_KEY) {
  console.error("Gemini API 키가 .env 파일에 설정되지 않았습니다.");
}

const AiRecipe = () =>{
    const [searchText, setSearchText] = useState("");
    const [isDragOver, setIsDragOver] = useState(false); // 드래그 효과용 상태
    
    const data = useContext(FoodstateContext); 
    const [recipes, setRecipes] = useState([]);
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
    
// Gemini API로 레시피 추천
  const fetchRecipes = async () => {
    if (data.length === 0) {
      alert('보유하지 않은 식품입니다.');
      return;
    }
    setRecipes([]);

    try {
      //const availableFoods = filter(food => food.daysRemaining >= 0);
      const foodNames = searchText;
      console.log(foodNames);
      if(!foodNames){
        alert("레시피을 볼 음식이 없습니다.")
        return;
      }
      // Gemini API 호출
      //const API_KEY = 'YOUR_GEMINI_API_KEY_HERE'; // 실제 API 키로 교체하세요
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `다음 재료들을 사용한 요리 레시피 3개를 추천해주세요: ${foodNames}. 각 레시피는 다음 형식으로 JSON 배열로 답변해주세요: [{"title": "요리 이름", "ingredients": ["재료1", "재료2"], "instructions": ["단계1", "단계2"]}]. 다른 설명 없이 JSON만 답변해주세요.`,
                  },
                ],
              },
            ],
            generationConfig: {
                responseMimeType: "application/json",
            },
          }),
        });

      if (!response.ok) {
        throw new Error('API 요청 실패');
      }

      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      console.log(text);
      // JSON 추출 (마크다운 코드 블록 제거)
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const recipesData = JSON.parse(jsonMatch[0]);
        setRecipes(recipesData.slice(0, 3));
      } else {
        // API 키가 없거나 에러 시 Mock 데이터 사용
        setRecipes([]);
      }
    } catch (error) {
      console.error('레시피 추천 에러:', error);
      // 에러 시 Mock 데이터 표시
      const availableFoods = data.filter(food => food.daysRemaining >= 0);
      if (availableFoods.length > 0) {
        setRecipes([]);
      }
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