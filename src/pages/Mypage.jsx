import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import Savedvideo from './Savedvideo';
import '../styles/Mypage.scss';
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import Recentvideo from './Recentvideo';
import { useNavigate } from 'react-router-dom';

function Mypage() {
  const [activeTab, setActiveTab] = useState("todo");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="myPage">
      <div className="mypageHeader">
        {user ? (
          <>
            <h2>📚 {user.email}님, 안녕하세요.</h2>
            <button onClick={logout} className="myPageBtn">
              로그아웃
            </button>
          </>
        ) : (
          <>
            <h2>로그인이 필요합니다.</h2>

            <div className="loginWrap">
              <button
                className="loginBtn"
                onClick={() => navigate('/login')}
              >
                로그인 하러가기
              </button>
            </div>
          </>
        )}
      </div>

      {user && (
        <>
          <div className="tabMenu">
            <button
              className={activeTab === "todo" ? "active" : ""}
              onClick={() => setActiveTab("todo")}
            >
              Todolist
            </button>

            <button
              className={activeTab === "bookmark" ? "active" : ""}
              onClick={() => setActiveTab("bookmark")}
            >
              저장한 강의
            </button>

            <button
              className={activeTab === "recent" ? "active" : ""}
              onClick={() => setActiveTab("recent")}
            >
              최근 본 강의
            </button>
          </div>

          <div className="mypageContent">
            {activeTab === "todo" && <TodoList user={user} />}
            {activeTab === "bookmark" && <Savedvideo />}
            {activeTab === "recent" && <Recentvideo />}
          </div>
        </>
      )}
    </div>
  );
}

export default Mypage;