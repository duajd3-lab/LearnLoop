import React, { useState } from 'react';
import '../styles/TodoMemo.scss';

function TodoMemo() {

  const [todos, setTodos] = useState([
    { id: 1, text: '숏폼 편집 강의 듣기', done: true },
    { id: 2, text: '피그마 UI 따라 만들기', done: false },
    { id: 3, text: '블로그 글쓰기', done: false },
    { id: 4, text: '강의 복습하기', done: false },
  ]);

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, done: !todo.done }
          : todo
      )
    );
  };

  return (
    <div className="TodoMemo">
      <div className="fileTab">Today</div>

      <div className="memoHeader">
        <span>오늘의 학습</span>
      </div>

      <ul className="todoList">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={todo.done ? 'done' : ''}
          >
            <button
              className="checkBtn"
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.done ? '✓' : ''}
            </button>

            <p>{todo.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoMemo;