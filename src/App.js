import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Archive from './components/Archive'

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
