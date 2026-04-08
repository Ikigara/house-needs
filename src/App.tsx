import { Routes, Route } from 'react-router-dom';
import './App.css';
import ListHome from './Pages/ListHome';

function App() {
  return (
    <Routes>
      <Route path='/' element={<ListHome />} />
      {/* <Route path="/list" element={<ListHome />} /> */}
    </Routes>
  );
}

export default App;
