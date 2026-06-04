import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TodoMemo from './components/TodoMemo';
import './styles/App.scss';
import './styles/reset.css';
import TodoList from './pages/TodoList';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Savedvideo from './pages/Savedvideo';
import Mypage from './pages/Mypage';
import Login from './pages/Login';

import { auth } from "./firebase";
import { useEffect, useState } from "react";


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (

    <BrowserRouter>
      <div className="App">

        {/* header */}
        <section className='header'>
          <div className='mainTitle'>
            <Link to='/' className='h1'>LearnLoop</Link>
          </div>

          <nav className='menu'>
            <Link to='/explore'>강의 탐색</Link>

            {user ? (
              <Link to='/mypage'>
                📚 마이페이지
              </Link>
            ) : (
              <Link to='/login'>
                로그인
              </Link>
            )}
          </nav>

        </section>


        {/* routes */}
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route path='/todo' element={<TodoList />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/saved' element={<Savedvideo />} />
          <Route path='/login' element={<Login />} />
          <Route path='/mypage' element={<Mypage />} />
        </Routes>


      </div>
    </BrowserRouter>

  );
}

export default App;
