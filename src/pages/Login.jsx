import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/Login.scss';


function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async (e) => {
  e.preventDefault();

  try {
    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    createTestData(result.user);

    alert('로그인 성공');
    navigate('/mypage');
  } catch (error) {
    console.log(error);
    alert('이메일 또는 비밀번호를 확인해주세요.');
  }
};

   const googleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    createTestData(result.user);

    navigate('/mypage');
  } catch (error) {
    console.log(error);
    alert('구글 로그인에 실패했습니다.');
  }
};

  const createTestData = (user) => {
  if (user.email !== 'test@learnloop.com') return;

  const todoKey = `learnloopTodos_${user.uid}`;
  const savedKey = `savedVideos_${user.uid}`;
  const recentKey = `recentVideos_${user.uid}`;

  if (!localStorage.getItem(todoKey)) {
    localStorage.setItem(
      todoKey,
      JSON.stringify([
        {
          id: 1,
          title: 'React 강의 복습하기',
          time: 30,
          done: true,
          completedDate: new Date().toISOString().split('T')[0],
        },
        {
          id: 2,
          title: '포트폴리오 README 정리하기',
          time: 40,
          done: false,
        },
        {
          id: 3,
          title: 'Firebase 로그인 기능 점검하기',
          time: 20,
          done: true,
          completedDate: new Date().toISOString().split('T')[0],
        },
      ])
    );
  }

  if (!localStorage.getItem(savedKey)) {
    localStorage.setItem(
      savedKey,
      JSON.stringify([
        {
          videoId: 'Ke90Tje7VS0',
          title: 'React JS Crash Course',
          channelTitle: 'Traversy Media',
          thumbnail: 'https://i.ytimg.com/vi/Ke90Tje7VS0/mqdefault.jpg',
          url: 'https://www.youtube.com/watch?v=Ke90Tje7VS0',
        },
        {
          videoId: 'PkZNo7MFNFg',
          title: 'Learn JavaScript - Full Course for Beginners',
          channelTitle: 'freeCodeCamp.org',
          thumbnail: 'https://i.ytimg.com/vi/PkZNo7MFNFg/mqdefault.jpg',
          url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',
        },
      ])
    );
  }

  if (!localStorage.getItem(recentKey)) {
    localStorage.setItem(
      recentKey,
      JSON.stringify([
        {
          videoId: 'hdI2bqOjy3c',
          title: 'JavaScript Crash Course For Beginners',
          channelTitle: 'Traversy Media',
          thumbnail: 'https://i.ytimg.com/vi/hdI2bqOjy3c/mqdefault.jpg',
          url: 'https://www.youtube.com/watch?v=hdI2bqOjy3c',
          watchedAt: new Date().toISOString(),
        },
      ])
    );
  }
};

const testLogin = async () => {
  try {
    const result = await signInWithEmailAndPassword(
      auth,
      'test@learnloop.com',
      '123456'
    );

    createTestData(result.user);

    alert('테스트 계정으로 로그인되었습니다.');
    navigate('/mypage');
  } catch (error) {
    console.log(error);
    alert('테스트 계정 로그인이 실패했습니다.');
  }
};

  return (
    <div className="loginPage">
      <form className="loginBox" onSubmit={loginHandler}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">로그인</button>

        <div className="socialLogin">
          <button type="button" className="googleBtn" onClick={googleLogin}>
            <img src='../imgs/google.svg' />
            구글로 로그인
          </button>
          </div>

          <button
  type="button"
  className="testBtn"
  onClick={testLogin}
>
  테스트 계정으로 로그인
</button>

      </form>
    </div>
  );
}

export default Login;