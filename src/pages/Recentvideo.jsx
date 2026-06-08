import React, { useEffect, useState } from 'react';
import '../styles/Recentvideo.scss';
import { auth } from '../firebase';

function Recentvideo() {
  const [recentVideos, setRecentVideos] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      setRecentVideos([]);
      return;
    }

    const recentKey = `recentVideos_${user.uid}`;
    const data = JSON.parse(localStorage.getItem(recentKey)) || [];

    setRecentVideos(data);
  }, []);

  const deleteRecentVideo = (videoId) => {
    const user = auth.currentUser;
    if (!user) return;

    const recentKey = `recentVideos_${user.uid}`;

    const filtered = recentVideos.filter(
      (video) => video.videoId !== videoId
    );

    setRecentVideos(filtered);
    localStorage.setItem(recentKey, JSON.stringify(filtered));
  };

  return (
    <main className="recentPage">
      <section className="recentHeader">
        <span>Recently Watched</span>
        <h2>최근 본 강의</h2>
        <p>최근 시청한 강의를 다시 확인할 수 있어요.</p>
      </section>

      {recentVideos.length === 0 ? (
        <div className="emptyRecent">
          <h3>최근 본 강의가 없어요.</h3>
          <p>강의 탐색 페이지에서 강의를 시청해보세요.</p>
        </div>
      ) : (
        <section className="recentGrid">
          {recentVideos.map((video) => (
            <article key={video.videoId} className="recentCard">
              <img src={video.thumbnail} alt={video.title} />

              <div className="recentText">
                <h3>{video.title}</h3>
                <p>{video.channelTitle}</p>
              </div>

              <div className="recentActions">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  다시 보기
                </a>

                <button onClick={() => deleteRecentVideo(video.videoId)}>
                  삭제
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Recentvideo;