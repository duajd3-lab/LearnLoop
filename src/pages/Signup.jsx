import { useState } from "react";
import { auth } from "../firebase";

import {
  createUserWithEmailAndPassword
} from "firebase/auth";

function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {

    try {

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("회원가입 성공");

    } catch (err) {

      alert(err.message);

    }

  };

  return (
    <div>

      <input
        type="email"
        placeholder="이메일"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={signUp}>
        회원가입
      </button>

    </div>
  );
}

export default Signup;