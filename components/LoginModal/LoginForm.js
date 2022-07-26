import { Input } from 'antd'
import React, { useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import { connect } from 'react-redux'

function LoginForm({ handleAuth, handleChange, handleLoginMethod, handleClick, disabled, storeSettings, method, handleForgotPasswordChange, handleForgotPassword, forgotPassword ,mobile}) {

    const [value, setValue] = useState('+91')

    return (
        <>
            <p className='hidden lg:block text-xl text-white border-b-2 border-slate-300 pb-3 w-full font-montMedium p-4 px-12' style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`}}>Log in</p>
            <div className='flex  mt-4 w-full pl-8'>
                <p className='font-montMedium text-sm'  
                    style={method != 'PHONE' ? { color: 'gray', paddingLeft: '8px', paddingRight: '8px', cursor: 'pointer' } : { color: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, cursor: 'pointer', marginLeft: '38px', paddingRight: '8px', }}
                    onClick={() => { handleLoginMethod('PHONE') }}>Phone number</p>
                <p  className='font-montMedium text-sm'  style={method != 'EMAIL' ? {  color: 'gray', paddingLeft: '8px', paddingRight: '8px', cursor: 'pointer' } : { color: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, cursor: 'pointer', paddingLeft: '18px', paddingRight: '8px', }} onClick={() => { handleLoginMethod('EMAIL') }}>Email</p>
            </div>
            <form onSubmit={(e) => { forgotPassword ? handleForgotPassword(e, method, value) : handleAuth(e, method, value, 'LOGIN') }} id="form" className="font-montRegular" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {method == "EMAIL" ?
                    <div style={{ border: '1px solid grey', padding: '5px', borderRadius: '3px', marginTop: '10px', }} className='lg:w-96 w-80'>
                        <Input type="email"  pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}" placeholder="Enter Email Id" name="method" onChange={handleChange} required autoComplete="off" bordered={false} />
                    </div> :
                    <div className='flex justify-center lg:w-96 w-[317px] mt-4 border border-gray-500'>
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
                        <div style={{ padding: '5px', borderRadius: '3px', width: '' }} className='lg:w-80 '>
                            <Input type="number" placeholder="Enter Phone Number" name="method" onChange={handleChange} required autoComplete="off" bordered={false} />
                        </div>
                    </div>
                }
                {!forgotPassword ?
                    <div style={{ border: '1px solid grey', padding: '5px', borderRadius: '3px', marginTop: '10px' }} className='lg:w-96 w-80'>
                        {/* <input type="text" placeholder="Enter Password" className="login-input outline-none"  /> */}
                        <Input.Password placeholder="Enter Password" name="password" onChange={handleChange} required autoComplete="off" bordered={false} />
                    </div> : ''}
                {!forgotPassword ? <div className=' mt-4 bottom-0 w-full pr-8'>
                    <p className="login-tag" style={{ textAlign: 'right', cursor: 'pointer' }} onClick={handleForgotPasswordChange}>Forgot Password ?</p>
                </div> : ''}
                <button className={` border lg:w-96 w-80 login-button ${forgotPassword ? `mt-5` : ``}`} style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, color: `${storeSettings.data ? storeSettings.data.navbar_color : 'black'}`, padding: '8px', borderRadius: '5px' }}  >
                    {forgotPassword ? 'Get OTP' : 'LOG IN'}
                </button>
                <div className=' mt-4 w-full pl-8 bottom-0'>
                    <p className="login-tag" style={{ textAlign: 'left' }}>New User ?<span style={{ color: `${storeSettings.data ? storeSettings.data.primary_color : 'black'}`, cursor: 'pointer' }} onClick={handleClick}>Sign Up</span></p>
                </div>
            </form>
        </>
    )
}

const mapStateToProps = state => {
    return {
        storeSettings: state.storeSettingsReducer
    }
}
export default connect(mapStateToProps)(LoginForm)