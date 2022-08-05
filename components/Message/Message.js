import { Modal } from 'antd'
import React from 'react'
import { connect } from 'react-redux'

export const Message = ({error,success,message},visible) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    
    <Modal visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
    <p className='text-xl text-center font-montMedium p-4' style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`,color:'white'}}></p>
   {error? <p className='text-base text-center' >{message}</p>:<p className='text-base text-center' >Successfully Logged In</p>}
    <div className='flex justify-center gap-3 p-4'>
        <button onClick={() => setIsModalVisible(false)} className='w-4/12 border py-2 rounded' style={{ borderColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, color: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }}>Cancel</button>
           </div>

</Modal>

  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Message)