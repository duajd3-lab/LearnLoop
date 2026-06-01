import '../styles/TodoCalendar.scss';

function TodoCalendar() {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();

  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= lastDate; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="todoCalendar">
      <div className="calendarHeader">
        <div>
          <span>Calendar</span>
          <h3>{year}년 {monthNames[month]}</h3>
        </div>

        <p>오늘 {date}일</p>
      </div>

      <div className="weekDays">
        {dayNames.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="daysGrid">
        {calendarDays.map((day, index) => (
          <button
            key={index}
            className={day === date ? 'today' : ''}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TodoCalendar;