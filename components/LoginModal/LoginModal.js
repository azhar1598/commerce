import React, { useEffect, useState } from 'react';
import { Modal, Button, Radio } from 'antd';
import { message as messageAnt, Spin } from 'antd';
import { customerDetails, customerLoginAction, customerSignUpAction, forgotPasswordAction, resetPasswordAction, verifyForgotOtpAction, verifyOtpAction } from '../../actions';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import OtpForm from './OtpForm';
import Error from './Error';
import { customerLogIn, customerSignUp, forgotPasswordAPI, resetPasswordAPI, verifyForgotOtp, verifyOtpAPI } from '../../services/apiServices';
import ResetPassword from './ResetPassword';
import { useFirebase } from '../../firebase/useFirebase';
import create from '@ant-design/icons/lib/components/IconFont';
import { toast, ToastContainer } from 'react-toastify';

function LoginModal({ userDetails, storeSettings, isLoggedIn, visible, setVisible, showModal, storeId, customerDetails, customerDetailsReducer, dispatchForgotPassword, dispatchResetPassword, dispatchCustomerSignUp, dispatchCustomerLogin, dispatchForgotOtp,
    dispatchVerifyOtp,showSignUpTab }) {

    const [forgotPassword, setForgotPassword] = useState(false)
    const [input, setInput] = useState([])
    const [inputSignUp, setInputSignUp] = useState()
    const [inputOtp, setInputOtp] = useState()
    const [authType, setAuthType] = useState()
    const [submit, setSubmit] = useState(false)
    // const [customerDetails, setCustomerDetails] = useState()
    const [error, setError] = useState()
    const [otp, setOtp] = useState(false)
    const [createAccount, setCreateAccount] = useState(false)
    const [loginMethod, setLoginMethod] = useState()
    const [msg, setMsg] = useState('Something is wrong,please try again')
    const [disabled, setDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [auth, setAuth] = useState()
    const [method, setMethod] = useState('PHONE')
    const [OTP, setOTP] = useState('')
    const [customerId, setCustomerId] = useState()
    const [verifyOtp, setVerifyOtp] = useState(false)
    const [resetPassword, setResetPassword] = useState(false)
    const [message, setMessage] = useState('')
    const [verifyAccount, setVerifyAccount] = useState(false)
    const [disable, setDisable] = useState(false)

    const [fcmToken, setFcmToken] = useState('')

    const[loginLoader,setLoginLoader]=useState(false)

    // useEffect(()=>{

    useFirebase().then(res => {
        setFcmToken(res)
    })

    // },[])

    console.log('fcmToken', fcmToken)


useEffect(()=>{

    console.log('showSignUpTab',showSignUpTab)

if(showSignUpTab){
    handleClick()
}
},[showSignUpTab])

console.log('showSignUpTab',showSignUpTab)

    useEffect(() => {

     
        setLoginLoader(false)
        // if(resetPassword){
        //     setResetPassword(false)
        // }
        if (message == "verification code sent successfully") {
            setOtp(true)
            setVerifyOtp(true)
            setLoading(false)
            setMessage('')
        }
        else if (message == "signup successful") {

            setOtp(true)
            if (method == 'EMAIL') {
                setLoginMethod('email')

                setMessage('')
                // customerDetails(response.data.customerDetails)
                setLoading(false)
            } else {
                setLoginMethod('phone')
                setMessage('')
                // customerDetails(response.data.customerDetails)
                setLoading(false)
            }
        }

        else if (message == "Email is already taken") {
            setLoading(false)
            console.log('Em consol', message)
            // messageAnt.error(message)
               
            toast.error(message, {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            

            setMessage('')

        }

        else if (message === "Successful logged in") {
            // setOtp(true)
            // setLoginMethod('email')    
         
            toast.success('Logged In Successfully ', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });

            
            setMessage('')
            setLoginLoader(false)
            // customerDetails(response.data.customerDetails)
            setVisible(false)
            setLoading(false)
        }

        else if (message == "verification code sent successfully") {
            setOtp(true)
            setMessage('')
            setVerifyOtp(true)
            setLoading(false)
            setOTP('')
            setResetPassword(false)
        }
        else if (message == "OTP verification successful" && !createAccount) {
            setOtp(true)
            setMessage('')
            setResetPassword(true)
            setOTP('')
            setLoading(false)
        }
        else if (message == "Please Verify Your Account") {
            setMessage('')

            setVerifyAccount(true)
            const payload = { method, inputSignUp, value: 'value', setCustomerId, setMessage }


            dispatchForgotPassword({ payload })

            // customerDetails(response.data.customerDetails)
            // messageAnt.error('Please Verify Your Account')
            toast.error('Please Verify Your Account', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
         


            setLoading(false)
        }
        else if (message == "OTP verification successful" && createAccount) {


            message &&
            //  messageAnt.success('successfully verified acdcount')
            toast.success('successfully verified account', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            
            setOTP('')

            setLoading(false)
            setMessage('')
            setVisible(false)

        }

        else if (message != '') {
            message &&
            //  messageAnt.error(message)
            toast.error(message, {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });


            setMessage('')
            if (!forgotPassword) {
                setForgotPassword(false)
            }
            setLoading(false)
            setOTP('')

        }

    }, [customerId, message])


    const handleForgotPasswordChange = () => {
        setForgotPassword(true)
    }
    const handleForgotPassword = async (e, method, value) => {
        e.preventDefault()
        setLoading(true)
        setDisable(true)
        setTimeout(() => {
            setDisable(false)
        }, 30000)

        const payload = { method, inputSignUp, value: 'value', setCustomerId, setMessage }


        dispatchForgotPassword({ payload })

        // if (response.data.message == "verification code sent successfully") {
        //     setCustomerId(response.data.customerId)
        //     setOtp(true)
        //     setVerifyOtp(true)
        //     setLoading(false)
        // }
        // else {
        //     message.error(response.data.message)
        //     setForgotPassword(false)
        //     setLoading(false)
        // }

    }



    const handleForgotPasswordAuth = async (e) => {
        e.preventDefault()
        setLoading(true)

        console.log('method', method)

        const payload = { OTP, customerId, customerDetails, setMessage, setOTP, method }

        dispatchForgotOtp({ payload })

        // if (response.data.message == "OTP verification successful") {
        //     customerDetails(response.data.customerDetails)
        //     setOtp(true)
        //     setResetPassword(true)
        //     setLoading(false)
        // }
        // else {
        //     message.error(response.data.message)
        //     setForgotPassword(false)
        //     setLoading(false)
        // }

    }

    const handleOk = e => {
        setVisible(true)
    };

    const handleCancel = e => {

        console.log('cancelling')
        setVisible(false)
        setResetPassword(false)
        setForgotPassword(false)
        customerDetails()

        setOtp(false)
        setError(false)
        setCreateAccount(false)

        setVerifyAccount(false)
        setVerifyOtp(false)
    };

    const handleClick = (e) => {

        
        setCreateAccount(!createAccount)
        setForgotPassword(false)
    }

    const handleChange = (e) => {

        setInputSignUp({ ...inputSignUp, [e.target.name]: e.target.value })
      
    }

    const handleChangeOtp = (data) => {
        setOTP(data)
    }

    const handleClose = () => {
        console.log('cancell closing')
        setOtp(false)
        setError(false)
        setCreateAccount(false)
        setForgotPassword(false)
        setResetPassword(false)
        setVerifyAccount(false)
        setVerifyOtp(false)
        console.log('message', message)


    }

    const handleAuth = async (e, verificationType, isd, mode) => {
        e.preventDefault()

        setLoginLoader(true)


        if (mode == "SIGNUP") {

            setVerifyAccount(true)

            if (inputSignUp.method.length < 10) {
                // messageAnt.error("Please enter valid 10 digit phone number")
                toast.error('Please enter valid 10 digit phone number', {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });

            }

            else if (inputSignUp.password != inputSignUp.confirm_password) {
                // messageAnt.error("Password and Confirm Password doesn't match ")
                toast.error("Password and Confirm Password doesn't match", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
            else if (inputSignUp.password.length < 8) {
                // messageAnt.error('Password strength is weak, please maintain atleast 8 characters')
                toast.error("Password strength is weak, please maintain atleast 8 characters", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                
                
            }
            else if(/\s/g.test(inputSignUp.password)){
                
                // messageAnt.error('No Blank Spaces Allowed')
                toast.error("No Blank Spaces Allowed", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                
        }
      

            else {

                setLoading(true)
                setAuth(auth)
                setMethod(verificationType)
                const payload = { storeId: 'storeId', inputSignUp, auth, method, setCustomerId, setMessage, setLoading, deviceId: fcmToken, customerDetails }

                // let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                // if (String(inputSignUp?.method)?.match(regexEmail)) {
                if (method == "EMAIL") {
           


                    dispatchCustomerSignUp({ payload })

                    // if (response.data.message === "signup successful") {
                    //     setOtp(true)
                    //     setLoginMethod('email')
                    //     setCustomerId(response.data.customerDetails.customer_id)
                    //     customerDetails(response.data.customerDetails)
                    //     setLoading(false)

                    // }
                    // else {
                    //     message.error(response.data.message)
                    //     setLoading(false)
                    // }
                }
                else {
                    dispatchCustomerSignUp({ payload })

  

                    // if (response.data.message === "signup successful") {
                    //     setOtp(true)
                    //     setLoginMethod('phone')
                    //     setCustomerId(response.data.customerDetails.customer_id)
                    //     customerDetails(response.data.customerDetails)
                    //     setLoading(false)

                    // }
                    // else {
                    //     message.error(response.data.message)
                    //     setLoading(false)
                    // }
                }

            }
        }
        else {


            const payload = { storeId: 'storeId', inputSignUp, auth, method, customerDetails, setMessage, deviceId: fcmToken }
            console.log("deviceid", payload.deviceId)
            if (method == "EMAIL") {

                console.log('messssage', message)
                dispatchCustomerLogin({ payload })

                // if (response.data.message === "Successful logged in") {
                //     // setOtp(true)
                //     // setLoginMethod('email')
                //     message.success('Logged In Successfully ')
                //     customerDetails(response.data.customerDetails)
                //     setVisible(false)
                //     setLoading(false)
                // }
                // else {
                //     message.error(response.data.message)
                //     setLoading(false)
                // }
            }
            else {


                dispatchCustomerLogin({ payload })
                setLoading(false)
 
                // if (response.data.message === "Successful logged in") {
                //     // setOtp(true)
                //     // setLoginMethod('email')
                //     message.success('Logged In Successfully ')
                //     customerDetails(response.data.customerDetails)
                //     setVisible(false)
                //     setLoading(false)
                // }
                // else {
                //     message.error(response.data.message)
                //     setLoading(false)
                // }
            }
        }
    }


    const handleProceed = async (e) => {


        e.preventDefault();


        if (OTP.length < 5) {
            // messageAnt.error('Please Fill the OTP')
            toast.error('Please Fill the OTP', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            
        }
        else {
            const response = await verifyOtpAPI('storeId', customerId, OTP, method)
            if (response.data.message == 'successfully verified account') {
                // messageAnt.success(response.data.message)

                toast.success(response.data.message, {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                
                customerDetails(response.data.customerDetails)
                setVisible(false)
                // handleClose()
            }
            else {
                // messageAnt.error(response.data.message)

                
                toast.error(response.data.message, {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                customerDetails()
            }
        }
        setOTP('')


    }


    const handleResetPassword = async (e) => {
        e.preventDefault()



        if (inputSignUp.password != inputSignUp.confirm_password) {
            // messageAnt.error("Password and Confirm Password doesn't match ")

            toast.error("Password and Confirm Password doesn't match ", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        else if (inputSignUp.password.length < 8) {
            // messageAnt.error('Password strength is weak, please maintain atleast 8 characters')
            toast.error("Password strength is weak, please maintain atleast 8 characters", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        else if(/\s/g.test(inputSignUp.password)){
                
            // messageAnt.error('No Blank Spaces Allowed')
            toast.error("No Blank Spaces Allowed", {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            
    }
        else {

            const response = await resetPasswordAPI(inputSignUp, customerId)

            if (response.data.message == "Password changed succesfully") {

                setOtp(true)
                setVerifyOtp(true)
                setLoading(false)
                setVisible(false)
                // setMessage('Password changed succesfully')
                // messageAnt.success(`${response.data.message} & Successfully LoggedIn`)
                toast.success(`${response.data.message} & Successfully LoggedIn`, {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
            else {
                // messageAnt.error(response.data.message)
                toast.error(response.data.message, {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                setForgotPassword(false)
                setLoading(false)
            }
        }

    }

    const change = () => {
        setOtp(false)
        setOTP('')
    }

    const handleLoginMethod = (data) => {
        setMethod(data)
    }

    console.log('disable',disable)

    return (
        <div className=''>
            {/* <p type="primary" onClick={showModal}>
                Sign In
            </p> */}
            <Modal
                visible={visible}
                onOk={handleOk}
                afterClose={handleClose}
                destroyOnClose={true}
                onCancel={handleCancel}
                footer={null}
                okButtonProps={{ disabled: true }}
                cancelButtonProps={{ disabled: true }}
                width={500}
                style={{ height: '100px' }}

            >

                {!loading ?
                    !error ?
                        !otp ?
                            !createAccount ?
                                <LoginForm handleAuth={handleAuth} handleChange={handleChange} handleClick={handleClick} disabled={disabled} method={method} handleLoginMethod={handleLoginMethod} handleForgotPassword={handleForgotPassword} forgotPassword={forgotPassword} handleForgotPasswordChange={handleForgotPasswordChange} loginLoader={loginLoader}/>
                                : <SignupForm handleAuth={handleAuth} handleChange={handleChange} handleClick={handleClick} method={method} storeSettings={storeSettings} handleLoginMethod={handleLoginMethod} inputSignUp={inputSignUp} />
                            : resetPassword ? <ResetPassword handleResetPassword={handleResetPassword} handleChange={handleChange} /> :
                                <OtpForm handleChangeOtp={handleChangeOtp} inputSignUp={inputSignUp} handleProceed={handleProceed} handleAuth={handleAuth} method={method} inputOtp={inputOtp} OTP={OTP} change={change} auth={auth} verifyOtp={verifyOtp} handleForgotPassword={handleForgotPassword} handleForgotPasswordAuth={handleForgotPasswordAuth} verifyAccount={verifyAccount} disable={disable}/> :
                        <Error msg={msg} />
                    :
                    <div className="flex items-center justify-center bg-transparent" style={{ minHeight: '32vh' }}>
                        <Spin size="large" />
                    </div>
                }
            </Modal>
            <ToastContainer />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        customerDetailsReducer: state.customerDetailsReducer,
        storeId: state.storeIdReducer,
        storeSettings: state.storeSettingsReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userDetails: () => dispatch(userDetails()),
        isLoggedIn: () => dispatch(isLoggedIn()),
        dispatchForgotPassword: (payload) => dispatch(forgotPasswordAction(payload)),
        dispatchResetPassword: (payload) => dispatch(resetPasswordAction(payload)),
        dispatchCustomerSignUp: (payload) => dispatch(customerSignUpAction(payload)),
        dispatchCustomerLogin: (payload) => dispatch(customerLoginAction(payload)),
        dispatchForgotOtp: (payload) => dispatch(verifyForgotOtpAction(payload)),
        dispatchVerifyOtp: (payload) => dispatch(verifyOtpAction(payload)),
        customerDetails: (data) => dispatch(customerDetails(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginModal)
