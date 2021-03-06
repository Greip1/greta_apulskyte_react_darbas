import css from './AddForm.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthCtx } from '../../store/authContext';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { baseUrlSkills } from '../../helper/utils';

// -----------------------------
const initValues = {
  title: '',
  description: '',
};
// -------------------------------
function AddForm() {
  //
  const { token } = useAuthCtx();

  const history = useHistory();
  const [error, setError] = useState(false);
  const [postCreated, setPostCreated] = useState(false);

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      title: Yup.string().min(5, 'Min 5 characters').required('This field is required'),
      description: Yup.string()
        .min(5, 'Min 5 characters')
        .max(50, 'Max 50 characters')
        .required('This field is required'),
    }),
    onSubmit: async (values) => {
      const newPost = {
        title: values.title,
        description: values.description,
      };
      const resp = await fetch(baseUrlSkills, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });
      const result = await resp.json();
      if (result.msg) {
        setPostCreated(true);
      }
      setError(result.err);
    },
  });
  return (
    <>
      {postCreated ? (
        <>
          <h1 className={css.title}>Add skills</h1>
          <div className={css.successMessage}>
            <p>Post was successfully added!</p>
            <Link className={css.navLink} to={'/home'}>
              <button className={css.btn}>Back to all posts</button>
            </Link>
          </div>
        </>
      ) : (
        <form className={css.form} onSubmit={formik.handleSubmit}>
          <h1 className={css.title}>Add skills</h1>
          <p className={`${css.padding} ${css.errorMsg}`}>{error ? error : ''}</p>
          <label className={css.label}>Title </label>
          <br />
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className={
              formik.touched.title && formik.errors.title ? css.errorInput : css.input
            }
            name="title"
          />
          <br />
          <p className={css.errorMsg}>{formik.errors.title}</p>
          <label className={css.label}> Description</label>
          <br />
          <textarea
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className={
              formik.touched.description && formik.errors.description
                ? css.errorInput
                : css.input
            }
            name="description"
          />
          <p className={css.errorMsg}>{formik.errors.description}</p>
          <div className={css.grid}>
            <button className={css.btn} type="submit">
              Add
            </button>
            <button>
              {' '}
              <Link className={css.link} to={'/home'}>
                Go back
              </Link>
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default AddForm;
