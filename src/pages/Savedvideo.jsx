import React, { useEffect, useState } from 'react'
import '../styles/Savedvideo.scss';

function Savedvideo() {

  const [savedVideos, setSavedVideos] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('savedVideos')) || [];
    setSavedVideos(data);
  }, []);

  const deleteVideo = (videoId) => {
    const filtered = savedVideos.filter((video) => video.videoId !== videoId);

    setSavedVideos(filtered);
    localStorage.setItem('savedVideos', JSON.stringify(filtered));
  };


  return (
    <main className="savedPage">
      <section className="savedHeader">
        <span>Bookmark</span>
        <h2>저장한 강의</h2>
        <p>관심 있는 자기계발 강의를 모아볼 수 있어요.</p>
      </section>

      {savedVideos.length === 0 ? (
        <div className="emptySaved">
          <h3>아직 저장한 강의가 없어요.</h3>
          <p>강의 탐색 페이지에서 관심 강의를 저장해보세요.</p>
        </div>
      ) : (
        <section className="savedGrid">
          {savedVideos.map((video) => (
            <article key={video.videoId} className="savedCard">
              <img src={video.thumbnail} alt={video.title} />

              <div className="savedText">
                <h3>{video.title}</h3>
                <p>{video.channelTitle}</p>
              </div>

              <div className="savedActions">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  강의 보기
                </a>

                <button onClick={() => deleteVideo(video.videoId)}>
                  삭제
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default Savedvideo