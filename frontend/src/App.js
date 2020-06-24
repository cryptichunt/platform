import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet as Head } from "react-helmet";
import { ToastProvider } from "react-toast-notifications";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import AuthContext from "./lib/auth-context";
import Navbar from "./components/Layout/Navbar";
import FaviconPng from "./assets/favicon.png";
import IvyLogo from "./assets/ivyachievement.png";

import Home from "./pages/index";
import VerifyEmail from "./pages/verify/email";
import Leaderboard from "./pages/leaderboard";
import Logs from "./pages/logs";
import Play from "./pages/play";
import Register from "./pages/register";
import Signin from "./pages/signin";
import Shop from "./pages/shop";
import NotFound from "./pages/404";

const GlobalStyles = createGlobalStyle`
  html,
  body, #root {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    color: #fff;
    background: #23272A;
    overflow-x: hidden;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }

  @supports (font-variation-settings: normal) {
    html {
      font-family: 'Inter var', sans-serif;
    }
  }

  .grecaptcha-badge {
    opacity: 0;
    visibility: hidden;
  }
`;

const Footer = styled.div`
  height: 15vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media screen and (max-width: 700px) {
    flex-direction: column;
    padding: 10px 0;
    justify-content: space-between;
  }
`;

const Copy = styled.div`
  font-size: 1.2rem;
`;

const SponsorImg = styled.img`
  height: 8vh;
  width: auto;
`;

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  return (
    <AuthContext.Provider
      value={{ authenticated, user, setAuthenticated, setUser }}
    >
      <ToastProvider autoDismiss={true} autoDismissTimeout={5000}>
        <GoogleReCaptchaProvider reCaptchaKey="6Ldy1AAVAAAAAIfWgWGpIWN-GRPJPL3qlUilitZe">
          <GlobalStyles />
          <Head>
            <meta name="theme-color" content="#000000" />
            <meta name="description" content="Cryptocracy" />
            <link rel="apple-touch-icon" href={FaviconPng} />
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <link rel="shortcut icon" href={FaviconPng} type="image/png" />
            <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            <title>Cryptocracy 2020</title>
          </Head>
          <Router>
            <Navbar authenticated={authenticated} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/verify/email" component={VerifyEmail} />
              <Route exact path="/leaderboard" component={Leaderboard} />
              <Route exact path="/logs" component={Logs} />
              <Route exact path="/play" component={Play} />
              <Route exact path="/shop" component={Shop} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/signin" component={Signin} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Router>
          <Footer>
            <Copy>&copy; Team Cryptocracy 2020</Copy>
            <SponsorImg src={IvyLogo} />
          </Footer>
        </GoogleReCaptchaProvider>
      </ToastProvider>
    </AuthContext.Provider>
  );
}

export default App;
