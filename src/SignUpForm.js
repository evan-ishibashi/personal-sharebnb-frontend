import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";

/** SignupForm: for authentication.
 *
 * State:
 * - formData like {}
 * - errors like [{message: '' or [] }]
 *
 * Context:
 * -userContext => currentUser {}
 *
 * RoutesList -> SignupForm
 */

function SignUpForm({ signup }) {
  const initialState = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();


  /** submits form and checks for errors */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      // test this
      await signup(formData);
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
    <form onSubmit={handleSubmit} className='w-50 mt-4 mx-auto'>
      <div className='mb-3'>
        <label className="form-label" htmlFor="username"><b>Username</b></label>
        <input
          aria-label="username"
          className='form-control form-control-sm'
          id="signup-username"
          name="username"
          value={formData.username}
          onChange={handleChange}

        />
      </div>

      <div className='mb-3'>
        <label className="form-label" htmlFor="password"><b>Password</b></label>
        <input
          type="password"
          aria-label="password"
          className='form-control form-control-sm'
          id="signup-password"
          name="password"
          value={formData.password}
          onChange={handleChange}

        />
      </div>

      <div className='mb-3'>
        <label className="form-label" htmlFor="first_name"><b>First Name</b></label>
        <input
          aria-label="first_name"
          className='form-control form-control-sm'
          id="signup-first_name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}

        />
      </div>

      <div className='mb-3'>
        <label className="form-label" htmlFor="last_name"><b>Last Name</b></label>
        <input
          aria-label="last_name"
          className='form-control form-control-sm'
          id="signup-last_name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}

        />
      </div>

      <div className='mb-3'>
        <label className="form-label" htmlFor="email"><b>Email</b></label>
        <input
          aria-label="email"
          className='form-control form-control-sm'
          id="signup-email"
          name="email"
          value={formData.email}
          onChange={handleChange}

        />
      </div>

      {/* {errors.length > 0 &&
        <Alert errors={errors[0].message} />} */}

      <button
        className="btn btn-success"
      >Submit</button>
    </form>
  );

}

export default SignUpForm;