import './App.css';
import { useEffect } from 'react';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
import Logout from './components/Logout/Logout';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import { Routes, Route} from "react-router-dom"
import { useAppDispatch, useTypedSelector } from "./hooks/hooks";
import { fetchAuthMe } from './redux/authSlice';
import FullPost from './components/FullPost/FullPost';

const App = () => {

  const isAuth = useTypedSelector(state => state.auth.isAuth)
  const currentUser = useTypedSelector( state => state.auth.currentUser )
  const dispatch = useAppDispatch()

  useEffect( () => {
    if(window.localStorage.token) {
      dispatch(fetchAuthMe())
    } 
  }, [])

  return (
    <div className="App">
      <Header isAuth={isAuth} currentUser={currentUser} />
      <div className='container'>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/profile/:id/*' element={ <Profile /> } />
          <Route path='/profile/:id/:postId' element={ <FullPost modal='modal' btnClose />} />
          <Route path='/profile/:id/update' element={ <UpdateProfile /> } />
          <Route path='/logout' element={ <Logout /> } />
          <Route path='/register' element={ <Register isAuth={isAuth}/> } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
