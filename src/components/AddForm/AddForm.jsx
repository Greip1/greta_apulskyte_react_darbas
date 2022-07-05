import css from './AddForm.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthCtx } from '../../store/authContext';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { baseUrlSkills, myFetch, myFetchAuth } from '../../helper/utils';

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
      title: Yup.string().min(5, 'Min 5 symbols').required('This field is required'),
      description: Yup.string()
        .min(5, 'Min 5 symbols')
        .max(50)
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
      console.log(result);
      if (result.msg) {
        setPostCreated(true);
      }
      setError(result.err);
    },
  });
  return (
    <>
      {postCreated ? (
        <div className={css.successMessage}>
          <p>Post was successfully added!</p>
          <Link className={css.navLink} to={'/home'}>
            <button className={css.btn}>Back to all posts</button>
          </Link>
          {/* <Link className={css.navLink}  to={'/add'}>
            <button className={css.btn}>Add another</button>
          </Link> */}
        </div>
      ) : (
        <form className={css.form} onSubmit={formik.handleSubmit}>
          <h1 className={css.title}>Add skills</h1>
          {/*  */}
          <p className={`${css.padding} ${css.errorMsg}`}>{error ? error : ''}</p>
          {/*  */}
          <label className={css.label}>
            <p className={css.title}>Title</p>
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
          </label>
          <p className={css.errorMsg}>{formik.errors.title}</p>
          <label className={css.label}>
            <p className={css.title}>Description</p>
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
          </label>

          <p className={css.errorMsg}>{formik.errors.description}</p>
          <button className={css.btn} type="submit">
            Add
          </button>
        </form>
      )}
    </>
  );
}

export default AddForm;
