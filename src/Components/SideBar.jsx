import React from "react";
import "../CSS/Sidebar.css";
import logo from "../Images/logo.png";
import SettingsIcon from "@material-ui/icons/Settings";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Home } from "@material-ui/icons";
import { Newspaper } from "@mui/icons-material";

const SideBar = () => {
  const navigate = useNavigate();
  let url = window.location.pathname;
  return (
    <div className="sidebar_box">
      <div className="logo">
        <img src={logo} alt="logo" /> Futurists.
      </div>
      <div className="sidebar_options">
        <ul>
          <li
            tabIndex={0}
            onClick={() => navigate("/")}
            className={`${url === "/" && "current"}`}>
            <Home color={`${url === "/" && "primary"}`} />{" "}
            <span>Dashboard</span>
          </li>
          <li
            tabIndex={0}
            onClick={() => navigate("/news")}
            className={`${url === "/news" && "current"}`}>
            <Newspaper color={`${url === "/news" && "primary"}`} />{" "}
            <span>News</span>
          </li>
          <li
            tabIndex={0}
            onClick={() => navigate("/about")}
            className={`${url === "/about" && "current"}`}>
            <SettingsIcon color={`${url === "/about" && "primary"}`} />{" "}
            <span>About</span>
          </li>
        </ul>
      </div>
      <div className="contact_info">
        <div className="information">
          <p>Have any problems with anything?</p>
          <p>Try to contact with us!!</p>
          <Button variant="primary">
            <a href="mailto:mohankrishnag514@gmail.com">Contact Us </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
