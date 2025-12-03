import React from 'react';
import "./RecipeCard.css"
import html2canvas from 'html2canvas';

function RecipeCard({ recipe, index }) {
  // 카드 색상 테마 배열
  

  console.log("받아온 레시피",index,"번 :", recipe);
  //궁금해서 가져온 캡쳐 및 저장 기능
  const handleCapture = async (e) => {
    // 2. 캡처 의사 묻기
    const isConfirmed = window.confirm(`'${recipe.title}' 레시피를 이미지로 저장하시겠습니까?`);
    
    if (!isConfirmed) return;

    try {
      // 3. 클릭된 요소(e.currentTarget)를 캡처
      const element = e.currentTarget;
      
      // html2canvas로 캡처 실행 (scale: 2는 해상도를 높여서 선명하게 만듦)
      const canvas = await html2canvas(element, {
        scale: 2, 
        backgroundColor: "#ffffff" // 배경색 흰색 지정 (투명 배경 방지)
      });

      // 4. 이미지 다운로드 링크 생성 및 클릭
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png'); // 이미지 포맷 설정
      link.download = `${recipe.title}_레시피.png`; // 저장될 파일명
      link.click();
      
    } catch (error) {
      console.error("캡처 실패:", error);
      alert("이미지 저장에 실패했습니다.");
    }
  };
  return (
    <div className={["RecipeCard",`RecipeCard_${index}`].join(" ") } onClick={handleCapture} title='클릭하여 이미지로 저장'>
      <div className="recipe_title">
        <h3 className="text-gray-900 font-bold">👨‍🍳{recipe.title}</h3>
      </div>

      <div className="food_ingredient">
        <div>
          <div className="ingredient_title">
            <h4 >재료🥕</h4>
          </div>
          <ul className="ingredient_list">
            {recipe.ingredients.map((ingredient, i) => (
              <li key={i} className="ingredient_item">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="instructions_title">
            <h4>조리법🍳</h4>
          </div>
          <ol className="instructions_list">
            {recipe.instructions.map((instruction, i) => (
              <li key={i} className="instructions_item">
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;