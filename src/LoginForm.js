import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";

/** LoginForm: for authentication.
 *
 * State:
 * - formData: {}
 * - errors: []
 *
 * Context:
 * - userContext {}
 *
 * RoutesList -> LoginForm */

function LoginForm({ login }) {
  const initialState = {
    username: "",
    password: "",
  };
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState([]);

  /** submits form and checks for errors */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
      navigate('/');
    }
    catch (err) {
      setErrors(err);
    }
  }

  /** updates formData */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(curr => ({
      ...curr,
      [name]: value,
    }));
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='w-50 mt-4 mx-auto'>
        <div className='mb-3'>
          <label className="form-label" htmlFor="login-username"><b>Username</b></label>
          <input
            aria-label="username"
            className='form-control form-control-sm'
            id="login-username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className='mb-3'>
          <label className="form-label" htmlFor="login-password"><b>Password</b></label>
          <input
            type="password"
            aria-label="password"
            className='form-control form-control-sm'
            id="login-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* {errors.length > 0 &&
          <Alert errors={errors[0].message} />} */}

        <button
          className="btn btn-success"
        >Submit</button>
      </form >
    </>
  );
}

export default LoginForm;
