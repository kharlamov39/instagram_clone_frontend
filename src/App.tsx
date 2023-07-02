import './App.css';
import { Suspense, useEffect, lazy } from 'react';
import Header from './components/Header/Header';
import { Routes, Route} from "react-router-dom"
import { useAppDispatch, useTypedSelector } from "./hooks/hooks";
import { fetchAuthMe } from './redux/authSlice';
import Protected from './components/Protected/Protected';
import { fetchDialogs } from './redux/dialogsSlice';
import { MessageShort } from './types/resTypes';
import io from 'socket.io-client'
import Preload from './components/Preloader/Preloader';
import { lazyRetry } from './utils/lazyRetry';
const Profile = lazy( () => lazyRetry( () => import ('./components/Profile/Profile'), 'Profile' ) );
const Register = lazy( () => lazyRetry( () => import ('./components/Register/Register'), 'Register' ) );
const Dialogs = lazy( () => lazyRetry( () => import ('./components/Dialogs/Dialogs'), 'Dialogs' ) );
const Home = lazy( () => lazyRetry( () => import ('./components/Home/Home'), 'Home' ) );
const FullPostModal = lazy( () => lazyRetry( () => import ('./components/FullPostModal/FullPostModal'), 'FullPostModal' ) );
const UpdateProfile = lazy( () => lazyRetry( () => import ('./components/UpdateProfile/UpdateProfile'), 'UpdateProfile' ) );
const Logout = lazy( () => lazyRetry( () => import ('./components/Logout/Logout'), 'Logout' ) );
// const Register = lazy( () => import ('./components/Register/Register'));
// const Dialogs = lazy( () => import ('./components/Dialogs/Dialogs'));
// const Home = lazy( () => import ('./components/Home/Home'));
// const FullPostModal = lazy( () => import ('./components/FullPostModal/FullPostModal'));
// const UpdateProfile = lazy( () => import ('./components/UpdateProfile/UpdateProfile'));
// const Logout = lazy( () => import ('./components/Logout/Logout'));


var ENDPOINT = 'https://instagram-clone-backend-2.onrender.com'

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
      <Suspense fallback={ <Preload /> }>
        <Routes>
            <Route path='/' element={  <Home /> } /> 
            <Route path='/profile/:id/*' element={  <Profile /> } /> 
            <Route path='/profile/:id/:postId' element={  <FullPostModal modal='modal' btnClose /> } />
            <Route path='/profile/:id/update' element={ <Protected currentId={currentUser?._id}> <UpdateProfile /> </Protected>   } />
            <Route path='/dialogs/*' element={ <Dialogs /> } />
            <Route path='/logout' element={  <Logout />   } />
            <Route path='/register' element={ <Register isAuth={isAuth}/> } />
        </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
