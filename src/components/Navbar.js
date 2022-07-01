import React, { useState } from 'react';

const Navbar = ({ totalPaid, reRender, setReRender }) => {
    const [toggleLoginForm, setToggleLoginForm] = useState(false)
    const [toggleRegisterForm, setToggleRegisterForm] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [loginErrMsg, setLoginErrMsg] = useState('')
    const user = localStorage.getItem('accessToken')

    // Handle register form
    const handleRegisterForm = e => {
        e.preventDefault()
        const name = e.target.regis_name.value
        const email = e.target.regis_email.value
        const pass = e.target.regis_pass.value

        const data = {
            name: name,
            email: email,
            password: pass
        }

        if (name && email && pass) {
            const regex = /^\S+@\S+\.\S+$/
            if (regex.test(email)) {
                if (pass.length > 5) {
                    fetch('https://boxing-eh-11906.herokuapp.com/api/registration', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                        .then(res => res.json())
                        .then(data => {
                            setToggleLoginForm(!toggleLoginForm)
                        })
                    setErrMsg('')
                } else {
                    setErrMsg(<p className='text-red-500'>Password Should longer 5 characters</p>)
                }
            } else {
                setErrMsg(<p className='text-red-500'>Invalid email.</p>)
            }
        } else {
            setErrMsg(<p className='text-red-500'>Please fill up all field.</p>)
        }

        e.target.reset()

    }

    // Handle login form
    const handleLoginForm = e => {
        e.preventDefault()
        const email = e.target.login_email.value
        const pass = e.target.login_pass.value

        if (email && pass) {
            const regex = /^\S+@\S+\.\S+$/
            if (regex.test(email)) {
                if (pass.length > 5) {
                    fetch(`https://boxing-eh-11906.herokuapp.com/api/login/${email}/${pass}`)
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            if (data.data._id) {
                                localStorage.setItem('accessToken', data.token)
                                setToggleLoginForm(!toggleLoginForm)
                                setLoginErrMsg('')
                            } else {
                                setLoginErrMsg(<p className='text-red-500'>Email or password invalid</p>)
                            }
                        })
                    setLoginErrMsg('')
                } else {
                    setLoginErrMsg(<p className='text-red-500'>Email or password invalid</p>)
                }
            } else {
                setLoginErrMsg(<p className='text-red-500'>Email or password invalid</p>)
            }
        } else {
            setLoginErrMsg(<p className='text-red-500'>Please fill up all field.</p>)
        }

        e.target.reset()

    }

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        setReRender(!reRender)
    }

    return (
        <div className='bg-[#F0F8FF] shadow-lg'>
            <div className='w-9/12 mx-auto flex justify-between py-6'>
                <div>
                    <h5 className='font-semibold'>Power-Hack</h5>
                </div>
                <div className='flex '>
                    <h6>Paid total: {totalPaid}</h6>
                    {user ? <button
                        onClick={handleLogout}
                        className='ml-4 bg-gray-300 px-6 py-1 rounded-lg'>
                        Logout
                    </button> : <button
                        onClick={() => setToggleLoginForm(!toggleLoginForm)}
                        className='ml-4 bg-gray-300 px-6 py-1 rounded-lg'>
                        Login
                    </button>}


                    {/* Login form */}
                    <div id="popup-modal" tabindex="-1" class={`${toggleLoginForm ? 'block' : 'hidden'} bg-[rgba(188,188,188,.8)] flex justify-center overflow-y-auto overflow-x-hidden fixed top-5 right-1/2 z-50 md:inset-0 h-modal md:h-full`}>
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className='p-4'>
                                    <h4>Login</h4>
                                    {loginErrMsg}
                                </div>
                                <button
                                    onClick={() => setToggleLoginForm(!toggleLoginForm)}
                                    type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                                <div class="p-6 text-center">
                                    <form
                                        onSubmit={handleLoginForm}
                                        className='px-3 w-3/4 mx-auto'>
                                        <div class="mb-6">
                                            <input
                                                type="email" id="default-input" name='login_email' class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Email' required />
                                            <br />
                                            <input
                                                type="password" id="default-input" name='login_pass' class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Password' required />
                                            <br />
                                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                                        </div>

                                    </form>
                                    <p>Haven't account?
                                        <button
                                            onClick={() => {
                                                setToggleLoginForm(!toggleLoginForm)
                                                setToggleRegisterForm(!toggleRegisterForm)
                                            }}
                                            className='text-blue-500'> Register</button>

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Register form */}
                    <div id="popup-modal" tabindex="-1" class={`${toggleRegisterForm ? 'block' : 'hidden'} bg-[rgba(188,188,188,.8)] flex justify-center overflow-y-auto overflow-x-hidden fixed top-5 right-1/2 z-50 md:inset-0 h-modal md:h-full`}>
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className='p-4'>
                                    <h4>Register</h4>
                                    {errMsg}
                                </div>
                                <button
                                    onClick={() => setToggleRegisterForm(!toggleRegisterForm)}
                                    type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                                <div class="p-6 text-center">
                                    <form
                                        onSubmit={handleRegisterForm}
                                        className='px-3 w-3/4 mx-auto'>
                                        <div class="mb-6">
                                            <input
                                                type="text" id="default-input" name='regis_name' class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Full Name' required />
                                            <br />
                                            <input
                                                type="email" id="default-input" name='regis_email' class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Email' required />
                                            <br />
                                            <input
                                                type="password" id="default-input" name='regis_pass' class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Password' required />
                                            <br />
                                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
                                        </div>

                                    </form>
                                    <p>Already registered?
                                        <button
                                            onClick={() => {
                                                setToggleLoginForm(!toggleLoginForm)
                                                setToggleRegisterForm(!toggleRegisterForm)
                                            }}
                                            className='text-blue-500'> Login</button>

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;