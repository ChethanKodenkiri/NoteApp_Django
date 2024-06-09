import {Route,BrowserRouter,Routes, Navigate} from 'react-router-dom'
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoutes from "./components/ProtectedRoutes"

function ClearBeforeRegister(){
  localStorage.clear()
  return <Register/>
}

function Logout(){
  localStorage.clear()
  return <Navigate to='/login'/>
}

function App() {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <ProtectedRoutes>
          <Home/>
        </ProtectedRoutes>
      } />
      <Route path="/register" element={<ClearBeforeRegister/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
 
  )
}

export default App
