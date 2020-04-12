import React from "react";
import "../App.css";
import logo_light from "../img/logo2.svg";
import logo_dark from "../img/logo2_dark.svg";

const logo = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? logo_dark
  : logo_light;

const Footer = () => (
  <footer className="App-footer">
    <div className="container">
      <hr />
      <div className="footer-logo">
        <img src={logo} alt="logo" />
        <p>
          本ページで使用している潮汐データには、気象庁ホームページにて公開されている潮位表（天文潮位）を利用しています。
        </p>
      </div>
      <div className="footer-contact">
        Contact&nbsp;
        <a
          href="https://twitter.com/tamaki_osamu"
          target="_blank"
          rel="noopener noreferrer"
          alt="twitter"
        >
          @tamaki_osamu
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
