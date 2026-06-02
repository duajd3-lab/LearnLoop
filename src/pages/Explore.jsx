import React, { useEffect, useState } from 'react'
import '../styles/Explore.scss';
import { useNavigate } from 'react-router-dom';

function Explore() {
    //const navigate = useNavigate();

    const [videos, setVideos] = useState([]);
    const [title, setTitle] = useState('자기계발을 위한 강의');
    const [keyword, setKeyword] = useState('');

    const [savedVideos, setSavedVideos] = useState(() => {
        return JSON.parse(localStorage.getItem('savedVideos')) || [];
    });

    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

    const searchYoutube = async (keyword) => {

        setTitle(`${keyword} `);

        const res = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=8&q=${keyword}&key=${API_KEY}`
        );

        const data = await res.json();

        setVideos(data.items || []);

    };


    useEffect(() => {
        searchYoutube('자기계발을 위한 강의');
    }, []);


    const decodeHtml = (text) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = text;
        return txt.value;
    };



    //스크랩 토글
    const toggleSave = (video) => {
        const videoData = {
            videoId: video.id.videoId,
            title: decodeHtml(video.snippet.title),
            channelTitle: video.snippet.channelTitle,
            thumbnail: video.snippet.thumbnails.medium.url,
            url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
        };

        let updatedVideos;

        if (isSaved(video.id.videoId)) {
            updatedVideos = savedVideos.filter(
                (item) => item.videoId !== video.id.videoId
            );
        } else {
            updatedVideos = [videoData, ...savedVideos];
        }

        setSavedVideos(updatedVideos);
        localStorage.setItem('savedVideos', JSON.stringify(updatedVideos));

        //   navigate('/saved');
    };

    //저장 여부 확인 함수
    const isSaved = (videoId) => {
        return savedVideos.some(
            (video) => video.videoId === videoId
        );
    };

    return (
        <div>
            {/* ======= 검색 ======== */}
            <section className='exploreSearch'>
                {/* search */}
                <div className="searchBox">
                    <h4>무엇을 배우고 싶으신가요?</h4>
                    <div className="inputBox">
                        <input
                            type="text"
                            placeholder="검색어를 입력해주세요."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button type='button' onClick={() => searchYoutube(keyword)}>
                            <img src='./imgs/ic-search.svg' alt='검색'></img>
                        </button>
                    </div>
                </div>

                <div className='searchBtnBox'>
                    <div className='sBtn'>
                        <button
                            type="button"
                            className='keywordBtn'
                            onClick={() => searchYoutube('영상편집')}>
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
                            onClick={() => searchYoutube('디자인 강의')}>
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
                            onClick={() => searchYoutube('AI툴 활용')}>
                            <span className="material-symbols-rounded">
                                chat_apps_script
                            </span>
                        </button>
                        <p>AI툴 활용</p>
                    </div>
                    <div className='sBtn'>
                        <button type="button"
                            className='keywordBtn'
                            onClick={() => searchYoutube('IT 분야')}>
                            <span className="material-symbols-rounded">
                                computer
                            </span>
                        </button>
                        <p>IT 분야</p>
                    </div>
                    <div className='sBtn'>
                        <button type="button"
                            className='keywordBtn'
                            onClick={() => searchYoutube('재테크')}>
                            <span className="material-symbols-rounded">
                                $
                            </span>
                        </button>
                        <p>재테크</p>
                    </div>
                    <div className='sBtn'>
                        <button type="button"
                            className='keywordBtn'
                            onClick={() => searchYoutube('영어회화')}>
                            <span className="material-symbols-rounded">
                                communication
                            </span>
                        </button>
                        <p>영어회화</p>
                    </div>
                    <div className='sBtn'>
                        <button type="button"
                            className='keywordBtn'
                            onClick={() => searchYoutube('글쓰기')}>
                            <span className="material-symbols-rounded">
                                border_color
                            </span>
                        </button>
                        <p>글쓰기</p>
                    </div>
                    <div className='sBtn'>
                        <button type="button"
                            className='keywordBtn'
                            onClick={() => searchYoutube('스포츠')}>
                            <span className="material-symbols-rounded">
                                directions_run
                            </span>
                        </button>
                        <p>스포츠</p>
                    </div>
                </div>

            </section>



            {/* ======= 강의 영상 ======== */}
            <section className='video2'>
                <h3>{title}</h3>

                <div className='youtubeBox'>

                    {videos.map((video) => (

                        <div
                            key={video.id.videoId}
                            className='videoClass'
                            onClick={() =>
                                window.open(
                                    `https://www.youtube.com/watch?v=${video.id.videoId}`,
                                    '_blank'
                                )
                            }
                        >

                            <img
                                src={video.snippet.thumbnails.medium.url}
                                alt={video.snippet.title}
                            />

                            <div className='videoContent'>

                                <span>
                                    {decodeHtml(video.snippet.title).length > 40
                                        ? decodeHtml(video.snippet.title).slice(0, 40) + "..."
                                        : decodeHtml(video.snippet.title)}
                                </span>

                                <p>
                                    {video.snippet.channelTitle}
                                </p>
                            </div>


                            <div className="bookmarkArea">

                                <button
                                    className={`bookmarkBtn ${isSaved(video.id.videoId) ? 'active' : ''
                                        }`}
                                    onClick={(e) => {e.stopPropagation(); toggleSave(video);}}
                                >

                                    <span className="material-symbols-rounded">

                                        {isSaved(video.id.videoId)
                                            ? 'bookmark_added'
                                            : 'bookmark'}

                                    </span>

                                </button>

                            </div>
                        </div>
                    ))}
                </div>

            </section>


        </div>
    )
}

export default Explore