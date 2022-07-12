import { Input } from 'antd'
import React, { useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { connect } from 'react-redux'

function SignupForm({ handleAuth, handleChange, handleClick, method, handleLoginMethod, storeSettings }) {


    const [value, setValue] = useState('+91')

    return (
        <>
            <p className='lg:block text-xl border-b-2 border-slate-300 pb-3 w-full font-montSemiBold hidden'>Sign up</p>

            <form onSubmit={(e) => { handleAuth(e, method,value,"SIGNUP") }} id="form" className="font-montRegular" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <div style={{ border: '1px solid grey', padding: '5px', borderRadius: '3px', marginTop: '10px' }} className='lg:w-96 w-80 '>
                    {/* <input type="text" placeholder="Enter Password" className="login-input outline-none"  /> */}
                    <Input placeholder="Enter Your Name" name="name" onChange={handleChange} required autoComplete="off" bordered={false} />
                </div>

                <div className='flex  mt-4 pl-8 w-full'>
                    <p style={method == 'PHONE' ? { background: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, color: 'white', paddingLeft: '8px', paddingRight: '8px', cursor: 'pointer' } : { color: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, cursor: 'pointer', paddingLeft: '8px', paddingRight: '8px', border: `2px solid ${storeSettings.data ? storeSettings.data.secondary_color : ''}` }}onClick={() => { handleLoginMethod('PHONE') }}>Phone number</p>
                    <p style={method == 'EMAIL' ? { background: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, color: 'white', paddingLeft: '8px', paddingRight: '8px', cursor: 'pointer' } : { color: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, cursor: 'pointer', paddingLeft: '8px', paddingRight: '8px', border: `2px solid ${storeSettings.data ? storeSettings.data.secondary_color : ''}` }} onClick={() => { handleLoginMethod('EMAIL') }}>Email</p>
                </div>

                    {method == "EMAIL" ?
                    <div style={{ border: '1px solid grey', padding: '5px', borderRadius: '3px', marginTop: '10px', }} className='lg:w-96 w-80'>
                        <Input type="email" pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"  placeholder="Enter Email Id" name="method" onChange={handleChange} required autoComplete="off" bordered={false} />
                    </div> :
                    <div className='flex justify-center lg:w-96 w-80 mt-4 border border-gray-500'>
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
                            <div style={{  padding: '5px', borderRadius: '3px', width: '' }} className='w-80 '>
                            <Input type="number" placeholder="Enter Phone Number"  name="method" onChange={handleChange} required autoComplete="off" bordered={false} />
                    </div>
                        </div>
                    }
              

                <div style={{ border: '1px solid grey', padding: '5px', borderRadius: '3px', marginTop: '10px',}} className='lg:w-96 w-80'>
                    {/* <input type="text" placeholder="Enter Password" className="login-input outline-none"  /> */}
                    <Input.Password placeholder="Enter Password" name="password" onChange={handleChange}  minLength={8} maxLength={16}   required autoComplete="off" bordered={false} />
                </div>


                <div style={{ border: '1px solid grey', padding: '5px', borderRadius: '3px', marginTop: '10px', }} className='lg:w-96 w-80'>
                    {/* <input type="text" placeholder="Enter Password" className="login-input outline-none"  /> */}
                    <Input.Password placeholder="Enter Confirm Password" name="confirm_password" onChange={handleChange} required autoComplete="off" bordered={false} />
                </div>

                <button className="mt-4 border login-button lg:w-96 w-80" style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, color: `${storeSettings.data ? storeSettings.data.navbar_color  : 'black'}`, padding: '8px', borderRadius: '5px' }} >
                    SIGN UP
                </button>

                <div className=' mt-8 bottom-0 w-full pr-20'>
                    <p className="login-tag" style={{ textAlign: 'right' }}>Already have an account? <span style={{ color: `${storeSettings.data ? storeSettings.data.primary_color : 'black'}`, cursor: 'pointer' }} onClick={handleClick}>Log in</span></p>
                </div>

                {/* <p className="signup-tag" style={{ marginTop: '10px', textAlign: 'left' }}>Already have an account ?<span style={{ color: `${storeSettings.data?storeSettings.data.primary_color:'black'}`, cursor: 'pointer' }} onClick={handleClick}> Log In</span></p> */}
            </form>
        </>
    )
}

const mapStateToProps = state => { }
export default connect(mapStateToProps)(SignupForm)