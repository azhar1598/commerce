import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { useMediaQuery } from 'react-responsive';
import { Avatar, Modal } from 'antd';
import { customerDetails } from '../actions';
import { useRouter } from 'next/router'
import LoginModal from './LoginModal/LoginModal';
import { HeartFilled, ShoppingFilled, UserOutlined, WalletFilled } from '@ant-design/icons';
import Link from 'next/link'
import { ImLocation } from 'react-icons/im';
import { IoMdHelpCircle } from 'react-icons/io';
import { BiLogOut } from 'react-icons/bi';

const MobileLogin = ({ dispatchCustomerDetails, stateCustomerDetails, stateStoreSettings }) => {
    const [visible, setVisible] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 992px)' })
    const router = useRouter()

    useEffect(() => {
        if (!isTabletOrMobile) {
            router.push('/shop')
        }
    }, [isTabletOrMobile])

    const handleOpenLoginModal = () => {
        setVisible(true)
    }

    const handleLogout = () => {
        setIsModalVisible(false)
        dispatchCustomerDetails()
    }
    return (
        <div className='bg-white  min-h-screen'>
            {!stateCustomerDetails.data?.customer_id ?
                <div className='pt-24 flex flex-col items-center justify-center'>
                    <h3 className='font-montBold text-base'>My Account</h3>
                    <p>Login / Create account to manage your orders.!</p>
                    <p onClick={()=>{router.push('/account/user/login')}} className='border w-11/12 text-center text-white font-montRegular text-base p-2 rounded-md' style={{ backgroundColor: "white", color: `${stateStoreSettings.data ? 'white' : 'black'}`, backgroundColor: `${stateStoreSettings.data ? stateStoreSettings.data.secondary_color : 'black'}` }}>Login</p>
                    {visible && <LoginModal visible={visible} setVisible={setVisible} />}
                </div>
                :
                <div>
                    {/* profile head */}
                    <div className='relative mt-16'>
                        <img className='min-h-[120px]' src="https://dsa0i94r8ef09.cloudfront.net/widgets/header-background.jpg" alt="" />
                        <div className='flex flex-col justify-center items-center -mt-11'>
                            {/* <img className='h-20 w-20' src="/static/images/user.png" alt="" /> */}
                            <Avatar style={{ height: '10vh', width: '20vw' }} icon={<UserOutlined />} size="large" />
                            <div className='text-[#212B36] text-lg'>{stateCustomerDetails.data?.full_name}</div>
                            {stateCustomerDetails.data?.phone && <div>+91 - {stateCustomerDetails.data?.phone}</div>}
                            {stateCustomerDetails.data?.email_id && <div>{stateCustomerDetails.data?.email_id}</div>}
                        </div>

                    </div>
                    <div className='max-w-[350px] mx-auto min-h-[1px] px-2 mt-2'></div>
                    {/* profile menu */}

                    <Link href={`/account/myOrders`} >
                        <div className={`flex items-baseline  justify-start p-4 font-montSemiBold cursor-pointer`} style={router.pathname == '/account/myOrders' ? { color: '#212B36', fontSize: '24px' } : { color: '#212B36', fontSize: '24px' }}>
                            <ShoppingFilled />
                            <p className='pl-8 text-sm'>My orders</p>
                        </div>
                    </Link>

                    
                    <Link href={`/account/wishlist`} >
                        <div className={`flex items-baseline  justify-start p-4 font-montSemiBold cursor-pointer`} style={router.pathname == '/account/wishlist' ? { color: '#212B36', fontSize: '24px' } : { color: '#212B36', fontSize: '24px' }}>
                            <HeartFilled />
                            <p className='pl-8 text-sm'>Wishlist</p>
                        </div>
                    </Link>
                    <Link href={`/account/wallet`}>
                        <div className={`flex items-baseline  justify-start p-4 font-montSemiBold cursor-pointer`} style={router.pathname == '/account/wallet' ? { color: '#212B36', fontSize: '24px' } : { color: '#212B36', fontSize: '24px' }}>
                            <WalletFilled />
                            <p className='pl-8 text-sm'>Wallet</p>
                        </div>
                    </Link>
                    <Link href={`/account/savedPlaces`} >
                        <div className={`flex items-start  justify-start p-4 font-montSemiBold cursor-pointer`} style={router.pathname == '/account/savedPlaces' ? { color: '#212B36', fontSize: '24px' } : { color: '#212B36', fontSize: '24px' }} >
                            <ImLocation />
                            <p className='pl-8 text-sm'>Saved Places</p>
                        </div>
                    </Link>
                    {/* <Link href={`/account/user`} >
                        <div className={`flex items-start  justify-start p-4 font-montSemiBold cursor-pointer`} style={router.pathname == '/' ? { color: '#212B36', fontSize: '24px' } : { color: '#212B36', fontSize: '24px' }} >
                            <IoMdHelpCircle />
                            <p className='pl-8 text-sm'>Help & Support</p>
                        </div>
                    </Link> */}
                    <p onClick={() => setIsModalVisible(true)}>
                        <div className='flex items-start  justify-start p-4 font-montSemiBold cursor-pointer'>
                            <BiLogOut style={{ color: '#212B36', fontSize: '24px' }} />
                            <p className='pl-8 text-sm text-[#212B36]'>Log Out</p>
                        </div>
                    </p>

                </div>

            }
            {/* log out confirmation modal */}
            <>
                <Modal title="Logout" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
                    <p className='text-xl text-center font-montSemiBold'>Log Out?</p>
                    <p className='text-base text-center'>Are you sure? You want to log out !</p>
                    <div className='flex justify-center gap-3'>
                        <button onClick={() => setIsModalVisible(false)} className='w-4/12 border py-2 rounded' style={{ borderColor: `${stateStoreSettings.data ? stateStoreSettings.data.primary_color : 'black'}`, color: `${stateStoreSettings.data ? stateStoreSettings.data.primary_color : 'black'}` }}>Cancel</button>
                        <button onClick={handleLogout} className='w-4/12 py-2 rounded' style={{ backgroundColor: `${stateStoreSettings?.data?.primary_color ? stateStoreSettings?.data.primary_color : 'black'}`, color: `white` }}>Confirm</button>
                    </div>

                </Modal>
            </>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        stateCustomerDetails: state.customerDetailsReducer,
        stateStoreSettings: state.storeSettingsReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchCustomerDetails: () => dispatch(customerDetails()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileLogin);