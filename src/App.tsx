import { Routes, Route } from 'react-router-dom';
import './App.css';
import ListHome from './Pages/ListHome';
import { useState } from 'react';

function App() {
  const [showForm, setShowForm] = useState(false);

  const [newItem, setNewItem] = useState({
    text: '',
    category: '',
    store: '',
  });

  const handleAddItem = () => {
    if (!newItem.text) return;

    // @ts-ignore
    // const newEntry = {
    //   id: Date.now(),
    //   text: newItem.text,
    //   category: newItem.category,
    //   store: newItem.store,
    //   completed: false,
    //   completedAt: null,
    //   completedBy: null,
    // };

    // setItems((prev) => [...prev, newEntry]);

    // reset + close
    setNewItem({ text: '', category: '', store: '' });
    setShowForm(false);
  };
  return (
    <div>
      <header className='header'>
        <h1>
          Room<span>mmeez</span>
        </h1>
      </header>
      <Routes>
        <Route path='/' element={<ListHome />} />
        {/* <Route path="/list" element={<ListHome />} /> */}
      </Routes>
      <button className='add-btn' onClick={() => setShowForm(true)}>
        +
      </button>
      {showForm && (
        <div className='modal-overlay'>
          <div className='modal'>
            <h3>Add Item</h3>

            <input
              type='text'
              placeholder='Item (e.g. Milk)'
              value={newItem.text}
              onChange={(e) => setNewItem({ ...newItem, text: e.target.value })}
            />

            <input
              type='text'
              placeholder='Category (e.g. Fruit, Cleaning)'
              value={newItem.category}
              onChange={(e) =>
                setNewItem({ ...newItem, category: e.target.value })
              }
            />

            <input
              type='text'
              placeholder='Recommended Store (optional)'
              value={newItem.store}
              onChange={(e) =>
                setNewItem({ ...newItem, store: e.target.value })
              }
            />

            <div className='modal-actions'>
              <button onClick={handleAddItem}>Add</button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
