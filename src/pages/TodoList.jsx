import React, { useEffect, useState } from 'react'
import '../styles/TodoList.scss';
import TodoCalendar from '../components/TodoCalendar';

function TodoList({ user }) {

  // 투두 데이터 상태
  // 처음 실행될 때 localStorage에 저장된 값이 있으면 가져오고,
  // 없으면 기본 투두 데이터를 사용함
  const [todos, setTodos] = useState([]);
  const [loaded, setLoaded] = useState(false);

  //불러오기
  useEffect(() => {
    if (!user) return;

    const todoKey = `learnloopTodos_${user.uid}`;
    const saveTodos = localStorage.getItem(todoKey);

    setTodos(saveTodos ? JSON.parse(saveTodos) : []);
    setLoaded(true);
  }, [user]);

  // 입력창에 작성한 학습 목표
  const [input, setInput] = useState('');

  // 입력창에 작성한 예상 학습 시간
  const [time, setTime] = useState('');

  // 현재 수정 중인 투두의 id
  // null이면 새 투두 추가 상태
  const [editId, setEditId] = useState(null);


  // todos가 변경될 때마다 localStorage에 저장
  // 새로고침해도 데이터가 유지되게 함
  useEffect(() => {
    if (!user || !loaded) return;

    const todoKey = `learnloopTodos_${user.uid}`;
    localStorage.setItem(todoKey, JSON.stringify(todos));
  }, [todos, user, loaded]);

  // 완료된 투두 개수 계산
  const completedCount = todos.filter((todo) => todo.done).length;

  // 진행률 계산
  // 전체 투두가 0개면 0%, 아니면 완료 개수 / 전체 개수 * 100
  const progress =
    todos.length === 0
      ? 0
      : Math.round((completedCount / todos.length) * 100);

  // 투두 추가 또는 수정 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    // 공백만 입력했을 경우 추가 방지
    if (!input.trim()) return;

    // editId가 있으면 수정 모드
    if (editId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId
            ? {
              ...todo,
              title: input,
              time: Number(time) || 0,
            }
            : todo
        )
      );

      // 수정 완료 후 다시 추가 모드로 변경
      setEditId(null);
    } else {
      // editId가 없으면 새 투두 추가
      const newTodo = {
        id: Date.now(),
        user: user.email,
        title: input,
        time: Number(time) || 0,
        done: false,
      };

      // 새 투두를 맨 위에 추가
      setTodos([newTodo, ...todos]);

    }
    // 입력창 초기화
    setInput('');
    setTime('');
  };

  // 완료 체크 / 체크 해제 함수
  const toggleTodo = (id) => {
    const today = new Date().toISOString().split("T")[0];

    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? {
          ...todo,
          done: !todo.done,
          completedDate: !todo.done ? today : null,
        }
        : todo
    );

    setTodos(updatedTodos);
  };


  // 연속 학습일 계산 함수, 하루에 하나 이상 완료하면 연속 학습일 증가 방식
  const getStreakDays = () => {
    const dates = [
      ...new Set(
        todos
          .filter((todo) => todo.done && todo.completedDate)
          .map((todo) => todo.completedDate)
      ),
    ];

    if (dates.length === 0) return 0;

    dates.sort((a, b) => new Date(b) - new Date(a));

    let streak = 1;

    for (let i = 0; i < dates.length - 1; i++) {
      const current = new Date(dates[i]);
      const next = new Date(dates[i + 1]);

      const diff =
        (current - next) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  //연속 학습일 변수 생성
  const streakDays = getStreakDays();

  // 투두 삭제 함수
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 수정 버튼 클릭 시 실행
  // 선택한 투두 내용을 입력창에 넣고 수정 모드로 전환
  const startEdit = (todo) => {
    setEditId(todo.id);
    setInput(todo.title);
    setTime(todo.time);
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const date = String(today.getDate()).padStart(2, '0');

  const dayNames = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일'
  ];

  const day = dayNames[today.getDay()];


  const getMinutes = (timeText) => {
    if (!timeText) return 0;

    const text = String(timeText).trim();

    // "1시간 20분"
    const hourMatch = text.match(/(\d+)\s*시간/);
    const minuteMatch = text.match(/(\d+)\s*분/);

    const hours = hourMatch ? Number(hourMatch[1]) : 0;
    const minutes = minuteMatch ? Number(minuteMatch[1]) : 0;

    // "20"처럼 숫자만 입력한 경우
    if (!hourMatch && !minuteMatch) {
      const onlyNumber = Number(text);
      return Number.isNaN(onlyNumber) ? 0 : onlyNumber;
    }

    return hours * 60 + minutes;
  };

  //총 학습시간 계산
  const totalStudyTime = todos
    .filter((todo) => todo.done)
    .reduce((acc, todo) => {
      return acc + Number(todo.time || 0);
    }, 0);

  const hour = Math.floor(totalStudyTime / 60);
  const minute = totalStudyTime % 60;

  return (
    <main className="todoPage">
      <div>
        <section className="todoHeader">
          <div className="todayDate">
            <p>
              {year}.{month}.{date} {day}
            </p>
          </div>
          <div className="summaryTop">
            <div>
              <strong>{todos.length}</strong>
              <span>전체 목표</span>
            </div>
            <div>
              <strong>{completedCount}</strong>
              <span>완료</span>
            </div>
          </div>
          <p>
            오늘 목표 {todos.length}개 중 <span>{completedCount}</span>개 완료
          </p>
        </section>

        {/* 진행률 카드 */}
        <aside className="progressCard">
          <h3>Goal</h3>

          <div className="circleProgress" style={{
            background: `conic-gradient(#5b7cfa 0 ${progress}%, #e5e9ff ${progress}% 100%)`,
          }}>
            <span>{progress}%</span>
          </div>
          <p>진행률 {progress}%</p>
          <div className="routineBox">
            <span>🔥 {streakDays}일 연속 학습 중</span>
            <span>
              ⏱ 오늘 학습 시간 {hour}시간 {minute}분
            </span>
          </div>
        </aside>
      </div>


      <section className="todoNote">
        {/* <div className="fileTab">Today</div> */}

        <h3>오늘의 학습</h3>

        {/* 투두 추가/수정 입력 폼 */}
        <form className='todoForm' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='학습 목표를 입력하세요'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            type="number"
            placeholder="예: 20"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <button type="submit">
            {editId ? '수정' : '추가'}
          </button>

        </form>

        {/* 투두 리스트 출력 */}
        <div className="todoListWrap">
          <ul>
            {todos.map((todo) => (
              <li key={todo.id} className={todo.done ? 'done' : ''}>
                <button className="checkBtn"
                  onClick={() => toggleTodo(todo.id)}>
                  {todo.done && '✓'}
                </button>

                <div className='todoInfo'>
                  <p>{todo.title}</p>
                  <span>{todo.time}분</span>
                </div>

                <div className="todoActions">
                  <button onClick={() => startEdit(todo)}>수정</button>
                  <button onClick={() => deleteTodo(todo.id)}>삭제</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>


      <TodoCalendar />



    </main>
  )
}

export default TodoList