import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginPopupWindow from '../login/LoginPopupWindow';
import axios from 'axios'

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // handle signup form submission
  function handleSignup(ev) {
    ev.preventDefault();
    const signupData = { name, email, password };
    if (password === confirmPassword) {
      axios.post('/user/signup', signupData).then(({ data }) => {
        alert('Successfully registered');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }).catch(err => {
        alert('registration failed');
        console.log(err);
      })
    } else {
      alert('Password not match')
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-full py-12'>
      <div className='shadow py-2 sm:py-0 sm:shadow-none w-full flex flex-col items-center justify-center'>
        <h3 className='ml-8 font-semibold'>Sign Up</h3>
        {/* signup form */}
        <form className="card-body sm:w-96 py-1 w-full" onSubmit={handleSignup}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" value={name} onChange={(ev) => setName(ev.target.value)} placeholder="Your Name" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} placeholder="Your Email" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} placeholder="Enter Password" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input type="password" value={confirmPassword} onChange={(ev) => setConfirmPassword(ev.target.value)} placeholder="Re-Enter Password" className="input input-bordered" required />
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary">Sign Up</button>
          </div>

          <p className='text-center text-sm'>All ready have an account?
            <span onClick={() => document.getElementById('my_modal_5').showModal()}
              className='text-[#FF6868] font-semibold cursor-pointer hover:underline'>
              Login
            </span>
          </p>
        </form>
        <LoginPopupWindow />
      </div>
    </div>
  )
}

export default SignupPage