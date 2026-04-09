import { useState, useRef } from "react";
import "../Styles/Home.scss";


const users = [
  { name: "Emilia", img: "https://i.pravatar.cc/40?img=2" },
  { name: "Maja", img: "https://i.pravatar.cc/40?img=3" },
  { name: "Krzysiek", img: "https://i.pravatar.cc/40?img=4" },
];

function Home() {
  const [tasks, setTasks] = useState([
    {
      text: "Buy almond milk",
      time: "Today • 17:00",
      user: users[0],
      completed: false,
      completedBy: null,
      completedAt: null,
      archived: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [dueDate, setDueDate] = useState("Today");

  const touchStartX = useRef(0);

  const addTask = () => {
    if (!taskText) return;

    setTasks([
      ...tasks,
      {
        text: taskText,
        time: dueDate,
        user: selectedUser,
        completed: false,
        completedBy: null,
        completedAt: null,
        archived: false,
      },
    ]);

    setTaskText("");
    setShowModal(false);
  };

  const toggleTask = (index: number) => {
    const updated = [...tasks];

    if (!updated[index].completed) {
      updated[index].completed = true;
      // @ts-ignore
      updated[index].completedBy = selectedUser.name;
      // @ts-ignore
      updated[index].completedAt = "Today";
    } else {
      updated[index].completed = false;
      updated[index].completedBy = null;
      updated[index].completedAt = null;
    }

    setTasks(updated);
  };

  const handleTouchStart = (e: any) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: any, index: number) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;

    // Swipe left threshold
    if (diff > 80) {
      const updated = [...tasks];

      if (updated[index].completed) {
        updated[index].archived = true;
        setTasks(updated);
      }
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>
          Room<span>mmeez</span>
        </h1>
      </header>

      <section className="section">
        <h3>Tasks</h3>

        <div className="tasks">
          {tasks
            .filter((t) => !t.archived)
            .map((task, i) => (
              <div
                key={i}
                className={`task ${task.completed ? "done" : ""}`}
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(e, i)}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(i)}
                />

                <div>
                  <p className={task.completed ? "completed" : ""}>
                    {task.text}
                  </p>

                  {!task.completed && <span>{task.time}</span>}

                  {task.completed && (
                    <span className="completed-meta">
                      Completed {task.completedAt} by {task.completedBy}
                    </span>
                  )}
                </div>

                <img src={task.user.img} />
              </div>
            ))}
        </div>
      </section>

      {/* Add Button */}
      <button className="fab" onClick={() => setShowModal(true)}>
        +
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Task</h3>

            <input
              className="input"
              placeholder="Task name..."
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />

            <h4>Person assigned</h4>
            <div className="avatars">
              {users.map((user, i) => (
                <img
                  key={i}
                  src={user.img}
                  className={
                    selectedUser.name === user.name
                      ? "avatar selected"
                      : "avatar"
                  }
                  onClick={() => setSelectedUser(user)}
                />
              ))}
            </div>

            <h4>Due Date</h4>
            <div className="dates">
              {["Today", "Tomorrow", "Custom"].map((d) => (
                <button
                  key={d}
                  className={dueDate === d ? "date active" : "date"}
                  onClick={() => setDueDate(d)}
                >
                  {d}
                </button>
              ))}
            </div>

            <button className="add-btn" onClick={addTask}>
              Add Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
