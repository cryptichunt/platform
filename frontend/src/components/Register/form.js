import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import RegistrationSchema from "../../backend/api/auth/register-schema";
import { Formik, Form } from "formik";
import { useGoogleReCaptcha as useRecaptcha } from "react-google-recaptcha-v3";
import { ButtonContainer, Button, Field } from "../forms";

export default () => {
  const [formErr, setFormErr] = useState();
  const router = useHistory();

  const { executeRecaptcha } = useRecaptcha();

  const handleSubmit = async (values, { setSubmitting }) => {
    const recaptcha = await executeRecaptcha("login_page");

    const data = { ...values, recaptcha };

    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then(({ success, message }) => {
        if (success) {
          router.push("/signin?fromreg=true", "/signin?fromreg=true", {
            shallow: true,
          });
        } else {
          setFormErr(message);
          setSubmitting(false);
        }
      })
      .catch(console.error);
  };

  return (
    <Formik
      initialValues={{
        username: "",
        discord: "",
        password: "",
        email: "",
        edu: "",
        name: "",
      }}
      validationSchema={RegistrationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, isValid, isValidating, dirty }) => (
        <Form>
          <Field
            name="username"
            type="text"
            label="Username"
            placeholder="username"
            errors={errors}
            touched={touched}
          />
          <Field
            name="email"
            type="email"
            label="email"
            placeholder="mail@email.com"
            errors={errors}
            touched={touched}
          />
          <Field
            name="discord"
            type="text"
            label="Discord"
            placeholder="discord#1234"
            errors={errors}
            touched={touched}
          />
          <Field
            name="name"
            type="text"
            label="Name"
            placeholder="John Doe"
            errors={errors}
            touched={touched}
          />
          <Field
            name="password"
            type="password"
            label="Password"
            placeholder="password"
            errors={errors}
            touched={touched}
          />
          <Field
            name="edu"
            type="text"
            label="Educational Institution (Optional)"
            placeholder="Kar Global University"
            errors={errors}
            touched={touched}
          />
          <ButtonContainer>
            <Button
              type="submit"
              disabled={isSubmitting || !isValid || isValidating || !dirty}
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </Button>
          </ButtonContainer>
        </Form>
      )}
    </Formik>
  );
};
