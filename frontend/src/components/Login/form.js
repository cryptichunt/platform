import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useToasts } from "react-toast-notifications";
import { ButtonContainer, Button, Field, Message } from "../forms";
import api from "../../lib/api";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default () => {
  const router = useHistory();
  const query = useQuery();
  const { addToast } = useToasts();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const fromreg = query.get("fromreg");

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

    fetch(api("/api/auth/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then(({ success, message }) => {
        if (success) {
          router.push("/play?fromlogin=true", "/play?fromlogin=true", {
            shallow: true,
          });
        } else {
          addToast(message, { appearance: "error" });
          setSubmitting(false);
        }
      })
      .catch((e) => {
        addToast(e.message, { appearance: "error" });
        console.error(e);
      });
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
          <Link to="/register" component={Message}>
            Don't have an account?
          </Link>
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
