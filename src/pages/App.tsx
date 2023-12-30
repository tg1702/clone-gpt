import Login from './Login'
import Register from './Register'
import Chat from './Chat'
import Home from './Home'
import {Routes, Route} from 'react-router-dom';

function App() {

 

  return (
    <>   
      <Routes>
        <Route element={ <Register />} path="/register">
        </Route>

        <Route element={<Login />} path="/login">
        </Route>

        <Route element={<Chat />} path="/chat">
        </Route>

        <Route element={ <Home />} path="/">

        </Route>
      </Routes>
    </>
  )
}

export default App
