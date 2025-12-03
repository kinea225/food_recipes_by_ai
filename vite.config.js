import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 아래 줄을 추가하세요. '/리포지토리이름/' 형식이어야 합니다.
  base: "./", 
})