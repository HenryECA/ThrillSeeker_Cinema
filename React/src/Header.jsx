
// Import searchbar
import SearchBar from './SearchBar.jsx';
import { NavLink } from "react-router-dom";
import { RetrieveData } from './utils';


export default function Header() {
  let [userData, error] = RetrieveData();

  console.log(userData.username);
  console.log(error);

  //error = false;

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      
      const logoutPath = "http://127.0.0.1:8000/api/users/logout/"

      fetch(logoutPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((response) => {
        if (!response.ok) {
          console.error('Error:', response);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      })

    }
  };
  return (
    <header>

      <div class="upper_container">
        <div class="text_container">
          <h1>ThrillSeeker Cinema</h1>
          <h2>Lights, camera, action!</h2>
        </div>
      </div>

      <nav>
          <ul className='left'>
          <li>
              <NavLink to="/">Movie Guide</NavLink>
          </li>
          <li>
              <NavLink to="/ratingPage">Rating</NavLink>
          </li>
          <li>
              <NavLink to="/lastYearPage">Best of 2023</NavLink>
          </li>
          <li>
              <NavLink to="/contactInfo">Contact Us</NavLink>
          </li>
          </ul>

          <ul className='right'>
          <li>
            <NavLink to="/registration">Register</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          {/* {!error ? (
              <>
                <li>
                  <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/registration">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )} */}
          </ul>
          
      </nav>
    

    </header>
  );
}
