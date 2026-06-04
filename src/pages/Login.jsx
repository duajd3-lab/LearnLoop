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
      await signInWithEmailAndPassword(auth, email, password);
      alert('로그인 성공');
      navigate('/mypage');
    } catch (error) {
      alert('이메일 또는 비밀번호를 확인해주세요.');
    }
  };

   const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/mypage');
    } catch (error) {
      console.log(error);
      alert('구글 로그인에 실패했습니다.');
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

      </form>
    </div>
  );
}

export default Login;