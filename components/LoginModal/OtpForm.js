import React from 'react'
import { Statistic } from 'antd';
import { connect } from 'react-redux'
import OtpInput from "react-otp-input";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'


function OtpForm({ handleAuth, handleChangeOtp, OTP, inputSignUp, handleProceed, change, auth, storeSettings, verifyOtp, handleForgotPassword, handleForgotPasswordAuth, method ,verifyAccount,disable}) {
    const { Countdown } = Statistic;
    const router = useRouter()

    const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK


    function onChange(val) {
        if (4.95 * 1000 < val && val < 5 * 1000) {
            console.log('changed!');
        }
    }

    console.log('disable otp form',disable)

    return (
        <form onSubmit={verifyOtp && !verifyAccount ? handleForgotPasswordAuth : handleProceed} className='lg:p-0 p-8'>

            <p className="font-montMedium text-xl border-b-2 border-slate-100 mb-2 pb-2 p-4 text-white"  style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`}}>Verify OTP</p>

            <div className='flex flex-col items-start justify-center w-full p-8' >
                <p> OTP has been Sent to {inputSignUp?.method}</p>
                <p className=" cursor-pointer" style={{ color: `${storeSettings.data ? storeSettings.data.primary_color : 'black'}` }} onClick={change}>Change</p>
                {/* <div style={{ border: '1px solid grey', padding: '8px', marginTop: '10px', borderRadius: '3px' }}>
                <input type="text" placeholder="Enter OTP"className="otp-input" name="otp" onChange={handleChangeOtp} required autoComplete="off" />
            </div> */}

                <OtpInput
                    value={OTP}
                    onChange={handleChangeOtp}
                    numInputs={5}
                    separator={<span> -  </span>}
                    inputStyle={{ border: '2px solid black', padding: '10px', width: '40px' }}
                    isInputNum={true}
                    required
                />


                <div className="flex items-center justify-between  w-full">

                    <Countdown title="" value={Date.now() + 30 * 1000} valueStyle={{ fontSize: '17px' }} onChange={onChange} />

                    <p className="text-right mt-4"><span>Didnt receive OTP?</span><span className="text-teal-600 cursor-pointer" style={{ color: `${storeSettings.data ?!disable? storeSettings.data.primary_color:'gray' : 'black'}` }} onClick={(e) => {!disable? !verifyOtp ? handleForgotPassword(e, method, 'isd', "SIGNUP") : handleForgotPassword(e, method, 'value') :''}}>Resend Now</span></p>
                </div>
                
                <button className="otp-button border w-full" style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, color: `white`, padding: '8px', marginTop: '15px', borderRadius: '5px' }}>
                    Verify
                </button>

                <p className="lg:hidden mt-8  font-montSemiBold text-lg border-b-2 border-slate-100 mb-2 pb-2  flex items-center" onClick={() => { router.push('/account/user') }}><ArrowLeftOutlined className='mr-6' />back to login</p>
            </div>
        </form>
    )
}

const mapStateToProps = state => {
    return {
        storeSettings: state.storeSettingsReducer
    }
}

export default connect(mapStateToProps)(OtpForm)