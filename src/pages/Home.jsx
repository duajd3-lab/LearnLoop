import React, { useEffect, useState } from 'react'
import '../styles/App.scss';
import '../styles/reset.css';
import TodoMemo from '../components/TodoMemo';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';


function Home() {
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const decodeHtml = (text) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
  };

  const searchYoutube = async () => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

    try {
      setLoading(true);

      // const res = await fetch(
      //   `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=4&q=${encodeURIComponent(
      //     '자기계발 강의'
      //   )}&key=${API_KEY}`
      // );
      const res = await fetch(`https://react-todolist-wine.vercel.app/learn`);
      const data = await res.json();
      let course = data.result[0].data;
      let courseKey = Object.keys(course);
      let courseValue = Object.values(course);
     
      let courseItems = [];
      for(let items of courseValue){
        for(let item of items){
          let keyword = item.snippet.channelTitle + item.snippet.description;
          if(keyword.includes('자기계발')){
            courseItems.push(item);
          }
        }
      }


      setVideos(courseItems || []);
    } catch (error) {
      console.error('유튜브 영상 불러오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchYoutube();
  }, []);

  const handleSearch = () => {
    const trimmed = keyword.trim();

    if (!trimmed) {
      navigate('/explore');
      return;
    }

    navigate(`/explore?keyword=${encodeURIComponent(trimmed)}`);
  };

  const handleKeywordClick = (text) => {
    navigate(`/explore?keyword=${encodeURIComponent(text)}`);
  };

  const goMyPage = () => {
    if (auth.currentUser) {
      navigate('/mypage');
    } else {
      navigate('/login');
    }
  };

  return (
    <div>

      {/* ======= hero ======== */}
      <section className='hero'>

        <div>
          {/* left */}
          <div className='heroLeft'>
            <h2>
              오늘의 배움이 <br />
              <span>내일의 나를 만듭니다.</span>
            </h2>
            <div className='subBox'>
              <div>
                <span className="subText">
                  짧은 시간, 확실한 변화! <br />
                  지금 필요한 배움을 쉽고 빠르게 찾아보세요.
                </span>
              </div>
              <div><img src='./imgs/mainImage.png' alt="학습 메인 이미지"></img></div>
            </div>
            <button className="startBtn" onClick={() => navigate('/explore')}>
              강의 탐색하기
            </button>
          </div>
          <div className="floatingTag tag1">📚 자기계발</div>
          <div className="floatingTag tag2">🤖 AI 활용</div>
          <div className="floatingTag tag3">💻 IT 스킬</div>

        </div>

        {/* rigth */}
        <TodoMemo />

      </section>


      {/* ======= 검색 ======== */}
      <section className='exploreSearch'>
        <div className="searchBox">
          <h4>무엇을 배우고 싶으신가요?</h4>

          <div className="inputBox">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              placeholder="검색어를 입력해주세요."
            />

            <button type="button" onClick={handleSearch}>
              <img src='./imgs/ic-search.svg' alt="검색" />
            </button>
          </div>
        </div>

        <div className='searchBtnBox'>
          <div className='sBtn'>
            <button
              type="button"
              className='keywordBtn'
              onClick={() => handleKeywordClick('영상편집')}
            >
              <span className="material-symbols-rounded">
                video_camera_back
              </span>
            </button>
            <p>영상편집</p>
          </div>

          <div className='sBtn'>
            <button
              type="button"
              className='keywordBtn'
              onClick={() => handleKeywordClick('디자인')}
            >
              <span className="material-symbols-rounded">
                design_services
              </span>
            </button>
            <p>디자인</p>
          </div>

          <div className='sBtn'>
            <button
              type="button"
              className='keywordBtn'
              onClick={() => handleKeywordClick('AI툴 활용')}
            >
              <span className="material-symbols-rounded">
                chat_apps_script
              </span>
            </button>
            <p>AI툴 활용</p>
          </div>

          <div className='sBtn'>
            <button
              type="button"
              className='keywordBtn'
              onClick={() => handleKeywordClick('IT 분야')}
            >
              <span className="material-symbols-rounded">
                computer
              </span>
            </button>
            <p>IT 분야</p>
          </div>

          <div className='sBtn'>
            <button
              type="button"
              className='keywordBtn'
              onClick={() => handleKeywordClick('재테크')}
            >
              <span className="material-symbols-rounded">
                attach_money
              </span>
            </button>
            <p>재테크</p>
          </div>

          <div className='sBtn'>
            <button
              type="button"
              className='keywordBtn'
              onClick={() => handleKeywordClick('영어회화')}
            >
              <span className="material-symbols-rounded">
                communication
              </span>
            </button>
            <p>영어회화</p>
          </div>

          <div className='sBtn'>
            <button
              type="button"
              className='keywordBtn'
              onClick={() => handleKeywordClick('글쓰기')}
            >
              <span className="material-symbols-rounded">
                border_color
              </span>
            </button>
            <p>글쓰기</p>
          </div>

          <div className='sBtn'>
            <button
              type="button"
              className='keywordBtn'
              onClick={() => handleKeywordClick('스포츠')}
            >
              <span className="material-symbols-rounded">
                directions_run
              </span>
            </button>
            <p>스포츠</p>
          </div>
        </div>
      </section>


      {/* ======= 강의 영상 ======== */}
      <section className="Homevideo">
        <h3>지금 인기있는 짧은 강의</h3>

        <div className="HomeyoutubeBox">

          {loading ? (
            <p className="loadingText">
              강의를 불러오는 중입니다...
            </p>

          ) : videos.length === 0 ? (
            <p className="loadingText">
              표시할 강의가 없습니다.
            </p>

          ) : (

            videos.slice(0, 4).map((video) => (
              <div
                key={video.id.videoId}
                className="HomevideoClass"
                onClick={() =>
                  window.open(
                    `https://www.youtube.com/watch?v=${video.id.videoId}`,
                    "_blank"
                  )
                }
              >
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                />

                <div className="HomevideoContent">
                  <strong>
                    {decodeHtml(video.snippet.title).length > 28
                      ? decodeHtml(video.snippet.title).slice(0, 28) + "..."
                      : decodeHtml(video.snippet.title)}
                  </strong>

                  <p>{video.snippet.channelTitle}</p>

                  <div className="HomevideoBottom">
                    <span>⭐</span>
                    <em>4.8(1,224)</em>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ======= 바로가기 부분 ======== */}
      <section className='goalSection'>
        <div className='goalInner'>
          <div className='goalText'>
            <span>오늘의 학습 목표를 세워보세요!</span>
            <p>일정을 계획하여 편리하게 관리하세요.</p>
            <button onClick={goMyPage}>Todolist 이동하기</button>
          </div>
          <div className='goalImg'>
            <img src='./imgs/todo.png' alt="학습 목표 관리 이미지"></img>
          </div>
        </div>

        <div className='goalInner'>
          <div className='goalText'>
            <span>저번에 본 강의 복습해보세요!</span>
            <p>작은 습관이 큰 변화를 만듭니다.</p>
            <button onClick={goMyPage}>저장한 강의 이동하기</button>
          </div>
          <div className='goalImg'>
            <img src='./imgs/video.png' alt="저장한 강의 이미지"></img>
          </div>
        </div>

      </section>


      <footer className='footer'>
        <div className='mainTitle'>
          <h1>LearnLoop</h1>
        </div>
        <p>© 2026 LearnLoop. All rights reserved.</p>

      </footer>





    </div>
  );

}

export default Home;