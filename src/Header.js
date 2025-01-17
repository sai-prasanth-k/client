import { useEffect, useContext} from "react";
import { Link} from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials:'include',
      method: 'POST'
    });
    setUserInfo(null);
  };

  const username = userInfo?.username;

    return (
     <header className="header-container">
        <Link to="/" className="logo">My Logo</Link>
        <nav className="navbar">
          {username && (
            <>
            <Link to='/create'>Create new post</Link>
            <Link to='/login' onClick={logout}>Logout</Link>
            </>
          )}
          
          {!username && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )
          }
        </nav>
      </header>
    )
}