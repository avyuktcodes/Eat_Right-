
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from '../components/Homepage.jsx'
import ProductDetail from '../components/ProductDetail.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:barcode" element={<ProductDetail />} />
      </Routes>
    </>
  )
}

export default App
