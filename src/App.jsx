import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import FactorBoard from './components/factor_board/FactorBoard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/postman" element={<FactorBoard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
