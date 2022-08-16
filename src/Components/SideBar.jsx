import React from "react";
import "../CSS/Sidebar.css";
import logo from "../Images/logo.png";
import SettingsIcon from "@material-ui/icons/Settings";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  let url = window.location.pathname;
  return (
    <div className="sidebar_box">
      <div className="logo">
        <img src={logo} alt="logo" /> Chemo.
      </div>
      <div className="sidebar_options">
        <ul>
          <li
            onClick={() => navigate("/")}
            className={`${url === "/" && "current"}`}
          >
            <SettingsIcon /> <span>Dashboard</span>
          </li>
          <li
            onClick={() => navigate("/news")}
            className={`${url === "/news" && "current"}`}
          >
            <SettingsIcon /> <span>News</span>
          </li>
          <li
            onClick={() => navigate("/about")}
            className={`${url === "/about" && "current"}`}
          >
            <SettingsIcon /> <span>About</span>
          </li>
        </ul>
      </div>
      <div className="contact_info">
        <div className="information">
          <p>Have any problems with anything?</p>
          <p>Try to contact with us!!</p>
          <Button onClick={() => navigate("/contact")} variant="primary">
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
