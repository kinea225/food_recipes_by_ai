// server.js (새로 만들기)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import recipeHandler from './api/recipes.js'; // 작성하신 API 파일 불러오기

dotenv.config();

const app = express();
const PORT = 3000; // 백엔드 서버 포트

// CORS 및 JSON 파싱 허용
app.use(cors());
app.use(express.json());

// '/api/recipes' 주소로 요청이 오면 작성하신 핸들러 실행
app.post('/api/recipes', async (req, res) => {
  try {
    await recipeHandler(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ 백엔드 서버 가동: http://localhost:${PORT}`);
});