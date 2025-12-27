// api/recipes.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // 1. GET 요청 등은 거부하고 POST 요청만 받습니다.
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 2. 환경 변수에서 키 가져오기
    const apiKey = process.env.MY_SECRET_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API Key가 설정되지 않았습니다." });
    }

    // 3. 프론트엔드에서 보낸 재료 받기
    const { ingredients } = req.body;

    // 4. Gemini 설정 및 호출
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
        model: "gemini-3-flash-preview",
        generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `다음 재료들을 사용한 요리 레시피 3개를 추천해주세요: ${ingredients}. 
    각 레시피는 다음 형식으로 JSON 배열로 답변해주세요: 
    [{"title": "요리 이름", "ingredients": ["재료1", "재료2"], "instructions": ["단계1", "단계2"]}]. 
    다른 설명 없이 JSON만 답변해주세요.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 5. 결과 정리 및 응답
    const jsonString = text.replace(/```json|```/g, "").trim();
    const recipes = JSON.parse(jsonString);

    res.status(200).json(recipes);

  } catch (error) {
    console.error("API 에러:", error);
    res.status(500).json({ error: "레시피를 가져오는 중 실패했습니다." });
  }
}