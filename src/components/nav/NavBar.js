import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const navigate = useNavigate()

  return (
    <ul className="navbar">
      <li className="navbar__item active">
        <Link className="navbar__link left-margin" to="/">Locations</Link>
        <Link className="navbar__link left-margin" to="/employees">Employees</Link>
        <Link className="navbar__link left-margin" to="/customers">Customers</Link>
        <Link className="navbar__link left-margin" to="/animals">Animals</Link>

      </li>
      {
        localStorage.getItem("kennels_customer")
          ? <li className="navbar__item navbar__logout">
            <Link className="navbar__link" to="/login" onClick={() => {
              localStorage.removeItem("kennels_customer")
              navigate("/login", { replace: true })
            }}>Logout</Link>
          </li>
          : ""
      }
    </ul>
  )
}

