import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContexProvider';
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser, user } = useContext(UserContext);
  const navigate = useNavigate();

  //handle login form
  async function handleLoginForm(ev) {
    ev.preventDefault();
    const loginData = { email, password };
    try {
      const { data } = await axios.post('/user/login', loginData);
      setUser(data);
      alert('login successfull');
      setPassword('');
      setEmail('');
      document.getElementById('my_modal_5').close();
      navigate('/weather')
    }
    catch (error) {
      setError('Incorect password or email Id')
      console.error('Logout error:', error);
    }
  }

  return (
    <div onClick={() => setError('')}>
      <h3 className='ml-8 font-semibold'>Login</h3>
      {/* login form */}
      <form className="card-body w-full" onSubmit={handleLoginForm}>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" value={email} onChange={(ev) => setEmail(ev.target.value)}
            placeholder="email" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)}
            placeholder="password" className="input input-bordered" required />
          {/* <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label> */}
          <p className='text-center text-sm text-red-600 italic'>{error}</p>
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>

        <p className='text-center text-sm'>Don't have an account? <Link to={'/signup'}
          onClick={() => document.getElementById('my_modal_5').close()}
          className='text-[#FF6868] hover:underline'>Signup Now</Link></p>
      </form>
    </div>
  )
}

export default LoginForm