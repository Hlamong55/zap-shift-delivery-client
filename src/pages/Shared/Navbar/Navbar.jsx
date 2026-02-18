import React from "react";
import Logo from "../../../components/Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { FaPowerOff } from "react-icons/fa";

const Navbar = () => {

  const {user, logOut} = useAuth();

  const handleLogOut = () => {
    logOut()
    .then(() => {
      console.log('Logout Successful');
    })
    .catch(error => {
      console.log(error);
    })
  }

  const links = (
    <>
      <li>
        <NavLink>Services</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/about">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/send-parcel">Send Parcel</NavLink>
      </li>
      <li>
        <NavLink to="/beRider">Be a Rider</NavLink>
      </li>

      {
        user && <>
           <li><NavLink to="/dashboard/my-parcels">My Parcel</NavLink></li>
        </>
      }
    </>

  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <span className="btn btn-ghost">
          <Logo></Logo>
        </span>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
         {links}
        </ul>
      </div>
      <div className="navbar-end">
       {
        user ?  
        <a onClick={handleLogOut} className="btn rounded-xl bg-red-500 text-white text-base font-bold hover:bg-red-700">Logout <FaPowerOff /></a>
        : <Link to="/login" className="btn rounded-xl text-base font-bold hover:text-secondary">Sign In</Link>
       }
        <Link to="/beRider" className="btn btn-primary text-black rounded-xl text-base font-bold hover:text-gray-100 mx-3">Be a Rider</Link>
      </div>
    </div>
  );
};

export default Navbar;
