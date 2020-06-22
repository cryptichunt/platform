import React from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field as FormikField } from "formik";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useToasts } from "react-toast-notifications";
import { ButtonContainer, Button, Field } from "../forms";

export default () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { fromreg } = router.query;

  React.useEffect(() => {
    if (fromreg) {
      addToast("Your account has been created, please sign in", {
        appearance: "success",
      });
    }
  }, [fromreg]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const token = await executeRecaptcha("login_page");

    // same shape as initial values
    const data = { ...values, recaptcha: token };

    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then(({ success, message }) => {
        if (success) {
          history.push("/play?fromlogin=true", "/play?fromlogin=true", {
            shallow: true,
          });
        } else {
          addToast(message, { appearance: "error" });
          setSubmitting(false);
        }
      })
      .catch(console.error);
  };

  return (
    <Formik
      initialValues={{
        password: "",
        email: "",
      }}
      validationSchema={yup.object().shape({
        email: yup
          .string("Invalid email")
          .email("Invalid email")
          .required("Email is required"),
        password: yup
          .string("Invalid password")
          .required("Password is required")
          .min(3, "Password must be longer than 3 characters")
          .max(20, "Password can't be longer than 20 characters"),
      })}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, isValid, isValidating, dirty }) => (
        <Form>
          <Field
            name="email"
            type="email"
            label="email"
            placeholder="mail@email.com"
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
          {/* TODO: Don't have an account? Register. */}
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
