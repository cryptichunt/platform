import React from "react";
import styled from "styled-components";
import { BounceLoader } from "react-spinners";
import { Helmet as Head } from "react-helmet";

const LoadingContainer = styled.div`
  height: 90vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #ff0000;
  text-align: center;
`;

const ErrorDesc = styled.div`
  font-size: 1.3rem;
  color: #ff0000;
  text-align: center;
`;

const LogoSvg = styled.svg`
  height: 70px;
  width: auto;
  margin: 40px 0;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = () => (
  <LogoSvg
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
  </LogoSvg>
);

export default function Loading({ error }) {
  return (
    <>
      <Head>
        <title>{error ? error : "Loading"}</title>
      </Head>
      <LoadingContainer>
        <BounceLoader
          loading={error ? false : true}
          size="300px"
          color="#2977f5"
        />

        {error ? (
          <ErrorContainer>
            <Logo />
            <ErrorTitle>An error occurred</ErrorTitle>
            <ErrorDesc>{error}</ErrorDesc>
          </ErrorContainer>
        ) : (
          ""
        )}
      </LoadingContainer>
    </>
  );
}
