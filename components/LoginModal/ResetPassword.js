import React from 'react'
import { connect } from 'react-redux'
import { Input } from 'antd'
import { useRouter } from 'next/router'
import { ArrowLeftOutlined } from '@ant-design/icons'

export const ResetPassword = ({handleResetPassword,handleChange,storeSettings}) => {

    const router=useRouter()

  return (
      <form onSubmit={handleResetPassword} className='flex flex-col items-center justify-center w-full lg:p-0 '  >
          <p className="font-montMedium text-lg border-b-2 border-slate-100 mb-2 pb-2 text-white w-full p-4 lg:pl-16 pb-6" style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`}} >Set Password</p>
          <div className='flex flex-col '> <p className='font-montMedium text-sm text-slate-500 mt-3' >Create Password</p>

          <div style={{ border: '1px solid grey', padding: '5px', borderRadius: '3px', marginTop: '-5px', }} className='lg:w-96 w-80'>
              {/* <input type="text" placeholder="Enter Password" className="login-input outline-none"  /> */}
              <Input.Password placeholder="Enter Password" name="password" onChange={handleChange} minLength={8} maxLength={16} required autoComplete="off" bordered={false} />
          </div>
          </div>

          <div className='flex flex-col '> <p className='font-montMedium text-sm text-slate-500 mt-3' >Confirm Password</p>

          <div style={{ border: '1px solid grey', padding: '5px', borderRadius: '3px', marginTop: '-5px', }} className='lg:w-96 w-80'>
              {/* <input type="text" placeholder="Enter Password" className="login-input outline-none"  /> */}
              <Input.Password placeholder="Enter Confirm Password" name="confirm_password"  onChange={handleChange} required autoComplete="off" bordered={false} />
          </div>
          </div>

          <button className={` border lg:w-96 w-80 login-button mt-6 mb-8 font-montMedium`} style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, color: 'white', padding: '8px', borderRadius: '5px' }}  >
           Log in
          </button>


          <p className="lg:hidden mt-8  font-montSemiBold text-lg border-b-2 border-slate-100 mb-2 pb-2  flex items-center" onClick={()=>{router.push('/account/user')}}><ArrowLeftOutlined className='mr-6'/>back to login</p>
   </form>
  )
}

const mapStateToProps = (state) => {
    return {
        storeSettings: state.storeSettingsReducer
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)