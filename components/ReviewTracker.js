import React from 'react'
import { connect } from 'react-redux'
import reviewMobile from '../pages/review-mobile'
import {useRouter} from 'next/router'

export const ReviewTracker = ({ storeSettings, addPaymentMethod, reviewOrder, orderPlaced, paymentAdded, useWallet,deliveryMethod }) => {

const router=useRouter()

    return (
        <div>
            <div className='lg:hidden fixed w-full flex items-center justify-center' style={{ background: storeSettings ? storeSettings.data?.primary_color : 'black', paddingBottom: '10px' }}>
                <div className='flex items-center'>
                    <div className='flex flex-col justify-center items-center '>
                        {deliveryMethod ?
                            <div className='max-w-6 w-6 -mt-3'>
                                <img src="/images/success_tick.svg" alt="" />
                            </div> :
                            <p className='flex items-center  justify-center border-2  border-white rounded-xl w-6 h-[25px]' >
                                <span className=' relative bg-white h-2 w-2 border rounded-full shadow-3xl'></span>
                            </p>
                        }
                        <p className='text-[10px] fontMontRegular absolute mt-14 text-white w-20 text-center '>Add Address</p>
                    </div>
                    <p className='text-white text-2xl mt-3 px-2 '>---------</p>

                </div>

                <div className='flex items-center'>
                    <div className='flex flex-col justify-center items-center '>
                        {!reviewOrder ?
                            <p className='flex items-center  justify-center border-2  border-white rounded-xl w-6 h-[25px]' >
                                <span className=' relative bg-white h-2 w-2 border rounded-full'></span>
                            </p> :
                            <div className='max-w-6 w-6 -mt-3'>
                                <img src="/images/success_tick.svg" alt="" />
                            </div>
                        }
                        <p className='text-[10px] fontMontRegular absolute mt-14 text-white '>Review Order</p>
                    </div>
                    <p className='text-white text-2xl mt-3 px-2 '>---------</p>

                </div>

                <div className='flex items-center'>
                    <div className='flex flex-col justify-center items-center '>
                        {orderPlaced ?
                            <div className='max-w-6 w-6 -mt-3'>
                                <img src="/images/success_tick.svg" alt="" />
                            </div> :
                            <p className='flex items-center  justify-center border-2  border-white rounded-xl w-6 h-[25px]' >
                                <span className=' relative bg-white h-2 w-2 border rounded-full'></span>
                            </p>}
                        <p className='text-[10px] fontMontRegular absolute mt-14 text-white '>Order placed</p>
                    </div>


                </div>



            </div>

            <div className='hidden lg:flex  items-center justify-start bg-white ml-12 mr-16' style={{ paddingBottom: '15px' }}>
                <div className='flex items-center mt-4'>
                    <p className='text-green-300 text-2xl  '>------------------------</p>
                    <div className='flex  justify-center items-center cursor-pointer' onClick={()=>{router.push('/address')}}>
                        {!addPaymentMethod ?
                            <div className='max-w-6 w-8 -mt-3 pl-2'>
                                <img src="/images/success_tick.svg" alt="" />
                            </div> :
                            <p className='flex items-center  justify-center border-2  border-white rounded-xl w-6 h-[25px]' >
                                <span className=' relative bg-white h-2 w-2 border rounded-full'></span>
                            </p>
                        }
                        <p className='text-[14px] font-montMedium   text-black px-2 text-center ' >Delivery Method</p>
                    </div>
                    <p className='text-green-300 text-2xl px-2 '>-----------------------------</p>

                </div>

                <div className='flex items-center mt-4'>
                    <div className='flex  justify-center items-center '>
                        {!paymentAdded ?
                            <p className='flex items-center  justify-center border-2  rounded-xl w-6 h-[25px]' >
                                <span className=' relative bg-[#38B97929] h-6 w-6 flex items-center justify-center text-green-500 font-montSemiBold  rounded-full'>2</span>
                            </p> :
                            <div className='max-w-6 w-6 -mt-3'>
                                <img src="/images/success_tick.svg" alt="" />
                            </div>
                        }
                        <p className='text-[14px] font-montMedium   text-black px-2 text-center '>Payment</p>
                    </div>
                    <p className='text-green-300 text-2xl px-2 '>-----------------------------</p>

                </div>

                <div className='flex items-center mt-4'>
                    <div className='flex justify-center items-center '>
                        {orderPlaced ?
                            <div className='max-w-6 w-6 -mt-3'>
                                <img src="/images/success_tick.svg" alt="" />
                            </div> :
                            <p className='flex items-center  justify-center border-2  rounded-xl w-6 h-[25px]' >
                                <span className=' relative bg-[#38B97929] h-6 w-6 flex items-center justify-center text-[#90959A] font-montSemiBold  rounded-full'>3</span>
                            </p>}
                        <p className='text-[14px] font-montMedium text-black px-2 text-center '>Order Placed</p>
                    </div>



                </div>



            </div>


        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewTracker)