import React from "react";
import styled from "styled-components";
import { Field as FormikField } from "formik";

export const FieldContainer = styled.div`
  width: 100%;
  margin: 30px 0;
`;

export const Message = styled.a`
  font-size: 0.9rem;
  color: #aaa;
  text-decoration: none;
  cursor: pointer;
  display: block;
  text-align: center;
  transition: color 0.15s ease;

  &:hover {
    color: #2977f5;
  }
`;

export const Label = styled.div`
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1.3px;
  margin-bottom: 10px;
`;

export const Error = styled.div`
  font-size: 0.9rem;
  margin-top: 10px;
  color: #ff0000;
`;

export const StyledField = styled(FormikField)`
  border: 2px solid #545454;
  /* border-radius: 3px; */
  padding: 15px 0;
  text-indent: 20px;
  font-size: 1.1rem;
  background: #23272a;
  width: 450px;
  transition: border-color 0.3s ease;
  color: #fff;

  &:focus,
  &:active {
    border-color: #2977f5;
    outline: none;
  }

  &::placeholder {
    color: #686d71;
  }

  @media screen and (max-width: 450px) {
    width: 300px;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 40px 0;
`;

export const Button = styled.button`
  border: none;
  padding: 15px 25px;
  /* border-radius: 3px; */
  color: white;
  background: #2977f5;
  box-shadow: 0px 4px 35px rgba(0, 0, 0, 0.25);
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 2px;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0px 7px 35px #2977f590;
    transform: translateY(-2px);
    outline: none;
  }

  &[disabled] {
    background: #aaa;
    cursor: default;
  }

  &[disabled]:hover {
    box-shadow: 0px 4px 35px rgba(0, 0, 0, 0.25);
    transform: none;
    outline: none;
  }
`;

export const Field = ({ label, name, type, errors, touched, placeholder }) => (
  <FieldContainer>
    <Label>{label}</Label>
    <StyledField name={name} type={type} placeholder={placeholder} />
    {errors[name] && touched[name] && <Error>{errors[name]}</Error>}
  </FieldContainer>
);
