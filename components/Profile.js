import { HeartFilled, ShoppingFilled, WalletFilled } from '@ant-design/icons'
import { Avatar, message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ImLocation } from 'react-icons/im';
import { IoMdHelpCircle } from 'react-icons/io';
import { BiLogOut } from 'react-icons/bi';
import { customerDetails, getWalletInfoAction } from '../actions'

export const Profile = ({ customerDetails, customerDetailsAction, storeSettings, stateWalletBalance, dispatchWalletInfo, stateStoreDetails, msg }) => {
    const router = useRouter()

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [walletTransactions, setWalletTransactions] = useState([])



    useEffect(() => {
        if (!customerDetails?.data?.customer_id) {
            router.push('/')
        }
        else {
            const payload = {
                customerId: customerDetails?.data?.customer_id
                , storeId: 'storeId',
                setWalletTransactions,
            }
            console.log('stateWalletBalance', stateWalletBalance)
            dispatchWalletInfo({ payload })
        }
    }, [msg])

    const handleLogout = () => {

        customerDetailsAction()

        setIsModalVisible(false)
        message.success('Logged Out Successfully')
        router.push('/')


    }

    return (
        <div className='hidden lg:flex flex-col items-start min-w-[20vw]  bg-white h-[100vh]'>
            <div style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.primary_color : 'black'}`, color: `white`, opacity: '50%' }} className='w-full h-44 min-h-44 max-h-44 min-w-full max-w-full' ></div>
            <div className=' w-full flex flex-col items-center  border-b-2 border-[#F6F6F6]'>
                <Avatar src="https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png" style={{
                    width: '70px', height: '70px', top: '-24px'
                }} />
                <Link href={`/account/profile`} >
                    <p className='font-montSemiBold absolute ml-60 py-2 cursor-pointer' style={{ color: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }} >Edit</p>
                </Link>
                <p className='font-montSemiBold '>Hello, {customerDetails?.data?.full_name ? customerDetails?.data.full_name : 'User'}</p>
                <p className='text-sm text-gray-300'>+{customerDetails?.data?.phone}</p>
                <p className='text-sm text-gray-300'>{customerDetails?.data?.email_id} </p>
            </div>
            <Link href={`/account/myOrders`} >
                <div className={`flex items-start  justify-start p-4 font-montSemiBold cursor-pointer`} style={router.pathname == '/account/myOrders' || router.pathname.includes('/account/orderDetails/') ? { color: '#212B36', fontSize: '24px' } : { color: '#90959A', fontSize: '24px' }}>
                    {/* <ShoppingFilled /> */}
                    <img src="/Icon ionic-ios-paper.svg" width={20} height={40} />
                    <p className='pl-8 text-sm'>My orders</p>
                </div>
            </Link>

            <Link href={`/account/wishlist`} >
                <div className={`flex items-start  justify-start p-4 font-montSemiBold cursor-pointer`} style={router.pathname == '/account/wishlist' || router.pathname.includes('/account/wishlist/') ? { color: '#212B36', fontSize: '24px' } : { color: '#90959A', fontSize: '24px' }}>
                    {/* <HeartFilled /> */}
                    <img src="/Icon metro-heart.svg" width={20} height={40} />
                    <p className='pl-8 text-sm'>Wishlist</p>
                </div>
            </Link>

            <Link href={`/account/wallet`}>
                <div className={`flex items-baseline  justify-start p-4 font-montSemiBold cursor-pointer`} style={router.pathname == '/account/wallet' ? { color: '#212B36', fontSize: '24px' } : { color: '#90959A', fontSize: '24px' }}>
                    <WalletFilled />
                    <p className='pl-8 text-sm'>Wallet</p>
                    <p className='ml-8 py-1 px-1  text-[12px] rounded text-black' style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.primary_color : 'black'}`, color: `white`, opacity: '40%' }} >{stateStoreDetails?.currency_symbol} {stateWalletBalance?.customer_wallet_balance}</p>
                </div>
            </Link>
            <Link href={`/account/savedPlaces`} >
                <div className={`flex items-start  justify-start p-4 font-montSemiBold cursor-pointer`} style={router.pathname == '/account/savedPlaces' ? { color: '#212B36', fontSize: '24px' } : { color: '#90959A', fontSize: '24px' }} >
                    <img src="/Icon awesome-map-marked-alt.svg" width={20} height={40} />
                    <p className='pl-8 text-sm'>Saved Places</p>
                </div>
            </Link>

            <p onClick={() => setIsModalVisible(true)}>
                <div className='flex items-start  justify-start p-4 font-montSemiBold cursor-pointer'  >
                    <BiLogOut style={{ color: '#90959A', fontSize: '24px' }} />
                    <p className='pl-8 text-sm text-[#90959A]'>Log Out</p>
                </div>
            </p>

            <Modal title="Logout" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
                <p className='text-xl text-center font-montSemiBold'>Log Out?</p>
                <p className='text-base text-center'>Are you sure? You want to log out !</p>
                <div className='flex justify-center gap-3'>
                    <button onClick={() => setIsModalVisible(false)} className='w-4/12 border py-2 rounded' style={{ borderColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, color: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }}>Cancel</button>
                    <button onClick={handleLogout} className='w-4/12 py-2 rounded' style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, color: `white` }}>Confirm</button>
                </div>

            </Modal>


        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        customerDetails: state.customerDetailsReducer,
        storeSettings: state.storeSettingsReducer,
        stateWalletBalance: state.walletReducer.data,
        stateStoreDetails: state.storeDetailsReducer?.data
    }
}

const mapDispatchToProps = dispatch => {
    return {

        customerDetailsAction: (data) => dispatch(customerDetails()),
        dispatchWalletInfo: (payload) => dispatch(getWalletInfoAction(payload)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)