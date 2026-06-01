import React, { useEffect, useState } from 'react'
import '../styles/TodoList.scss';
import TodoCalendar from '../components/TodoCalendar';

function TodoList() {

  // 투두 데이터 상태
  // 처음 실행될 때 localStorage에 저장된 값이 있으면 가져오고,
  // 없으면 기본 투두 데이터를 사용함
  const [todos, setTodos] = useState(() => {
    const saveTodos = localStorage.getItem('learnloopTodos');
    return saveTodos
      ? JSON.parse(saveTodos)
      : [
        { id: 1, title: '숏폼 편집 강의 듣기', time: '20분', done: true },
        { id: 2, title: '피그마 UI 따라 만들기', time: '30분', done: false },
        { id: 3, title: '블로그 글쓰기', time: '25분', done: false },
        { id: 4, title: '엑셀 함수 복습하기', time: '20분', done: false },
      ];
  });

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
    localStorage.getItem('learnloopTodos', JSON.stringify(todos));
  }, [todos])

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
              time: time || '10분',
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
        title: input,
        time: time || '10분',
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
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, done: !todo.done }
          : todo
      )
    );
  };

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


  return (
    <main className="todoPage">
      <div>
        <section className="todoHeader">
          <div>
            <p>2026.05.27 화요일</p>
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

          <div className="circleProgress"  style={{
              background: `conic-gradient(#5b7cfa 0 ${progress}%, #e5e9ff ${progress}% 100%)`,
            }}>
            <span>{progress}%</span>
          </div>
          <p>진행률 {progress}%</p>
          <div className="routineBox">
            <span>🔥 5일 연속 학습 중</span>
            <span>⏱ 오늘 학습 시간 1h 20m</span>
          </div>
        </aside>
      </div>


      <section className="todoNote">
        <div className="fileTab">Today</div>

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
            type="text"
            placeholder="예: 20분"
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
              onClick={()=> toggleTodo(todo.id)}>
                {todo.done && '✓'}
              </button>

              <div className='todoInfo'>
                <p>{todo.title}</p>
                <span>{todo.time}</span>
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