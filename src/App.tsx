import { useState } from 'react';
import './App.css';

const users = [
  { name: 'Emilia', img: 'https://i.pravatar.cc/40?img=2' },
  { name: 'Maja', img: 'https://i.pravatar.cc/40?img=3' },
  { name: 'Krzysiek', img: 'https://i.pravatar.cc/40?img=4' },
];

function App() {
  const [tasks, setTasks] = useState([
    { text: 'Buy almond milk', time: 'Today • 17:00', user: users[0] },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [taskText, setTaskText] = useState('');
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [dueDate, setDueDate] = useState('Today');

  const addTask = () => {
    if (!taskText) return;

    setTasks([
      ...tasks,
      {
        text: taskText,
        time: dueDate,
        user: selectedUser,
      },
    ]);

    setTaskText('');
    setShowModal(false);
  };

  return (
    <div className='app'>
      {/* Header */}
      <header className='header'>
        <h1>
          The <span>Ikigara</span> Household
        </h1>
      </header>

      {/* Tasks */}
      <section className='section'>
        <h3>Tasks</h3>

        <div className='tasks'>
          {tasks.map((task, i) => (
            <div key={i} className='task'>
              <input type='checkbox' />
              <div>
                <p>{task.text}</p>
                <span>{task.time}</span>
              </div>
              <img src={task.user.img} />
            </div>
          ))}
        </div>
      </section>

      {/* ➕ Floating Button */}
      <button className='fab' onClick={() => setShowModal(true)}>
        +
      </button>

      {/* Modal */}
      {showModal && (
        <div className='modal-overlay' onClick={() => setShowModal(false)}>
          <div className='modal' onClick={(e) => e.stopPropagation()}>
            <h3>Task</h3>

            <input
              className='input'
              placeholder='Send invites for game night'
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />

            {/* Assign user */}
            <h4>Person assigned</h4>
            <div className='avatars'>
              {users.map((user, i) => (
                <img
                  key={i}
                  src={user.img}
                  className={
                    selectedUser.name === user.name
                      ? 'avatar selected'
                      : 'avatar'
                  }
                  onClick={() => setSelectedUser(user)}
                />
              ))}
            </div>

            {/* Due date */}
            <h4>Due Date</h4>
            <div className='dates'>
              {['Today', 'Tomorrow', 'Custom'].map((d) => (
                <button
                  key={d}
                  className={dueDate === d ? 'date active' : 'date'}
                  onClick={() => setDueDate(d)}
                >
                  {d}
                </button>
              ))}
            </div>

            <button className='add-btn' onClick={addTask}>
              Add Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
