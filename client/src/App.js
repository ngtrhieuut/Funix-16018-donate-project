import "./App.css"
import axios from "axios";
import {Routes, Route, Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Home from "./Page/Home/Home";
import Admin from "./Page/Amin/Admin";
import DetailPost from "./Components/DetailPost/DetailPost";
import AdminUser from "./Page/Amin/Admin-User";
import Authentication from "./Page/Auth/Authentication";
import { useEffect } from "react";
import { fetchUser, getAUser, logIn } from "./Actions/AuthAction";
import Profile from "./Page/Profile/Profile";
import Editor from "./Components/Editor/Editor";

function App() {

  const dispatch = useDispatch()
  const token = useSelector(state => state.tokenReducer.token)
  const auth = useSelector((state) => state.authReducer); 

  const {isLoggedIn} = auth

  const isAdmin = auth.authData ? auth.authData.isAdmin : false

  useEffect(() => {
    const LoggedIn = localStorage.getItem('LoggedIn')
    if(LoggedIn){
      const getToken = async () => {
        const res = await axios.post('/user/refresh_token', null)
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
  },[auth.isLogged, dispatch])
  
  useEffect(() => {
    if(token) {
      const getUser = () => {
        dispatch(logIn())

        return fetchUser(token).then(res => {
          dispatch(getAUser(res))
        })
      }
      getUser()
    }
  },[token, dispatch])


  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={isLoggedIn ? isAdmin ? <Navigate to="../admin" /> : <Navigate to="../home" /> : <Authentication data={"login"} />} />
        <Route path="/register" element={isLoggedIn ? isAdmin ? <Navigate to="../admin" /> : <Navigate to="../home" /> : <Authentication data={"register"} />} />
        <Route path="/user/activate/:token" element={isLoggedIn ? isAdmin ? <Navigate to="../admin" /> : <Navigate to="../home" /> : <Authentication data={"active"} />} />
        <Route 
          path="/" 
          element={<Navigate to = "../home" />} 
        />
        <Route 
          path="/home"
          element={<Home />}
        /> 
        <Route path="/admin" element={!isLoggedIn ? <Authentication data={"login"} /> : isAdmin ? <Admin /> : <Navigate to="../home" /> } />
        <Route
          path="/post/:postId"
          element={<DetailPost />}
          />
        <Route path="/auth/post/:postId" element={!isLoggedIn ? <Authentication data={"login"} /> : <DetailPost /> } />
        <Route path="/admin-user" element={!isLoggedIn ? <Authentication data={"login"} /> : isAdmin ? <AdminUser /> : <Navigate to="../home" />} />
        <Route path="/forgot-password" element={!isLoggedIn ? <Authentication data={"forgortpasss"} /> : <Navigate to="../home" />} />
        <Route path="/user/reset/:token" element={isLoggedIn ? isAdmin ? <Navigate to="../admin" /> : <Navigate to="../home" /> : <Authentication data={"resetpass"} />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/profile" element={!isLoggedIn ? <Authentication data={"login"} /> : <Profile />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <h1>There's nothing here!</h1>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
