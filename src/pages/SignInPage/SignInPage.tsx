import React from 'react';
import styles from './signInPage.module.css';
import { FormikErrors, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

interface FormInputs {
  login: string;
  password: string;
}

const validate = (values: FormInputs) => {
  const errors: FormikErrors<FormInputs> = {};

  if (!values.login) {
    errors.login = 'Required';
  } else if (values.login.length < 4) {
    errors.login = 'Invalid login';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Invalid password';
  }

  try {
    const response = fetch('https://powerful-tundra-11100.herokuapp.com/signin', {
      body: JSON.stringify(values),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    console.log(response);
  } catch (err) {
    console.log(err);
    errors.password = 'Incorrect login or password';
  }
  return errors;
};

const SignInPage: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validate,
    onSubmit: () => {
      navigate('/');
    },
  });

  return (
    <div className={styles.signUpPage}>
      <p>SignUpPage</p>
      <form className={styles.signInForm} onSubmit={formik.handleSubmit}>
        <label htmlFor="login">
          Enter your login:
          <input
            id="login"
            name="login"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.login}
          />
        </label>
        {formik.touched.login && formik.errors.login ? (
          <div className={styles.error}>{formik.errors.login}</div>
        ) : null}
        <label htmlFor="password">
          Enter your password:
          <input
            id="password"
            name="password"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </label>
        {formik.touched.password && formik.errors.password ? (
          <div className={styles.error}>{formik.errors.password}</div>
        ) : null}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignInPage;
