import { useState, useEffect } from 'react';
import '../Styles/ListHome.scss';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { requestNotificationPermission } from '../../firebase';

interface TodoItem {
  id: number | string;
  text: string;
  completed: boolean;
  completedAt: number | null;
  completedBy?: {
    name: string;
    avatar: string;
  } | null;
}

const INITIAL_ITEMS: TodoItem[] = [
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
  { id: 2, text: 'Eggs', completed: false, completedAt: null },
  { id: 3, text: 'Bread', completed: false, completedAt: null },
  { id: 4, text: 'Chicken', completed: false, completedAt: null },
];

const ONE_DAY = 24 * 60 * 60 * 1000;

function ListHome() {
  const [items, setItems] = useState<TodoItem[]>(INITIAL_ITEMS);

  // ✅ Initialize with Date.now() so you don't need to 'sync' it in useEffect
  // ✅ Pass a function to useState. React only runs this once on mount.
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const currentUser = {
    name: 'Doron',
    avatar: 'https://i.pravatar.cc/30?img=1',
  };

  const handleDotsClick = (id: number | string) => {
    console.log('Clicked item:', id);
  };

  const handleCheck = (id: number | string) => {
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

  const formatTime = (timestamp: number | null) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const needs = items.filter((item) => !item.completed);

  const gotIt = items.filter((item) => {
    if (!item.completed || !item.completedAt) return false;
    // This will now work perfectly on the first render
    return now - item.completedAt <= ONE_DAY;
  });

  return (
    <div className='listPage'>
      <h3>House Need</h3>

      <div className='header-line'>
        <span className='line'></span>
        <p style={{ color: 'red' }}>Needs</p>
        <span className='line'></span>
      </div>

      <button
        onClick={async () => {
          const token = await requestNotificationPermission();
          console.log('Token:', token);
        }}
      >
        Enable Notifications
      </button>

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
                  {item.completedBy && (
                    <>
                      <img
                        src={item.completedBy.avatar}
                        alt='user'
                        className='avatar'
                      />
                      <span>{item.completedBy.name}</span>
                    </>
                  )}
                  <span className='time'>{formatTime(item.completedAt)}</span>
                </div>
              </div>
            </div>
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
