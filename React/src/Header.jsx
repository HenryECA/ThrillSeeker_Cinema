
// Import searchbar
import SearchBar from './SearchBar.jsx';
import { NavLink } from "react-router-dom";


export default function Header() {
  return (
    <header>

      <div class="upper_container">
        <div class="text_container">
          <h1>ThrillSeeker Cinema</h1>
          <h2>Lights, camera, action!</h2>
        </div>
        {/* <RegistrationItem /> */}
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
              <NavLink to="/login">Log In</NavLink>
          </li>
          <li>
              <NavLink to="/registration">Register</NavLink>
          </li>
          </ul>
          
      </nav>
    

    </header>
  );
}
