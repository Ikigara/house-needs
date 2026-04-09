import { useState } from 'react';
import '../Styles/ListHome.scss';
import { BsThreeDotsVertical } from 'react-icons/bs';

function ListHome() {
  // mock data
  const [items, setItems] = useState([
    {
      id: 1,
      text: 'Milk',
      completed: true,
      completedAt: Date.now() - 2 * 60 * 60 * 1000,
      completedBy: {
        name: 'Doron',
        avatar: 'https://i.pravatar.cc/30?img=1',
      },
    },
    {
      id: 2,
      text: 'Eggs',
      completed: false,
      completedAt: null,
    }, // 2 hrs ago
    {
      id: 3,
      text: 'Bread',
      completed: false,
      completedAt: null,
    }, // 30 hrs ago (should NOT show)
    { id: 4, text: 'Chicken', completed: false, completedAt: null },
  ]);

  const handleDotsClick = (id: number | string) => {
    console.log('Clicked item:', id);
    // later: open menu, edit, delete, etc.
  };

  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;

  // filter lists
  const needs = items.filter((item) => !item.completed);

  const gotIt = items.filter(
    (item) =>
      item.completed && item.completedAt && now - item.completedAt <= ONE_DAY
  );

  // toggle complete
  const currentUser = {
    name: 'Doron',
    avatar: 'https://i.pravatar.cc/30?img=1',
  };

  // @ts-ignore
  const handleCheck = (id) => {
    // @ts-ignore
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
              completedAt: !item.completed ? Date.now() : null,
              completedBy: !item.completed ? currentUser : null,
            }
          : item
      )
    );
  };

  // @ts-ignore
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='listPage'>
      <h3>House Need</h3>
      {/* NEEDS */}
      <div className='header-line'>
        <span className='line'></span>
        <p style={{ color: 'red' }}>Needs</p>
        <span className='line'></span>
      </div>

      <div className='needItems'>
        {needs.map((item) => (
          <div key={item.id} className='item-row'>
            <input
              type='checkbox'
              checked={item.completed}
              onChange={() => handleCheck(item.id)}
            />
            <p>{item.text}</p>
            <button
              className='dots-btn'
              onClick={() => handleDotsClick(item.id)}
            >
              <BsThreeDotsVertical size={15} />
            </button>
          </div>
        ))}
      </div>

      {/* GOT IT */}
      <div className='header-line'>
        <span className='line'></span>
        <p style={{ color: 'green' }}>Got It</p>
        <span className='line'></span>
      </div>

      <div className='completedItems'>
        {gotIt.map((item) => (
          <div key={item.id} className='item-row'>
            <div className='itemCompleted'>
              <input
                type='checkbox'
                checked={item.completed}
                onChange={() => handleCheck(item.id)}
              />
              <div>
                <p className='completed-text'>{item.text}</p>
                <div className='meta'>
                  <img
                    src={item.completedBy?.avatar}
                    alt='user'
                    className='avatar'
                  />
                  <span>{item.completedBy?.name}</span>
                  <span className='time'>{formatTime(item.completedAt)}</span>
                </div>
              </div>
            </div>

            {/* <div className="completed-content">
              <div className="meta">
                <img
                  src={item.completedBy?.avatar}
                  alt="user"
                  className="avatar"
                />
                <span>{item.completedBy?.name}</span>
                <span className="time">{formatTime(item.completedAt)}</span>
              </div>
            </div> */}

            <button
              className='dots-btn'
              onClick={() => handleDotsClick(item.id)}
            >
              <BsThreeDotsVertical size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListHome;
