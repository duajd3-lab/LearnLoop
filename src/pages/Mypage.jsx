import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TodoList from './TodoList';
import Savedvideo from './Savedvideo';
import '../styles/Mypage.scss';

function Mypage() {

   const [activeTab, setActiveTab] = useState("todo");

  return (

     <div className="myPage">
      <div className="mypageHeader">

        <div className="loginInfo">
          <p>👤 test 님, 안녕하세요.</p>
          <button>↪ 로그아웃</button>
        </div>
      </div>

      <div className="tabMenu">
        <button
          className={activeTab === "todo" ? "active" : ""}
          onClick={() => setActiveTab("todo")}
        >
          투두리스트
        </button>

        <button
          className={activeTab === "bookmark" ? "active" : ""}
          onClick={() => setActiveTab("bookmark")}
        >
          저장한 강의
        </button>
      </div>

      <div className="mypageContent">
        {activeTab === "todo" && <TodoList />}
        {activeTab === "bookmark" && <Savedvideo />}
      </div>
    </div>
  );
}

         


  


export default Mypage