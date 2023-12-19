import { NavLink, Link, useNavigate } from "react-router-dom";
import './NavBar.css';

/** NavBar: displays navbar
 *
 * Props:
 * - logout()
 * - currUser {}
 *
 */
function NavBar({ logout, currUser = null }) {
  /** renders if user is not logged in */

  const navigate = useNavigate();

  function handleClick(){
    logout();
    navigate("/")

  }
  function notLoggedIn() {
    return (
      <>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
        </li>
      </>
    );
  }

  function loggedIn() {
    return (
      <>
        <li className="nav-item">
          <Link className="nav-link" to="/listings">Listings</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/listings/add">Add a new listing</Link>
        </li>
        <button
          className='btn link-danger text-decoration-none'
          onClick={handleClick}>Log Out {currUser.username}</button>
      </>
    );
  }

  return (
    <nav className="Nav navbar navbar-light navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">ShareBnB</Link>

        <ul className="list-unstyled">
          {currUser
            ? loggedIn()
            : notLoggedIn()
          }
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;