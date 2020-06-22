import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet as Head } from "react-helmet";
import { ToastProvider } from "react-toast-notifications";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import AuthContext from "../../lib/auth-context";
import Navbar from "./components/Layout/Navbar";
import FaviconPng from "../../assets/favicon.png";

import Home from "./pages/index";
import VerifyEmail from "./pages/verify/email";
import Leaderboard from "./pages/leaderboard";
import Logs from "./pages/logs";
import Play from "./pages/play";
import Register from "./pages/register";
import Signin from "./pages/Login";

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

const ContentContainer = styled.div`
  min-height: 90vh;
  width: 100%;
  position: relative;
  z-index: 1000;
`;

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  return (
    <AuthContext.Provider
      value={{ authenticated, user, setAuthenticated, setUser }}
    >
      <ToastProvider autoDismiss={true} autoDismissTimeout={2500}>
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
          <Navbar authenticated={authenticated} />
          <ContentContainer>
            <Router>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/verify/email" component={VerifyEmail} />
                <Route exact path="/leaderboard" component={Leaderboard} />
                <Route exact path="/logs" component={Logs} />
                <Route exact path="/play" component={Play} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/signin" component={Signin} />
              </Switch>
            </Router>
          </ContentContainer>
          {/* TODO: add a footer */}
        </GoogleReCaptchaProvider>
      </ToastProvider>
    </AuthContext.Provider>
  );
}

export default App;
