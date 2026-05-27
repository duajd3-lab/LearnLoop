import TodoMemo from './components/TodoMemo';
import './styles/App.scss';
import './styles/reset.css';

function App() {

  return (
    <div className="App">

      {/* header */}
      <section className='header'>
        <div className='mainTitle'>
          <h1>LearnLoop</h1>
        </div>

        <nav className='menu'>
          <a>투두리스트</a>
          <a>강의 탐색</a>
          <a>저장한 강의</a>
        </nav>

      </section>

      {/* ======= hero ======== */}
      <section className='hero'>

        <div>
          {/* left */}
          <div className='heroLeft'>
            <h2>
              오늘의 배움이 <br />
              내일의 나를 만듭니다.
            </h2>
            <div className='subBox'>
              <div>
                <span className="subText">
                  짧은 시간, 확실한 변화! <br />
                  지금 필요한 배움을 쉽고 빠르게 찾아보세요.
                </span>
              </div>
              <div><img src='./imgs/mainImage.png' ></img></div>
            </div>
            <button className="startBtn">
              강의 탐색하기
            </button>
          </div>
          {/* search */}
          <div className="searchBox">
            <h4>무엇을 배우고 싶으신가요?</h4>
            <div className="inputBox">
              <input
                type="text"
                placeholder="검색어를 입력해주세요."
              />
              <button>
                <img src='./imgs/ic-search.svg'></img>
              </button>
            </div>
          </div>
        </div>

        {/* rigth */}
        <TodoMemo />

      </section>


    </div>
  );
}

export default App;
