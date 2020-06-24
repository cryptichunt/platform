import React, { useState } from "react";
import styled from "styled-components";
import { Link as RouterLink, useHistory } from "react-router-dom";

const NavContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.5s ease;

  @media screen and (max-width: 850px) {
    display: flex;
    position: fixed;
    top: 0;
    left: ${(props) => (props.open ? "0" : "100vh")};
    height: 100vh;
    width: 100vw;
    background: #00000095;
    flex-direction: column;
    z-index: 1001;
    > a {
      margin: 20px 0;
      font-size: 1.3rem;
    }

    > svg {
      margin-top: 40px;
      height: 40px;
      width: 40px;
    }
  }
`;

const RelativeNavContainer = styled.div`
  position: relative;
  height: 10vh;
  width: 100%;
  display: flex;
  padding: 0 30px;
  align-items: center;
  justify-content: space-between;
`;

const NavLogoContainer = styled.div`
  height: 6vh;
  width: 6vh;
  display: ${(props) => (props.mobile ? "none" : "flex")};
  align-items: center;
  justify-content: center;
  /* background: #22272b;
  box-shadow: rgba(256, 256, 256, 0.07) 0px 4px 30px;
  border-radius: 3px; */
  margin: 0 20px;
  text-decoration: none;

  @media screen and (max-width: 850px) {
    display: ${(props) => (props.mobile ? "flex" : "none")};
    height: 3.3vh;
    width: 3.3vh;
    margin: 0;
  }
`;

const NavLogoSvg = styled.svg`
  height: 3.3vh;
  width: auto;
  color: inherit;
`;

const NavLinkComponent = styled.a`
  margin: 0 20px;
  color: inherit;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
`;

const Link = ({ to, children }) => (
  <RouterLink
    to={to}
    component={NavLinkComponent}
    style={{ textDecoration: "none" }}
  >
    {children}
  </RouterLink>
);

const NavLogo = ({ mobile }) => (
  <NavLogoContainer mobile={mobile}>
    <NavLogoSvg
      width="399"
      height="400"
      viewBox="0 0 399 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M385.4 42.8C356.4 24.3 322 13.5 285 13.5C182 13.5 98.5 97 98.5 200C98.5 303 182.1 386.5 285 386.5C321.7 386.5 355.8 375.9 384.7 357.7"
        stroke="currentColor"
        strokeWidth="27"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M45.7 200H279.2"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M251.3 233.6L284.9 200L251.3 166.4"
        stroke="currentColor"
        strokeWidth="12"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M214.6 233.6L248.3 200L214.6 166.4"
        stroke="currentColor"
        strokeWidth="12"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M6.29999 235.9L42.3 200L6.29999 164.1"
        stroke="currentColor"
        strokeWidth="12"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </NavLogoSvg>
  </NavLogoContainer>
);

const IconSvg = styled.svg`
  display: none;
  color: inherit;
  height: 30px;
  width: 30px;
  cursor: pointer;

  @media screen and (max-width: 850px) {
    display: inline;
  }
`;

const Hamburger = ({ onClick }) => (
  <IconSvg fill="currentColor" viewBox="0 0 20 20" onClick={onClick}>
    <path
      fillRule="evenodd"
      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </IconSvg>
);

const Close = ({ onClick }) => (
  <IconSvg fill="currentColor" viewBox="0 0 20 20" onClick={onClick}>
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </IconSvg>
);

const handleSignOut = (history) => () => {
  fetch("/api/auth/logout")
    .then(() => history.push("/signin"))
    .catch(console.error);
};

const AuthenticatedNav = ({ handleClose }) => {
  const history = useHistory();

  return (
    <>
      <Link to="/leaderboard">Leaderboard</Link>
      <Link to="/shop">Shop</Link>
      <Link to="/">Rules</Link>
      <NavLogo />
      <Link to="/play">Play</Link>
      <Link to="/logs">Logs</Link>
      <NavLinkComponent onClick={handleSignOut(history)}>
        Sign Out
      </NavLinkComponent>
      <Close onClick={handleClose} />
    </>
  );
};

const UnauthenticatedNav = ({ handleClose }) => (
  <>
    <Link to="/leaderboard">Leaderboard</Link>
    <Link to="/">Rules</Link>
    <NavLogo />
    <Link to="/signin">Sign In</Link>
    <Link to="/register">Register</Link>
    <Close onClick={handleClose} />
  </>
);

export default ({ authenticated }) => {
  const [open, setOpen] = useState(false);

  return (
    <RelativeNavContainer>
      <NavLogo mobile={true} />
      <Hamburger onClick={() => setOpen(true)} />
      <NavContainer open={open}>
        {authenticated ? (
          <AuthenticatedNav handleClose={() => setOpen(false)} />
        ) : (
          <UnauthenticatedNav handleClose={() => setOpen(false)} />
        )}
      </NavContainer>
    </RelativeNavContainer>
  );
};
