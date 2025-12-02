import { useEffect, useMemo, useReducer, useRef, useState } from 'react'

import './App.css'
import Editor from './components/Editor'
import FoodList from './components/FoodList'
import AiRecipe from './components/AiRecipe'
import Viewer from './components/Viewer'
import { FoodstateContext, FoodDispatchContext } from './contexts/FoodContext'


const foodList = [{
  id:1,
  name:"삼겹살",
  date:new Date()
},{
  id:2,
  name:"김치",
  date: new Date("2025-12-12")
},{
  id:3,
  name:"나물",
  date: new Date("2025-12-30")
}];
//Reducer 사용시  reducer함수
function reducer(state, action){
  switch(action.type){
    case "INIT":{
      return action.data;
    }
    case "CREATE":{
      return [action.newFood, ...state];
    }
    case "DELETE":{
      return state.filter((it)=> String(it.id) !== String(action.targetId));
    }
    default: return state;
  }
}
function App() {
  //Reducer 사용 시 useEffect로 초기값 넣기기
  const [data, dispatch] = useReducer(reducer, []);
  useEffect(()=>{
    dispatch({
      type: "INIT",
      data: foodList
    })
  },[])
  const idRef = useRef(4);
  //CREATE
  const onCreate =(name, date) =>{
    dispatch({
      type:"CREATE",
      newFood:{
        id:idRef.current,
        name,
        date
    }
    });
    idRef.current +=1;
  }
  //DELETE
  const onDelete = (targetId) =>{
    dispatch({
      type:"DELETE",
      targetId
    })
  }
  const memoizedDispatch = useMemo(()=>{
    return {onCreate, onDelete};
  },[]);
  return (
    <div className='App'>
      <h1>스마트 냉장고</h1>
      <h2>AI가 만들어주는 음식 레시피🧂</h2>
      <FoodstateContext value = {data}>
        <FoodDispatchContext value ={memoizedDispatch}>
          <Viewer />
          <AiRecipe/>
        </FoodDispatchContext>
      </FoodstateContext>

    </div>
  )
}

export default App
