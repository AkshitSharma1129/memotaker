import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Notes from './pages/Notes';

function App() {
  return (
    <Routes>
    <Route path="/" element={<Register />}>
      <Route path="/login" element={<Login />} />
      <Route path="/notes/:id" element={<Notes />} />
    </Route>
  </Routes>
  );
}

export default App;
