import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from '../api';
import { useNavigate } from 'react-router-dom';

const Register = ({ setToken }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    const { username, password, passwordConfirmation } = data;

    if (password !== passwordConfirmation) {
      setError("Password and password confirmation don't match");
      return;
    }

    try {
      const response = await registerUser(username, password);
      
      if (response.error === "username already exists") {
        setError('Username already exists. Choose another one.');
      } else if (response.token) {
        setToken(response.token);
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p className="error-message">{error}</p>}
      <div>
        <label htmlFor="username">Username:</label>
        <input
          {...register("username", { required: true })}
        />
        {errors.username && <p>Username is required.</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          {...register("password", { required: true })}
        />
        {errors.password && <p>Password is required.</p>}
      </div>
      <div>
        <label htmlFor="passwordConfirmation">Confirm Password:</label>
        <input
          {...register("passwordConfirmation", {
            required: true,
            validate: value =>
              value === password.current || "The passwords do not match"
          })}
        />
        {errors.passwordConfirmation && <p>{errors.passwordConfirmation.message}</p>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
