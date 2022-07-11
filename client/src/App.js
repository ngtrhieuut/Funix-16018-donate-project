import "./App.css"
// import Profile from "./pages/Profile/Profile.jsx";
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Auth from "./Page/Auth/Auth";
import Home from "./Page/Home/Home";
import Admin from "./Page/Amin/Admin";
import DetailPost from "./Components/DetailPost/DetailPost";
import ConfirmEmail from "./Page/ConfirmEmail/ConfirmEmail";
import AdminUser from "./Page/Amin/Admin-User";

function App() {

  const location = useLocation();

  const user = useSelector((state) => state.authReducer.authData);

  // let admin = false;
  // if (user) {
  //   admin = user.user.isAdmin;
  // }

  return (
    <div className="App">
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to = "auth" /> : <Navigate to = "home" /> } 
        />
        <Route 
          path="/home"
          element={<Home />}
        /> 
        <Route path="/auth" element={!user ? <Auth /> : !user.user.activeUser ? <Auth /> : user.user.isAdmin ? <Navigate to = "../admin"/> : <Navigate to = "/home" replace state={{from: location}}/>}/>
        <Route path="/admin" element={!user ? <Auth /> : user.user.isAdmin ? <Admin /> : <Navigate to="../home" /> } />
        <Route
          path="/post/:postId"
          element={<DetailPost />}
          />
        <Route path="/auth/post/:postId" element={!user.user.activeUser ? <Auth /> : <DetailPost /> } />
        <Route path="/auth/:userId/:token" element={user ? !user.user.activeUser ? <ConfirmEmail /> : <Navigate to="../auth" /> : <Navigate to="../auth" /> } />
        <Route path="/admin-user" element={!user ? <Auth /> : user.user.isAdmin ? <AdminUser /> : <Navigate to="../home" />} />
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
