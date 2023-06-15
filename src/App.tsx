import AuthForm from "./components/Auth/AuthForm"
import NavBar from "./components/NavBar/NavBar"
import {Routes, Route} from 'react-router-dom'


const App = () => {
  return (
    <div className="app">
      <NavBar/>
      <Routes>
        <Route path="/auth" element={<AuthForm title="Authorization" buttonTitle="Log In"/>}/>
        <Route path="/registration" element={<AuthForm title="Registration" buttonTitle="Registration"/>}/>
      </Routes>
    </div>
  )
}

export default App