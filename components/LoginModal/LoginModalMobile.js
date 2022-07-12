import React, { useEffect, useState } from 'react';
import { Modal, Button, Radio } from 'antd';
import { message as messageAnt, Spin } from 'antd';
import { customerDetails, customerLoginAction, customerSignUpAction, forgotPasswordAction, resetPasswordAction, verifyForgotOtpAction, verifyOtpAction } from '../../actions';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import OtpForm from './OtpForm';
import Error from './Error';
import { useRouter } from 'next/router'
import { customerLogIn, customerSignUp, forgotPasswordAPI, resetPasswordAPI, verifyForgotOtp, verifyOtpAPI } from '../../services/apiServices';
import ResetPassword from './ResetPassword';
import { useMediaQuery } from 'react-responsive';
import { useFirebase } from '../../firebase/useFirebase';


function LoginModalMobile({ userDetails, storeSettings, isLoggedIn, visible, setVisible, showModal, storeId, customerDetails, customerDetailsReducer, dispatchForgotPassword, dispatchResetPassword, dispatchCustomerSignUp, dispatchCustomerLogin, dispatchForgotOtp,
    dispatchVerifyOtp, storeDetails }) {

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
    const [fcmToken,setFcmToken]=useState('')
    const [disable, setDisable] = useState(false)

   const[verifyAccount,setVerifyAccount]=useState(false)
    const router = useRouter()

    


 
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 992px)' })

    useEffect(() => {
        if (!isTabletOrMobile) {
            router.push('/shop')
        }

    }, [isTabletOrMobile])

    // const [customerDetails, setCustomerDetails] = useState()


    // useEffect(()=>{
    //     const fire=()=>{
     
    // }
    // fire()
    // },[])

    console.log('fcmToken',fcmToken)
    useEffect(() => {
        
        console.log('messageeee', message,customerDetails,createAccount)
        console.log('fcmToken',fcmToken)
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
            console.log('Em consol',message)
            messageAnt.error(message)
            setMessage('')
          
        }

        else if (message === "Successful logged in") {
            // setOtp(true)
            // setLoginMethod('email')    
            messageAnt.success('Logged In Successfully ')
            setMessage('')
            router.push('/shop')
            // customerDetails(response.data.customerDetails)
     
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
        else if (message == "OTP verification successful" && !createAccount ) {
            setOtp(true)
            setMessage('')
            setResetPassword(true)
            setOTP('')
            setLoading(false)
        }
        else if(message=="Please Verify Your Account"){
            setMessage('')
               
            setVerifyAccount(true)
            const payload = { method, inputSignUp, value: 'value', setCustomerId, setMessage }
            // const response = await forgotPasswordAPI(method, inputSignUp, 'value')
    
            dispatchForgotPassword({ payload })

            // customerDetails(response.data.customerDetails)
            messageAnt.error('Please Verify Your Account')
            setLoading(false)
        }
        else if (message == "OTP verification successful" && createAccount) {
            
           
            message && messageAnt.success('successfully verified acdcount')
            setOTP('')
            
            setLoading(false)
            setMessage('')
          router.push('/shop')
          
        }
        
        else if (message != '') {
            message && messageAnt.error(message)
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

        const payload = { method, inputSignUp, value: 'value', setCustomerId, setMessage }
        // const response = await forgotPasswordAPI(method, inputSignUp, 'value')

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


        // const response = await verifyForgotOtp(OTP, customerId)
        const payload = { OTP, customerId, customerDetails, setMessage,setOTP,method }

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
        console.log('message',message)
        

    }

    const handleAuth = async (e, verificationType, isd, mode) => {
        e.preventDefault()


        if (mode == "SIGNUP") {
            
            setVerifyAccount(true)

            if (inputSignUp.method.length < 10) {
                messageAnt.error("Please enter valid 10 digit phone number")
            }

            else if (inputSignUp.password != inputSignUp.confirm_password) {
                messageAnt.error("Password and Confirm Password doesn't match ")
            }
            else if (inputSignUp.password.length < 8) {
                messageAnt.error('Password strength is weak, please maintain atleast 8 characters')
            }
            else if(/\s/g.test(inputSignUp.password)){
                
                messageAnt.error('No Blank Spaces Allowed')
        }

            else {

                setLoading(true)
                setAuth(auth)
                setMethod(verificationType)
                const payload = { storeId: 'storeId', inputSignUp, auth, method, setCustomerId, setMessage, setLoading,deviceId:fcmToken,customerDetails }
                // let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                // if (String(inputSignUp?.method)?.match(regexEmail)) {
                if (method == "EMAIL") {
                    // const response = await customerSignUp('storeId', inputSignUp, auth, method)


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

                    // const response = await customerSignUp('storeId', inputSignUp, auth, method)

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


            const payload = { storeId: 'storeId', inputSignUp, auth, method, customerDetails, setMessage,deviceId:fcmToken }
            if (method == "EMAIL") {

                dispatchCustomerLogin({ payload })
                // const response = await customerLogIn('storeId', inputSignUp, auth, method)
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


                // const response = await customerLogIn('storeId', inputSignUp, auth, method)
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
            messageAnt.error('Please Fill the OTP')
        }
        else {
            const response = await verifyOtpAPI('storeId', customerId, OTP, method)
            if (response.data.message == 'successfully verified account') {
                messageAnt.success(response.data.message)
                customerDetails(response.data.customerDetails)
                setOTP('')
               router.push('/shop')
                // handleClose()
            }
            else {
                messageAnt.error(response.data.message)
                setOTP('')
                customerDetails()
            }
        }
     


    }

    
    const handleResetPassword = async (e) => {
        e.preventDefault()



        if (inputSignUp.password != inputSignUp.confirm_password) {
            messageAnt.error("Password and Confirm Password doesn't match ")
        }
        else if (inputSignUp.password.length < 8) {
            messageAnt.error('Password strength is weak, please maintain atleast 8 characters')
        }
        else if(/\s/g.test(inputSignUp.password)){
                
            messageAnt.error('No Blank Spaces Allowed')
    }
        else {

            const response = await resetPasswordAPI(inputSignUp, customerId)

            if (response.data.message == "Password changed succesfully") {

                setOtp(true)
                setVerifyOtp(true)
                setLoading(false)
                router.push('/shop')
             
                // setMessage('Password changed succesfully')
                messageAnt.success(`${response.data.message} & Successfully LoggedIn`)
            }
            else {
                messageAnt.error(response.data.message)
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


    return (
        <div className='h-screen'>
            {/* <p type="primary" onClick={showModal}>
                Sign In
            </p> */}



            {!loading ?
                !error ?
                    !otp ?
                        !createAccount ?
                            <>
                                <div className='w-full p-2' style={{ background: storeSettings.data ? storeSettings.data.primary_color : 'black' }} >
                                    <p className='text-white font-montSemiBold text-lg'>Log In </p>

                                </div>

                                <div className='w-full p-2 flex items-center justify-center mt-8'>
                                    <img src={storeDetails?.logo_img_url} className='max-h-16 w-96 object-contain' />
                                </div>
                                <LoginForm handleAuth={handleAuth} handleChange={handleChange} handleClick={handleClick} disabled={disabled} method={method} handleLoginMethod={handleLoginMethod} handleForgotPassword={handleForgotPassword} forgotPassword={forgotPassword} handleForgotPasswordChange={handleForgotPasswordChange} mobile={true}/>
                            </>
                        :
                            <>
                                <div className='w-full p-2' style={{ background: storeSettings.data ? storeSettings.data.primary_color : 'black' }} >
                                    <p className='text-white font-montSemiBold text-lg'>Sign Up</p>

                                </div>

                                <div className='w-full p-2 flex items-center justify-center'>
                                    <img src={storeDetails?.logo_img_url} className='max-h-16 w-96 object-contain' />
                                </div>
                                <SignupForm handleAuth={handleAuth} handleChange={handleChange} handleClick={handleClick} method={method} storeSettings={storeSettings} handleLoginMethod={handleLoginMethod} inputSignUp={inputSignUp} mobile={true}/>
                            </>
                        : resetPassword ? 
                        <ResetPassword handleResetPassword={handleResetPassword} handleChange={handleChange} mobile={true}/> :
                            <OtpForm handleChangeOtp={handleChangeOtp} inputSignUp={inputSignUp} handleProceed={handleProceed} handleAuth={handleAuth} method={method} inputOtp={inputOtp} OTP={OTP} change={change} auth={auth} verifyOtp={verifyOtp} handleForgotPassword={handleForgotPassword} handleForgotPasswordAuth={handleForgotPasswordAuth} mobile={true} verifyAccount={verifyAccount} disable={disable}/> :
                    <Error msg={msg} mobile={true}/>
                :
                <div className="flex items-center justify-center bg-transparent" style={{ minHeight: '32vh' }}>
                    <Spin size="large" />
                </div>
            }

        </div>
    )
}

const mapStateToProps = state => {
    return {
        customerDetailsReducer: state.customerDetailsReducer,
        storeId: state.storeIdReducer,
        storeDetails: state.storeDetailsReducer?.data,
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
)(LoginModalMobile)
