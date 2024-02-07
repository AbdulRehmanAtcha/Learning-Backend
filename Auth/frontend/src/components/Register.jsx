import React from 'react'

const Register = () => {
    return (
        <div>
            <form className='container'>
                <h2>Registration Form</h2>
                <div className='horizonatl-inputs'>
                    <div className='input-parent'>
                        <label htmlFor="fname">Full Name</label>
                        <input type="text" name="fname" id="fname" placeholder='Enter full name' />
                    </div>
                    <div className='input-parent'>
                        <label htmlFor="uname">Username</label>
                        <input type="text" name="uname" id="uname" placeholder='Enter username' />
                    </div>
                </div>
                <div className='input-parent single'>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" placeholder='Enter email' />
                </div>
                <div className='input-parent single'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder='Enter password' />
                </div>
                <div className='input-parent single'>
                    <label htmlFor="avatar">Avatar</label>
                    <input type="file" name="avatar" id="avatar" />
                </div>
                <div className='input-parent single'>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register
