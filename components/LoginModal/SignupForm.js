import { Input } from 'antd'
import React, { useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { connect } from 'react-redux'

function SignupForm({ handleAuth, handleChange, handleClick, method, handleLoginMethod, storeSettings }) {


    const [value, setValue] = useState('+91')

    return (
        <>
            <p className='hidden lg:block text-lg border-b-2 border-slate-300 pb-3 w-full font-montMedium hidden p-4 font-montMedium p-4 px-12 text-white' style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }}>Create Account</p>

            <form onSubmit={(e) => { handleAuth(e, method, value, "SIGNUP") }} id="form" className="font-montRegular" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className='flex flex-col'>
                    <p className='text-slate-500 text-sm font-montMedium'>Name</p>
                    <div style={{ border: '1px solid grey', padding: '5px', borderRadius: '3px', marginTop: '-5px' }} className='lg:w-96 w-80 '>
                        {/* <input type="text" placeholder="Enter Password" className="login-input outline-none"  /> */}
                        <Input placeholder="Enter Your Name" name="name" pattern="[a-z]{4,8}"  title="4 to 8  letters" onChange={handleChange} required autoComplete="off" bordered={false} />
                    </div>
                </div>

                <div className='flex  mt-3 w-full pl-10'>
                    <p className='font-montMedium text-sm'
                        style={method != 'PHONE' ? { color: 'gray', cursor: 'pointer', marginLeft: '20px' } : { color: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, cursor: 'pointer', marginLeft: '20px', }}
                        onClick={() => { handleLoginMethod('PHONE') }}>Phone Number</p>
                    <p className='text-slate-300 px-2'>|</p>
                    <p className='font-montMedium text-sm' style={method != 'EMAIL' ? { color: 'gray', cursor: 'pointer' } : { color: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, cursor: 'pointer', }} onClick={() => { handleLoginMethod('EMAIL') }}>Email</p>
                </div>

                {method == "EMAIL" ?
                    <div style={{ border: '1px solid grey', padding: '5px', borderRadius: '3px' }} className='lg:w-96 w-80'>
                        <Input type="email" pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}" placeholder="Enter Email Id" name="method" onChange={handleChange} required autoComplete="off" bordered={false} />
                    </div> :
                    <div className='flex justify-center lg:w-96 w-80 border border-gray-500'>
                        <div className=' flex items-center space-x-0'>
                            <div className='w-16 min-w-16 max-w-24 shrink-0 relative ml-2'>
                                <PhoneInput
                                    inputClass='hidden'
                                    containerClass=''
                                    buttonClass='w-full flag-div'
                                    international
                                    defaultCountry="IN"
                                    enableAreaCodes={true}
                                    placeholder="Enter phone number"
                                    value={value}
                                    onChange={setValue}
                                    required
                                />
                            </div>
                        </div>
                        <div style={{ padding: '5px', borderRadius: '3px', width: '' }} className='w-80 '>
                            <Input type="number" placeholder="Enter Phone Number" name="method" onChange={handleChange} required autoComplete="off" bordered={false} />
                        </div>
                    </div>
                }

                <div className='flex flex-col '> <p className='font-montMedium text-sm text-slate-500 mt-3' >Create Password</p>

                    <div style={{ border: '1px solid grey', padding: '5px', borderRadius: '3px', marginTop: '-5px' }} className='lg:w-96 w-80'>

                        {/* <input type="text" placeholder="Enter Password" className="login-input outline-none"  /> */}
                        <Input.Password placeholder="Enter password" name="password" onChange={handleChange} minLength={8} maxLength={16} required autoComplete="off" bordered={false} />
                    </div>
                </div>


                <div className='flex flex-col '> <p className='font-montMedium text-sm text-slate-500 mt-3' >Confirm Password</p>

                    <div style={{ border: '1px solid grey', padding: '5px', borderRadius: '3px', marginTop: '-5px' }} className='lg:w-96 w-80'>
                        {/* <input type="text" placeholder="Enter Password" className="login-input outline-none"  /> */}
                        <Input.Password placeholder="Enter password again" name="confirm_password" onChange={handleChange} required autoComplete="off" bordered={false} />
                    </div>

                </div>
                <button className="mt-4 border login-button lg:w-96 w-80 font-montMedium" style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, color: `${storeSettings.data ? storeSettings.data.navbar_color : 'black'}`, padding: '8px', borderRadius: '5px' }} >
                    Sign up
                </button>

                <div className=' mt-4 pb-4 px-12 lg:px-0 lg:ml-32  w-full font-montMedium'>
                    <p className="login-tag" style={{ textAlign: 'left' }}>Already have an account? <span style={{ color: `${storeSettings.data ? storeSettings.data.primary_color : 'black'}`, cursor: 'pointer' }} onClick={handleClick}>Log in</span></p>
                </div>

                {/* <p className="signup-tag" style={{ marginTop: '10px', textAlign: 'left' }}>Already have an account ?<span style={{ color: `${storeSettings.data?storeSettings.data.primary_color:'black'}`, cursor: 'pointer' }} onClick={handleClick}> Log In</span></p> */}
            </form>
        </>
    )
}

const mapStateToProps = state => { }
export default connect(mapStateToProps)(SignupForm)