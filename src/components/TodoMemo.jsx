import React from 'react';
import '../styles/TodoMemo.scss';

function TodoMemo() {
  const todos = [
    { id: 1, text: '숏폼 편집 강의 듣기', done: true },
    { id: 2, text: '피그마 UI 따라 만들기', done: false },
    { id: 3, text: '블로그 글쓰기', done: false },
  ];

  return (
    <div className="TodoMemo">
      <div className="fileTab">Today</div>

      <div className="memoHeader">
        <span>오늘의 학습</span>
      </div>

      <ul className="todoList">
        {todos.map((todo) => {
          return (
            <li key={todo.id} className={todo.done ? 'done' : ''}>
              <button className="checkBtn">
                {todo.done && '✓'}
              </button>
              <p>{todo.text}</p>
            </li>
          );
        })}
      </ul>

      <div className="memoBottom">
        <span>진행률 33%</span>
        <div className="progressBar">
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default TodoMemo;