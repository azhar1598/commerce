import { ArrowLeftOutlined, RightOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Profile from '../../../components/Profile'
import Link from 'next/link'
import moment from "moment";
import { getWalletAmount, getWalletTransactions } from '../../../services/apiServices'
import { BsFillArrowUpRightSquareFill, BsArrowDownLeftSquareFill } from 'react-icons/bs'
import { getWalletInfoAction, getWalletTransactionsAction } from '../../../actions'
import { useRouter } from 'next/router'
import Head from 'next/head';
import { Spin } from 'antd'
import PageWrapper from '../../../components/PageWrapper/PageWrapper'
import { useRef } from "react"
import WalletIllustration from '../../../components/svgComponents/WalletIllustration'

export const Index = ({ customerDetails, dispatchWalletInfo, dispatchWalletTransactions, stateWalletBalance, storeDetails,storeSettings }) => {

    const [wallet, setWallet] = useState({})
    const [walletTransactions, setWalletTransactions] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const ref = useRef(null);


    useEffect(() => {
        getWalletInfo()
    }, [])


    useEffect(() => {
        import("@lottiefiles/lottie-player");
    }, []);

    const getWalletInfo = () => {
        setLoading(true)
        const payload = {
            customerId: customerDetails?.data?.customer_id
            , storeId: 'storeId',
            setWalletTransactions,
            setLoading
        }

        dispatchWalletInfo({ payload })
        dispatchWalletTransactions({ payload })

    }


    const handlePush = (orderId) => {
        router.push(`/account/orderDetails/${orderId}`)
    }


    return (
        <div className='mt-20 lg:mt-24 md:-mt-4 bg-[#F6F6F6] flex lg:pl-32 md:pl-32 lg:p-8 md:p-8'>
            {/* <Head>
                <title>{storeDetails ? storeDetails?.store_name : 'Apparel Store'}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href={storeDetails ? storeDetails?.logo_img_url : 'favicon.ico'} />
            </Head> */}
            <Profile />
            <div className='flex flex-col w-full lg:mr-24 md:mr-24'>
                {/* <div className='bg-white pl-4 lg:pl-8 lg:p-3 md:pl-8 md:p-3 flex text-left lg:ml-5 md:ml-5 w-full border-b-4 border-slate-[200]'>
                    <Link href='/account/user'>
                        <div className='lg:hidden md:hidden'>
                            <ArrowLeftOutlined className='text-black text-lg mr-4 mt-3 lg:mt-0' />
                        </div>
                    </Link>
                    <p className='hidden lg:block text-black font-montSemiBold mt-4'>Wallet</p>
                    <p className='lg:hidden text-lg text-black font-montRegular mt-2'>Wallet</p>
                </div> */}

                {loading ?
                    <div className='h-96 flex items-center justify-center'>


                        <lottie-player
                            id="firstLottie"
                            ref={ref}
                            autoplay

                            loop
                            mode="normal"
                            src="/loader.json"
                            style={{ width: "100px", height: "100px" }}
                        ></lottie-player>
                    </div>
                    : <>
                        <div className='flex w-full justify-between bg-white lg:ml-5 border-b-2 border-slate-200'>
                            <div className='pl-4 lg:pl-8 lg:p-3 md:pl-8 md:p-3 text-left w-full '>
                                <p className='hidden text-black font-montBold text-xl pt-3  lg:block'>Wallet Balance</p>
                                <p className='text-black font-montRegular text-[16px] lg:hidden mt-4'>Balance</p>
                                <p className=' hidden font-montSemiBold text-lg text-green-500 lg:mt-0 '>{storeDetails?.currency_symbol} {stateWalletBalance?.customer_wallet_balance}</p>
                                <p className=' font-montBold text-xl text-green-500 -mt-4 lg:mt-0'>{storeDetails?.currency_symbol} {stateWalletBalance?.customer_wallet_balance}</p>
                            </div>
                            <div className=' pt-16'>
                                <WalletIllustration secondaryColor={storeSettings?.secondary_color} navbarColor={storeSettings?.primary_color} mobile={false} />
                            </div>
                        </div>
                        {/* <div className='bg-white pl-4 lg:pl-8 lg:p-3 md:pl-8 md:p-3 text-left lg:ml-5 md:ml-5 w-full border-b-4 border-slate-[200]'>
                    <p className='text-black font-montSemiBold'>Add Money</p>
                    <div className='flex items-center'>
                        <input type="number" placeholder="Enter Amount" className='p-2 border-2 border-slate-400' />
                        <button className='bg-[#212B36] text-white p-2 px-3 ml-3'>Add</button>
                    </div>
                </div> */}
                        <p className='hidden lg:block text-[#212B36] text-lg lg:font-montSemiBold font-montSemiBold lg:pl-8 lg:ml-5 md:ml-5  md:pl-8 bg-white lg:p-4 md:p-4 w-full p-2  '>Wallet Transaction History</p>

                        <p className='lg:hidden md:hidden lg:block text-[#212B36]  lg:font-montSemiBold font-montRegular lg:pl-8 lg:ml-5 md:ml-5  md:pl-8 bg-white lg:p-4 md:p-4 w-full p-2  '>Wallet transaction history</p>

                        {
                            walletTransactions?.length != 0 ?
                                <div className='lg:mb-0 mb-24 lg:-mt-5   -mt-2'>
                                    {walletTransactions.map((item, index) => {

                                        return (
                                            <div className='flex flex-row items-center  justify-between lg:ml-5 md:ml-5 w-full bg-white border-b-2 border-slate-[200] cursor-pointer' onClick={() => { handlePush(item.transaction_ref_id) }} key={index}>

                                                <div>
                                                    <div className='flex p-2 lg:items-center lg:pl-8 lg:p-3 md:items-center md:pl-8 md:p-3 text-left w-full'>
                                                        {item.transaction_type == 'ORDER_REFUND' ?
                                                            //  <img src="/GroupWallet.svg" style={{height:'26px',width:'42px'}}/>

                                                            <BsArrowDownLeftSquareFill className='text-5xl' />
                                                            :
                                                            <BsFillArrowUpRightSquareFill className='text-5xl' />}
                                                        <div className='flex flex-col items-start w-full ml-4 lg:ml-24 md:ml-24'>
                                                            <p className='  font-montSemiBold'>Order Id #{item.transaction_ref_id}</p>
                                                            <p>{moment.unix(item.transaction_time).format("ll")}</p>
                                                            <p className='text-[#212B3680]'></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className=' pr-5 text-lg'>
                                                    {item.transaction_type == 'ORDER_REFUND' ? <span className='text-green-500'>+ {item.transaction_amount}</span> : <span className='text-red-500'>- {item.transaction_amount}</span>}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                :
                                <p className='text-black mt-4 text-xl w-full text-center'>No Transactions </p>


                        }


                    </>
                }


            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        customerDetails: state.customerDetailsReducer,
        stateWalletBalance: state.walletReducer.data,
        storeDetails: state.storeDetailsReducer?.data,
        storeSettings: state.storeSettingsReducer?.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchWalletInfo: (payload) => dispatch(getWalletInfoAction(payload)),
        dispatchWalletTransactions: (payload) => dispatch(getWalletTransactionsAction(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper(Index))