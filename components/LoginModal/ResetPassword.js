import React from 'react'
import { connect } from 'react-redux'
import { Input } from 'antd'
import { useRouter } from 'next/router'
import { ArrowLeftOutlined } from '@ant-design/icons'

export const ResetPassword = ({handleResetPassword,handleChange,storeSettings}) => {

    const router=useRouter()

  return (
      <form onSubmit={handleResetPassword} className='flex flex-col items-center justify-center w-full lg:p-0 p-8' >
          <p className="font-montSemiBold text-xl border-b-2 border-slate-100 mb-2 pb-2">Enter New Password</p>
          <div style={{ border: '1px solid grey', padding: '5px', borderRadius: '3px', marginTop: '10px', }} className='lg:w-96 w-80'>
              {/* <input type="text" placeholder="Enter Password" className="login-input outline-none"  /> */}
              <Input.Password placeholder="Enter Password" name="password" onChange={handleChange} minLength={8} maxLength={16} required autoComplete="off" bordered={false} />
          </div>


          <div style={{ border: '1px solid grey', padding: '5px', borderRadius: '3px', marginTop: '10px', }} className='lg:w-96 w-80'>
              {/* <input type="text" placeholder="Enter Password" className="login-input outline-none"  /> */}
              <Input.Password placeholder="Enter Confirm Password" name="confirm_password"  onChange={handleChange} required autoComplete="off" bordered={false} />
          </div>

          <button className={` border lg:w-96 w-80 login-button mt-6`} style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.primary_color : 'black'}`, color: 'white', padding: '8px', borderRadius: '5px' }}  >
           Proceed
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