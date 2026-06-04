import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import Savedvideo from './Savedvideo';
import '../styles/Mypage.scss';
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function Mypage() {
  const [activeTab, setActiveTab] = useState("todo");
  const [user, setUser] = useState(null);

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
            <button onClick={logout} className='myPageBtn'>로그아웃</button>
          </>
        ) : (
          <h2>로그인이 필요합니다.</h2>
        )}
      </div>

      {user && (
        <>
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
            {activeTab === "todo" && <TodoList email={user.email} />}
            {activeTab === "bookmark" && <Savedvideo />}
          </div>
        </>
      )}
    </div>
  );
}

export default Mypage;