import React from 'react'
import '../styles/App.scss';
import '../styles/reset.css';
import TodoMemo from '../components/TodoMemo';
import TodoList from './TodoList';
import { useNavigate } from 'react-router-dom';


function Home() {

  const navigate = useNavigate();

  return (
    <div>

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

          </div>

          {/* rigth */}
          <TodoMemo />

        </section>


        {/* ======= 검색 ======== */}
        <section className='search'>
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

          <div className='searchBtnBox'>
            <div className='sBtn'>
              <button className='keywordBtn'>
                <span className="material-symbols-rounded">
                  video_camera_back
                </span>
              </button>
              <p>영상편집</p>
            </div>
            <div className='sBtn'>
              <button className='keywordBtn'>
                <span className="material-symbols-rounded">
                  design_services
                </span>
              </button>
              <p>디자인</p>
            </div>
            <div className='sBtn'>
              <button className='keywordBtn'>
                <span className="material-symbols-rounded">
                  chat_apps_script
                </span>
              </button>
              <p>AI툴 활용</p>
            </div>
            <div className='sBtn'>
              <button className='keywordBtn'>
                <span className="material-symbols-rounded">
                  computer
                </span>
              </button>
              <p>IT 분야</p>
            </div>
            <div className='sBtn'>
              <button className='keywordBtn'>
                <span className="material-symbols-rounded">
                  $
                </span>
              </button>
              <p>재테크</p>
            </div>
            <div className='sBtn'>
              <button className='keywordBtn'>
                <span className="material-symbols-rounded">
                  communication
                </span>
              </button>
              <p>영어회화</p>
            </div>
            <div className='sBtn'>
              <button className='keywordBtn'>
                <span className="material-symbols-rounded">
                  border_color
                </span>
              </button>
              <p>글쓰기</p>
            </div>
            <div className='sBtn'>
              <button className='keywordBtn'>
                <span className="material-symbols-rounded">
                  directions_run
                </span>
              </button>
              <p>스포츠</p>
            </div>
          </div>

        </section>


        {/* ======= 강의 영상 ======== */}
        <section className='video'>
          <h3>지금 인기있는 짧은 강의</h3>

          <div className='youtubeBox'>
            <div className='videoClass'>
              <span>10분 안에 배우는
                슛폼 영상 편집 기초</span>
              <p>영상 편집 기초</p>
            </div>
            <div className='videoClass'>
              <span>피그마로 쉽게 만드는
                UI 디자인 입문</span>
            </div>
            <div className='videoClass'>
              <span>엑셀 기초 함수
                10분 완성</span>
            </div>
            <div className='videoClass'>
              <span>10분 안에 배우는
                슛폼 영상 편집 기초</span>
            </div>
          </div>

        </section>

        {/* ======= 바로가기 부분 ======== */}
        <section className='goalSection'>
          <div className='goalInner'>
            <div className='goalText'>
              <span>오늘의 학습 목표을 세워보세요!</span>
              <p>일정을 계획하여 편리하게 관리하세요.</p>
              <button onClick={()=>navigate('/todo')}>Todolist 이동하기</button>
            </div>
            <div className='goalImg'>
              <img src='./imgs/todo.png' ></img>
            </div>
          </div>

          <div className='goalInner'>
            <div className='goalText'>
              <span>저번에 본 강의 복습해보세요!</span>
              <p>작은 습관이 큰 변화를 만듭니다.</p>
              <button onClick={()=>navigate('/saved')}>저장한 강의 이동하기</button>
            </div>
            <div className='goalImg'>
              <img src='./imgs/video.png' ></img>
            </div>
          </div>

        </section>


        <footer className='footer'>
          <div className='mainTitle'>
            <h1>LearnLoop</h1>
          </div>

        </footer>




      
    </div>
  );

}

export default Home;