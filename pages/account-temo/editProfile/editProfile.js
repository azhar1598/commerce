// import React, { useState, useEffect } from 'react'
// import { connect } from 'react-redux'
// import { AiOutlineCamera } from 'react-icons/ai';
// import { Button } from '@components/inputs';
// import { updateUserDetails } from '@redux/user/user-action';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Profile({ type, fullname, email_id, phone, id,updateUserDetails }) {
//   const [mobNavHeight, setMobNavHeight] = useState(0)
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const objerver = new ResizeObserver(function (e) {
//         if (e[0].contentRect.width < 640 && mobNavHeight == 0) {
//           const ele = document.getElementById('mob-navbar')
//           if (ele) {
//             if (ele.offsetWidth != mobNavHeight) {
//               // console.log(ele)
//               setMobNavHeight(ele.offsetHeight)
//             }
//           }
//         }
//       })
//       objerver.observe(document.body)
//     }
//   }, [])
//   const [profile, setprofile] = useState({
//     customerId: id,
//     deviceId: null,
//     fullName: fullname,
//     emailId: email_id,
//     phone: phone,
//     social_auth_origin: "",
//     social_auth_token: ""
//   })
//   const [state, setstae] = useState({ file: '', imageurl: '' })
//   const onChange = (e) => {
//     const { value, name } = e.target;
//     console.log(value)
//     setprofile({ ...profile, [name]: value })
//   }
//   const onSubmitHandler = () => {
//     // fetcher('post', `?r=customer/update-login-details&customerId=${id}`, profile).then((response) => { console.log(response) }).catch((err) => { console.log(err) })
//     updateUserDetails(profile)

//   }
//   const handleSubmit = () => {

//   }
//   const imagepreview = (<div className="rounded w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] bg-gray-100 text-gray-400 m-8 lg:mx-8 md:mx-8 lg:my-0 md:my-0 z-100 flex justify-center items-center">
//     <span className='text-3xl font-extrabold	' >
//       {(() => {
//         const name = fullname?.split(' ')
//         if (name.length) {
//           if (name.length > 1) {
//             return `${name[0][0]}${name[name.length - 1][0]}`.toUpperCase()
//           }
//           return `${name[0][0]}${name[0][1]}`.toUpperCase()
//         }
//         return 'A'
//       })()}
//     </span>
//     <span className=' cursor-pointer relative -top-14 left-9 lg:-top-20 lg:left-10 text-3xl font-extrabold	' onClick={(e) => handleSubmit(e)} >
//       <AiOutlineCamera color={'gray'} />
//     </span>
//   </div>)
//   return (

//     <div className={` w-full h-[100vh] md:h-auto ${type === 'index' ? "lg:w-full" : "lg:w-1/2"}  md:w-full  `}>
//       {/* <ToastContainer></ToastContainer> */}
//       {/* <p className="m-8 mb-4 text-lg text-dark h md:block lg:block" >My Profile</p> */}
//       {/* <div className="rounded w-[200px] h-[200px] bg-gray-100 text-gray-400 m-8 lg:mx-8 md:mx-8 lg:my-0 md:my-0 z-100 flex justify-center items-center">
//         <span className='text-3xl font-extrabold	' >
//           {(() => {
//             const name = fullname?.split(' ')
//             if (name.length) {
//               if (name.length > 1) {
//                 return `${name[0][0]}${name[name.length - 1][0]}`.toUpperCase()
//               }
//               return `${name[0][0]}${name[0][1]}`.toUpperCase()
//             }
//             return 'A'
//           })()}
//         </span>
//         <span className=' relative -top-20 left-10 text-3xl font-extrabold	' >
//          <AiOutlineCamera color={'gray'}/>
//         </span>
//       </div> */}
//       {
//         <div className="mt-28 lg:mt-8">
//           {imagepreview}
//         </div>
//       }
//       <div className="mx-8 my-6">
//         <div className="mb-2">
//           <p className="mb-2 text-sm" >Name</p>
//           <input type="text" value={profile.fullName} name="fullName" placeholder="Full Name" className="w-full border-2 bg-white h-10 rounded p-2 focus:outline-none " onChange={(e) => { onChange(e) }} />
//         </div>
//         <div className="mb-2">
//           <p className="mb-2 text-sm" >Phone Number</p>
//           <input type="text" name="phone" value={profile.phone} placeholder="Phone number" onChange={(e) => { onChange(e) }} className="w-full border-2 bg-white h-10 rounded p-2 focus:outline-none " />

//         </div>
//         <div className="mb-2 text-sm">
//           <p className="mb-2">Email</p>
//           <input type="text" name="emailId" value={profile.emailId} placeholder="Email" onChange={(e) => { onChange(e) }} className="w-full border-2 bg-white h-10 rounded p-2 focus:outline-none" />
//         </div>
//         <div className=" hidden md:flex  justify-end">
//           <div className="flex items-center mr-16 ">
//             {/* <p className="   rounded text-sm text-green-500 " >Dont Save </p> */}
//           </div>
//           <Button className="  p-4 py-2 justify-end text-right btn-color btn-bg bg-[#48887B] rounded text-base my-4  text-white  " onClick={onSubmitHandler} >Update</Button>
//         </div>
//       </div>
//       <div id="cart-total-btn md:hidden"
//         className=" border-[1px] border-[#E7E7E7]   md:border-[0px] mt-0 sm:mt-20 w-full left-0 fixed mt-2 sm:relative bottom-0 p-4 sm:p-0  bg-white sm:bg-transparent"
//         style={{
//           bottom: `${mobNavHeight}px`,
//           zIndex: 1
//         }}
//       >
//         <div className="  h-min flex md:hidden items-center justify-between  ">
//           {/* <p className="   rounded text-lg text-green-500 " >Dont Save </p> */}
//           <Button className="px-4  py-2 justify-end text-right btn-bg btn-color bg-[#48887B] rounded text-base   text-white  " onClick={onSubmitHandler} >Update</Button>
//         </div>
//       </div>
//     </div>
//   )
// }


// const mapDispatchToProps = dispatch => ({
//   updateUserDetails: (payload) => dispatch(updateUserDetails(payload))
// })
// export default connect(null,mapDispatchToProps)(Profile)



import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

export const editProfile = (props) => {
  return (
    <div>editProfile</div>
  )
}

editProfile.propTypes = {
  second: PropTypes.third
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(editProfile)