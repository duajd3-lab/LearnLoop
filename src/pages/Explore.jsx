import React, { useEffect, useState } from 'react'
import '../styles/Explore.scss';
import { useSearchParams } from 'react-router-dom';
import { auth } from '../firebase';
import TopButton from '../components/TopButton';
import { useNavigate } from 'react-router-dom'


function Explore() {
    const [searchParams] = useSearchParams();
    const urlKeyword = searchParams.get('keyword');

    
    const [pageNum,setPageNum] = useState(1);

    const [title, setTitle] = useState(urlKeyword);
    const [videos, setVideos] = useState([]);
    const [keyword, setKeyword] = useState(urlKeyword);

    // 강의 더보기
    const [nextPageToken, setNextPageToken] = useState('');
    const [currentSearch, setCurrentSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const [savedVideos, setSavedVideos] = useState([]);
    const [allData, setAllData] = useState([]);

    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

    const searchYoutube = async (searchText) => {
        if(window.event.type==='submit') window.event.preventDefault();
        if (!searchText || !searchText.trim()) return;

        try {
            //setLoading(true);
            setTitle(searchText);
            setCurrentSearch(searchText);
            setPageNum(1);

            const res = await fetch(`https://react-todolist-wine.vercel.app/learn`);
            const data = await res.json();
            let course = data.result[0].data;
            let courseKey = Object.keys(course);
            let courseValue = Object.values(course);
            
            let courseItems = [];
            for(let items of courseValue){
                for(let item of items){
                let keyword = item.snippet.channelTitle + item.snippet.description;
                
                if(keyword.includes(searchText)){
                    courseItems.push(item);
                }
                }
            }

            setVideos(courseItems.slice(0,8) || []);
            setAllData(courseItems)
            setKeyword('');
        } catch (error) {
            console.error('유튜브 영상 불러오기 실패:', error);
        } finally {
            setLoading(false);
        }
    };

    // 강의 더보기
    const loadMoreVideos = async () => {
        if ( !currentSearch) return;


        try {
            setLoading(true);

            const nextPage = pageNum + 1;
            const totalPage = Math.ceil(allData.length / 8);
            if(totalPage < nextPage) return;

            
            setVideos(allData.slice(0, 8 * nextPage) || []);
            setPageNum(nextPage);

            
        } catch (error) {
            console.error('추가 강의 불러오기 실패:', error);
        } finally {
            setLoading(false);
        }
    };

    // 기본 영상 불러오기
    useEffect(() => {
        if (urlKeyword) {
            searchYoutube(urlKeyword);
            setTitle(urlKeyword);
        } else {
            searchYoutube('자기계발');
            setTitle('자기계발');
        }

        setKeyword('');
    }, [urlKeyword]);

    // 로그인 사용자별 북마크 불러오기
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                setSavedVideos([]);
                return;
            }

            const data =
                JSON.parse(localStorage.getItem(`savedVideos_${user.uid}`)) || [];

            setSavedVideos(data);
        });

        return () => unsubscribe();
    }, []);


    const decodeHtml = (text) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = text;
        return txt.value;
    };



    //스크랩 토글
    const toggleSave = (video) => {
        const user = auth.currentUser;

        if (!user) {
            alert('로그인 후 저장할 수 있습니다.');
            return;
        }

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


        const savedKey = `savedVideos_${user.uid}`;

        const prev = JSON.parse(localStorage.getItem(savedKey)) || [];

        const newVideo = {
            videoId: video.id.videoId,
            title: video.snippet.title,
            channelTitle: video.snippet.channelTitle,
            thumbnail: video.snippet.thumbnails.medium.url,
            url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
        };

        const isAlreadySaved = prev.some(
            (item) => item.videoId === newVideo.videoId
        );

        if (isAlreadySaved) {
            alert('이미 저장된 강의입니다.');
            return;
        }

        localStorage.setItem(savedKey, JSON.stringify([...prev, newVideo]));
        alert('강의가 저장되었습니다.');

        //   navigate('/saved');
    };

    //저장 여부 확인 함수
    const isSaved = (videoId) => {
        return savedVideos.some(
            (video) => video.videoId === videoId
        );
    };


    const saveRecentVideo = (video) => {
        const user = auth.currentUser;

        if (!user) {
            window.open(
                `https://www.youtube.com/watch?v=${video.id.videoId}`,
                '_blank'
            );
            return;
        }

        //최근 본 강의 저장
        const recentKey = `recentVideos_${user.uid}`;

        const prev = JSON.parse(localStorage.getItem(recentKey)) || [];

        const newVideo = {
            videoId: video.id.videoId,
            title: decodeHtml(video.snippet.title),
            channelTitle: video.snippet.channelTitle,
            thumbnail: video.snippet.thumbnails.medium.url,
            url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
            watchedAt: new Date().toISOString(),
        };

        const updatedVideos = [
            newVideo,
            ...prev.filter((item) => item.videoId !== newVideo.videoId),
        ].slice(0, 10);

        localStorage.setItem(recentKey, JSON.stringify(updatedVideos));

        window.open(newVideo.url, '_blank');
    };

    const toggleBookmark = (video) => {

        if (!auth.currentUser) {
            alert('로그인 후 이용 가능합니다.');
            return;
        }

        const exists = savedVideos.some(
            (item) => item.videoId === video.videoId
        );

        if (exists) {
            const updated = savedVideos.filter(
                (item) => item.videoId !== video.videoId
            );

            setSavedVideos(updated);

            localStorage.setItem(
                `savedVideos_${auth.currentUser.uid}`,
                JSON.stringify(updated)
            );
        } else {
            const updated = [...savedVideos, video];

            setSavedVideos(updated);

            localStorage.setItem(
                `savedVideos_${auth.currentUser.uid}`,
                JSON.stringify(updated)
            );
        }
    };

    return (
        <div>
            {/* ======= 검색 ======== */}
            <section className='exploreSearch'>
                {/* search */}
                <div className="searchBox">
                    <h4>무엇을 배우고 싶으신가요?</h4>
                    <div className="inputBox">
                        <form onSubmit={(e)=>searchYoutube(keyword)}>
                            <input
                                type="text"
                                placeholder="관심 있는 강의를 검색해보세요."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <button type='submit'>
                                <img src='./imgs/ic-search.svg' alt='검색'></img>
                            </button>
                        </form>
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
                            onClick={() => searchYoutube('디자인')}>
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
                            onClick={() => searchYoutube('AI툴')}>
                            <span className="material-symbols-rounded">
                                chat_apps_script
                            </span>
                        </button>
                        <p>AI툴 활용</p>
                    </div>
                    <div className='sBtn'>
                        <button type="button"
                            className='keywordBtn'
                            onClick={() => searchYoutube('IT')}>
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
                            className="videoClass"
                            onClick={() => saveRecentVideo(video)}
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
                                    onClick={(e) => { e.stopPropagation(); toggleSave(video); }}
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

                
                    <div className="moreBtnWrap">
                        <button
                            type="button"
                            className="moreBtn"
                            onClick={loadMoreVideos}
                            disabled={loading}
                        >
                            {loading ? '불러오는 중...' : '강의 더보기'}
                        </button>
                    </div>
                

            </section>

            <TopButton />

        </div>


    )
}

export default Explore