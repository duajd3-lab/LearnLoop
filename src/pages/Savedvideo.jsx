import React, { useEffect, useState } from 'react';
import '../styles/Savedvideo.scss';
import { auth } from '../firebase';

function Savedvideo() {
  const [savedVideos, setSavedVideos] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const data =
          JSON.parse(localStorage.getItem(`savedVideos_${currentUser.uid}`)) || [];

        setSavedVideos(data);
      } else {
        setSavedVideos([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const deleteVideo = (videoId) => {
    if (!user) return;

    const filtered = savedVideos.filter(
      (video) => video.videoId !== videoId
    );

    setSavedVideos(filtered);
    localStorage.setItem(
      `savedVideos_${user.uid}`,
      JSON.stringify(filtered)
    );
  };

  if (!user) {
    return (
      <main className="savedPage">
        <div className="emptySaved">
          <h3>로그인이 필요합니다.</h3>
          <p>로그인 후 저장한 강의를 확인할 수 있어요.</p>
        </div>
      </main>
    );
  }

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
  );
}

export default Savedvideo;