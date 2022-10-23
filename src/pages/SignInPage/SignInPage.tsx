import React from 'react';
import styles from './signInPage.module.css';
import { FormikErrors, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Input } from '@mui/material';
import { useAppDispatch } from '../../hooks/redux';
import { setIsAuth, setToken, setUserId } from '../../store/reducers/basisSlice';
import { BASE_URL_API } from '../../constants/appConstants';

export interface FormSignInInputs {
  login: string;
  password: string;
}

const SignInPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const validate = async (values: FormSignInInputs) => {
    const errors: FormikErrors<FormSignInInputs> = {};

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

    const makeAuthorisation = async (login: string, password: string) => {
      const getJWT = async (login: string, password: string) => {
        let response;
        try {
          response = await fetch(BASE_URL_API + '/signin', {
            body: JSON.stringify({ login, password }),
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });
        } catch (err) {
          console.log(err);
          errors.password = 'Incorrect login or password';
          response = null;
        }
        const finalResponse = await response?.json();
        return finalResponse?.token;
      };
      const getDataFromJWT = (token: string) => JSON.parse(atob(token.split('.')[1]));

      const token = await getJWT(login, password);
      const dataFromJWT = getDataFromJWT(token);

      dispatch(setToken(token));
      dispatch(setUserId(dataFromJWT.userId));
      dispatch(setIsAuth(true));

      const authData = {
        token: token,
        userId: dataFromJWT.userId,
        isAuth: true,
      };
      localStorage.setItem('authData', JSON.stringify(authData));
    };
    await makeAuthorisation(values.login, values.password);

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: () => {
      localStorage.setItem('isAuth', 'true');
      navigate('/');
    },
  });

  return (
    <div className={styles.signInPage}>
      <Typography variant="h5" component="h1" mt={2} mb={2}>
        Sign In:
      </Typography>
      <form className={styles.signInForm} onSubmit={formik.handleSubmit}>
        <label htmlFor="login">
          Enter your login:
          <Input
            id="login"
            name="login"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.login}
          />
        </label>
        {formik.touched.login && formik.errors.login ? (
          <Typography className={styles.error}>{formik.errors.login}</Typography>
        ) : null}
        <label htmlFor="password">
          Enter your password:
          <Input
            id="password"
            name="password"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </label>
        {formik.touched.password && formik.errors.password ? (
          <Typography className={styles.error}>{formik.errors.password}</Typography>
        ) : null}
        <Button sx={{ marginBottom: 2 }} variant="outlined" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignInPage;
