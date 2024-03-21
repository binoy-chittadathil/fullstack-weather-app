import React from 'react'
import LoginForm from './LoginForm'

function LoginPopupWindow() {
  return (
    <div className=''>
      <dialog id="my_modal_5" className="modal modal-middle">
        <div className="modal-box">
          <LoginForm />
          <div className="modal-action mt-0">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default LoginPopupWindow