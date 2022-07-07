import css from './LoginForm.module.css';
import { useFormik } from 'formik';
import React, { useState } from 'react';

import * as Yup from 'yup';
import { useAuthCtx } from '../../store/authContext';
import { useHistory } from 'react-router-dom';
import { baseUrl, myFetch } from '../../helper/utils';

const initValues = {
  email: '',
  password: '',
};
function LoginForm(props) {
  const { login } = useAuthCtx();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Please enter valid email')
        .required('This field is required'),
      password: Yup.string()
        .min(5, 'Min 5 symbols')
        .max(8, 'Max 8 symbols')
        .required('This field is required'),
    }),
    onSubmit: async (values) => {
      setError('');
      const fetchResult = await myFetch(`${baseUrl}/login`, 'POST', values);

      if (fetchResult.err) {
        setError(fetchResult.err);
        return;
      }
      login(fetchResult.token);
      props.onSuccessLogin();
    },
  });

  return (
    <div className="formContainer">
      <form className={css.form} onSubmit={formik.handleSubmit}>
        <h1 className={css.title}>Please Login</h1>

        <label className={css.label}>Email </label>
        <br />
        <input
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={
            formik.touched.email && formik.errors.email ? css.errorInput : css.input
          }
          name="email"
          placeholder="Your email"
        />

        <p className={css.errorMsg}>{formik.errors.email}</p>
        <label className={css.label}>Password</label>
        <br />
        <input
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className={
            formik.touched.password && formik.errors.password ? css.errorInput : css.input
          }
          name="password"
          placeholder="Your password"
        />
        <p className={css.errorMsg}>{formik.errors.password}</p>
        {error && <p className={css.errorMsg}>{error}</p>}

        <button className={css.btn} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
