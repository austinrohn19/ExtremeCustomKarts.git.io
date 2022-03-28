import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import Home from './components/Home'
import ProductDetails from './components/product/ProductDetails'

import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile'

import ProtectedRoute from './components/route/ProtectedRoute'
import { loadUser } from './actions/userActions'
import store from './store'

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/me"element={<ProtectedRoute> <Profile /> </ProtectedRoute>}/>
          <Route path="/me/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
