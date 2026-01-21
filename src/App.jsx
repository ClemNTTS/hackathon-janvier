import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/home/HomePage'
import PostmanPage from './components/pages/PostmanPage'
import ManagerPage from './components/pages/ManagerPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/postman" element={<PostmanPage />} />
        <Route path="/manager" element={<ManagerPage />} />
      </Routes>
    </Router>
  )
}

export default App