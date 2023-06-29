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
import Dialogs from './components/Dialogs/Dialogs';
import FullPostModal from './components/FullPostModal/FullPostModal';
import Protected from './components/Protected/Protected';
import { fetchDialogs } from './redux/dialogsSlice';
import { MessageShort } from './types/resTypes';
import io from 'socket.io-client'

var ENDPOINT = `${process.env.REACT_APP_API_URL}`

const App = () => {

  const {currentUser, isAuth } = useTypedSelector( state => state.auth )
 
  const dispatch = useAppDispatch()

  useEffect( () => {
    if(window.localStorage.token) {
      dispatch(fetchAuthMe())
    } 
  }, [])


  useEffect( () => {
    const socket = io(ENDPOINT)
    socket.on('res', (data :MessageShort) => dispatch(fetchDialogs()) )
}, [])

  return (
    <div className="App">
      <Header isAuth={isAuth} currentUser={currentUser} />
      <div className='container'>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/profile/:id/*' element={ <Profile /> } />
          <Route path='/profile/:id/:postId' element={ <FullPostModal modal='modal' btnClose />} />
          <Route path='/profile/:id/update' element={ <Protected currentId={currentUser?._id}> <UpdateProfile /> </Protected> } />
          <Route path='/dialogs/*' element={ <Dialogs /> } />
          <Route path='/logout' element={ <Logout /> } />
          <Route path='/register' element={ <Register isAuth={isAuth}/> } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
