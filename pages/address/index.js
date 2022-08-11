import { ArrowLeftOutlined, DeleteFilled, EditFilled, LoadingOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { message, Modal, Popconfirm, Radio, Spin, Space } from 'antd'
import { data } from 'autoprefixer'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import { addAddress, editAddressAPI, getAddressList, removeAddress } from '../../services/apiServices'
import { addAddressAction, defaultAddress, editAddressAction, fetchPurchaseDetails, getAddressAction, getStoreDisplaySettings, setDeliveryAction, setParcelAction } from '../../actions'
import Billing from '../../components/Billing'
import Coupon from '../../components/Coupon'
import Head from 'next/head';
import ReviewTracker from '../../components/ReviewTracker'
import { toast, ToastContainer } from 'react-toastify'

export const Index = ({ storeSettings, customerDetails, defaultAddressAction, defaultAddressState, addAddressAction, editAddressAction, checkout, getAddressAction, stateAddress, storeDetails, fetchPurchaseDetails, storeDisplaySettings, setParcelAction, setDeliveryAction ,dispatchStoreDisplaySettings}) => {


    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 992px)' })
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [showAddressMobile, setShowAddressMobile] = useState(false)

    const [bool, setBool] = useState(false)
    const [edit, setEdit] = useState()
    const [addressId, setAddressId] = useState()
    const [valueAddress, setValueAddress] = useState(defaultAddressState ? defaultAddressState?.defaultAddress?.address_id : '')

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [validCoupon, setValidCoupon] = useState(false)
    const [addNewAddress, setAddNewAddress] = useState(false)
    const [deliveryMethod, setDeliveryMethod] = useState()

    const [rgbaBackground, setRgbaBackground] = useState('')
    const [rgbaColor, setRgbaColor] = useState()

    useEffect(() => {
        getData()

    }, [bool])


    useEffect(() => {

        setRgbaBackground(hex2rgba(storeSettings.data ? storeSettings.data.primary_color : '#ffffff', 0.1))
        setRgbaColor(hex2rgba(storeSettings.data ? storeSettings.data.navbar_color : '#000000', 0.02))
    }, [rgbaBackground == ''])

    useEffect(() => {
        if (loading) {

            edit && Object.entries(edit).forEach(
                ([name, value]) => setValue(name, ''));
            setEdit()

            reset()
        }
        dispatchStoreDisplaySettings(storeDetails?.store_id)

    }, [loading, bool])


    const getData = async () => {

        getAddressAction(customerDetails?.data?.customer_id)


    }

    useEffect(() => {
        if (checkout.backendCart?.purchase_id) {

            fetchPurchaseDetails(checkout.backendCart?.purchase_id, setLoading)
        }

    }, [validCoupon])



    const { register, setValue, handleSubmit, reset, formState: { errors } } =
        useForm({
            defaultValues: {
                full_name: "",
                phone: "",
                address_line_1: "",
                address_line_2: "",
                city: "",
                address_fields: {},
                address_tag: "HOME",
                country: "India",
                is_default: "",
                latitude: null,
                longitude: null,
                state: "",
                zip_code: ""
            }
        })



    const editAddress = (item) => {

        setEdit(item)
        setAddressId(item.address_id)
        isTabletOrMobile && setShowAddressMobile(!showAddressMobile)
        Object.entries(item).forEach(
            ([name, value]) => setValue(name, value));
        // setIsModalVisible(true);

    }

    const onSubmit = async (address) => {
        let response
        setLoading(true);
        const payload = {
            customerId: customerDetails.data.customer_id, addressId
            , address, setLoading, bool, setBool, message, edit, toast
        }
        if (!edit) {
            addAddressAction({ payload })
            !isTabletOrMobile && setAddNewAddress(!addNewAddress)

        }
        else {
            // response = await editAddressAPI(customerDetails.data.customer_id, addressId, address)
            editAddressAction({ payload })
            setAddNewAddress(!addNewAddress)
        }
        setValueAddress()
        defaultAddressAction()
        setShowAddressMobile(false)



    }

    const handleDisplayMobileAddress = () => {
        if (edit) {
            Object.entries(edit).forEach(
                ([name, value]) => setValue(name, ''));
            setEdit()
        }
        setShowAddressMobile(!showAddressMobile)
    }

    const handleEditMobileAddress = () => {
        setShowAddressMobile(!showAddressMobile)
        setAddNewAddress(!addNewAddress)
    }

    const deleteAddress = async (addressId) => {
        const response = await removeAddress(customerDetails.data.customer_id, addressId)
        if (response) {
            // message.success('Address Deleted Successfully');
            toast.success('Address Deleted Successfully', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setBool(!bool)
            // addressData(customerDetails.data.customer_id)
        }

    }



    const handleAddressChange = (item) => {

        setValueAddress(item.address_id)
        defaultAddressAction(item)
    }

    const handleDeliveryMethod = (e) => {
        
        if (e.target.value == 'PARCEL') {
            if (storeDisplaySettings?.data?.is_parcel_available == 'Y') {

            setParcelAction(checkout.backendCart?.purchase_id)
            defaultAddressAction(storeDisplaySettings?.data?.pickupPointDetails)
            setDeliveryMethod(e.target.value)

        }
    }
        else {
            if (storeDisplaySettings?.data?.is_delivery_available == 'Y') {
            setDeliveryAction(checkout.backendCart?.purchase_id)
            setDeliveryMethod(e.target.value)
            }
        }


    }


    const hex2rgba = (hex, alpha = 1) => {
        const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
        return `rgba(${r},${g},${b},${alpha})`;
    };


    return (
        <div className='mt-20 lg:mt-24 lg:flex lg:flex-col  md:-mt-4  bg-[#F6F6F6]  lg:pl-16 md:pl-32 lg:p-8 md:p-8'>
            {/* <div className='hidden lg:block'>
                <ReviewTracker storeSettings={storeSettings} addPaymentMethod={false} reviewOrder={false} orderPlaced={false} />
            </div> */}

            <div className='lg:hidden absolute fixed -mt-20 z-[300000]'>
                <ReviewTracker storeSettings={storeSettings} deliveryMethod={deliveryMethod == 'PARCEL' || deliveryMethod == 'DELIVERY' ? true : false} addPaymentMethod={false} reviewOrder={false} orderPlaced={false} />
            </div>

            <div className='  lg:flex   md:-mt-4  bg-[#F6F6F6] md:p-8'>

                <div className='lg:w-[55vw]   lg:mr-24 md:mr-24'>
                    <div className='flex flex-col lg:[50vw] w-full lg:mr-24 md:mr-24 '>
                        {!showAddressMobile && isTabletOrMobile ?
                            <div className='bg-white pl-4 lg:pl-8 lg:p-3 md:pl-8 md:p-3 flex text-left lg:ml-5 md:ml-5 w-full border-b-2 lg:border-b-4 border-slate-[200] '>
                                <div className='cursor-pointer' onClick={() => { router.push('/cart') }}>
                                    {/* /account/user` */}
                                    <ArrowLeftOutlined className='text-black text-lg mr-4 mt-4 ' />
                                </div>
                                {/* onClick={() => !addNewAddress ? setAddNewAddress(!addNewAddress) : setAddNewAddress(!addNewAddress)} */}
                                <p className='hidden lg:block text-black font-montRegular mt-3 text-lg' >{!addNewAddress ? 'Saved Places' : 'Add New Address'}</p>

                                <p className='block lg:hidden text-black font-montSemiBold mt-3 text-lg' >{!addNewAddress ? 'Delivery Method' : 'Add New Address'}</p>


                            </div>

                            : ''}

                        {
                            deliveryMethod == 'DELIVERY' ?
                                !showAddressMobile ?

                                    <div className=' md:hidden bg-white p-3 flex items-baseline justify-center  w-full border-b-4 border-slate-[200]' onClick={handleDisplayMobileAddress} >
                                        <PlusCircleOutlined className='text-black text-lg mr-4 mt-3' style={{ color: `${storeSettings.data ? storeSettings.data.primary_color : "black"}` }} />
                                        <p className='text-black font-montSemiBold  mt-3' style={{ color: `${storeSettings.data ? storeSettings.data.primary_color : "black"}` }}>Add New Address</p>
                                    </div>
                                    :
                                    <div className=' bg-white p-3 flex items-baseline  w-full border-b-4 border-slate-[200]' onClick={edit ? handleEditMobileAddress : handleDisplayMobileAddress} >
                                        <ArrowLeftOutlined className='text-black text-lg mr-4' />
                                        <p className='text-black font-montSemiBold'>{edit ? `Edit Address` : `Add New Address`}</p>
                                    </div>
                                : ''
                        }

                        {!addNewAddress ?
                            <>
                                {!isTabletOrMobile && <div className='bg-white pl-4 lg:pl-8 lg:p-3 md:pl-8 md:p-3 flex text-left lg:ml-5 md:ml-5 w-full'>
                                    <div className='cursor-pointer' onClick={() => { `${!addNewAddress ? setAddNewAddress(!addNewAddress) : ""}` }}>
                                        {/* /account/user` */}
                                        {addNewAddress && <ArrowLeftOutlined className='text-black text-lg mr-4 mt-4 ' />}
                                    </div>
                                    <p className='text-black font-montBold mt-3 text-lg'  >{!addNewAddress ? 'Delivery Method' : 'Add New Address'}</p>
                                </div>}

                                <div className='bg-white hidden   lg:flex items-center px-8 ml-5 w-full'>
                                    <Radio.Group onChange={handleDeliveryMethod} value={deliveryMethod}>
                                        <div className="leading gap-0 ">
                                            <Radio value='PARCEL' className='font-montSemiBold' style={{ color: storeDisplaySettings?.data?.is_parcel_available != 'Y' ? 'black' : 'black', fontSize: '16px', border: '2px solid #F9F9F9', width: '50vw', padding: '10px', paddingTop: '20px', paddingBottom: '20px' }}>Pick Up 
                                            {
                                                storeDisplaySettings?.data?.is_delivery_available != 'Y' && storeDisplaySettings?.data?.is_parcel_available != 'Y' ? "" :
                                                    storeDisplaySettings?.data?.is_parcel_available != 'Y' ? <span className='text-red-500 px-2'>Unavailable</span> : ''}
                                                        {
                                                storeDisplaySettings?.data?.is_delivery_available != 'Y' && storeDisplaySettings?.data?.is_parcel_available != 'Y' ? <span className='text-red-500 px-2'>Unavailable</span> :""
                                    }
                                                    </Radio>
                                            <Radio value='DELIVERY' style={{ color: storeDisplaySettings?.data?.is_delivery_available != 'Y' ? 'black' : 'black', fontSize: '16px', border: '2px solid #F9F9F9', width: '50vw', padding: '10px', paddingTop: '20px', paddingBottom: '20px' }} className={`font-montSemiBold inline text-[16px]`}>Delivery 
                                            {
                                                storeDisplaySettings?.data?.is_delivery_available != 'Y' && storeDisplaySettings?.data?.is_parcel_available != 'Y' ? "" :

                                                    storeDisplaySettings?.data?.is_delivery_available != 'Y' ? <span className='text-red-500 text-[16px] px-3'>Not Accepting Delivery</span> : ''}
                                                        {
                                                storeDisplaySettings?.data?.is_delivery_available != 'Y' && storeDisplaySettings?.data?.is_parcel_available != 'Y' ? <span className='text-red-500 px-2'>Unavailable</span> :""
                                    }
                                                    </Radio>

                                        </div>
                                        
                                    </Radio.Group>
                                
                                </div>


                                {!showAddressMobile ?
                                    <div className='bg-white lg:hidden  flex items-center pt-4 px-8  w-full'>
                                        <Radio.Group onChange={handleDeliveryMethod} value={deliveryMethod}>
                                            <div className="leading gap-0 w-full flex items-center flex-col ">
                                                <Radio value='PARCEL' className='font-montSemiBold' style={{ color: storeDisplaySettings?.data?.is_parcel_available != 'Y' ? 'black' : 'black', fontSize: '16px', border: '2px solid #F9F9F9', padding: '10px', paddingTop: '20px', paddingBottom: '20px', width: "90vw", marginLeft: '-13px' }}>Dine-in 
                                                {
                                                    storeDisplaySettings?.data?.is_delivery_available != 'Y' && storeDisplaySettings?.data?.is_parcel_available != 'Y' ? "" :
                                                        storeDisplaySettings?.data?.is_parcel_available != 'Y' ? <span className='text-red-500 px-2'>Not Accepting Pick Up</span> : ''}
                                                        </Radio>
                                                <Radio value='DELIVERY' style={{ color: storeDisplaySettings?.data?.is_delivery_available != 'Y' ? 'black' : 'black', fontSize: '16px', border: '2px solid #F9F9F9', padding: '10px', paddingTop: '20px', paddingBottom: '20px', width: "90vw", marginLeft: '-13px' }} className={`font-montSemiBold inline text-[16px]`}>Delivery 
                                                {
                                                    storeDisplaySettings?.data?.is_delivery_available != 'Y' && storeDisplaySettings?.data?.is_parcel_available != 'Y' ? "" :

                                                        storeDisplaySettings?.data?.is_delivery_available != 'Y' ? <span className='text-red-500 text-[16px] px-3'>Not Accepting Delivery</span> : ''}
                                                        </Radio>

                                            </div>
                                        </Radio.Group>
                                    </div> : ''}


                                {deliveryMethod == 'DELIVERY' ?
                                    <>
                                        <p className='lg:block hidden text-black font-montBold  text-lg bg-white mx-5 w-full py-7 px-8'  >Select Delivery Address</p>


                                        {stateAddress?.length != 0 ? <p className='lg:hidden text-black font-montSemiBold py-2  text-[16px] bg-white w-full  px-3'  >Select Address</p>
                                            :
                                            <p className='lg:hidden text-black font-montMedium py-2 lg:mt-0  text-[16px] bg-white w-full   pt-8 px-6'  >No Address Added Yet</p>
                                                }

                                        <div className='flex flex-col lg:flex-row md:flex-row lg:pl-8 lg:p-3 md:lg-8 md:p-3  items-center flex-wrap  justify-between lg:-mt-5 -mt-5 lg:ml-5 md:ml-5 w-full bg-white  cursor-pointer  lg:pb-3'>
                                            {
                                                stateAddress ?
                                                    !showAddressMobile ?
                                                        <div className='lg:flex flex-wrap lg:justify-start lg:w-full lg:mb-0 mb-48'>

                                                            {stateAddress?.map(item =>
                                                                <div className='lg:flex flex-col items-start px-2 lg:py-2' key={item.address_tag}>
                                                                    <div className='flex w-[90vw] lg:w-[24vw] md:w-[vw] lg:justify-start md:justify-start lg:border-2 rounded lg:border-dashed lg:border-slate-400 md:border-none border-b-2 border-slate-200 p-2' key={item.address_id}>
                                                                        <Radio.Group onChange={() => { handleAddressChange(item) }} value={valueAddress} >
                                                                            <Radio className='font-montSemiBold' value={item.address_id}></Radio>
                                                                        </Radio.Group>
                                                                        <div className='flex flex-col'>
                                                                            <div className='flex items-start'>
                                                                                <p className='text-lg'>{item.address_tag}</p>
                                                                                <EditFilled style={{ color: `${storeSettings.data ? storeSettings.data.primary_color : "black"}`, paddingLeft: '2px', paddingTop: '2px' }} />
                                                                                <button className="bg-white  pr-2 font-montMedium float-right text-sm" style={{ color: `${storeSettings.data ? storeSettings.data.primary_color : "black"}`, }} onClick={() => {
                                                                                    setAddNewAddress(!addNewAddress)
                                                                                    editAddress(item)
                                                                                }} >Edit</button>

                                                                            </div>
                                                                            <p className='text-sm'>{item.full_name}</p>
                                                                            <p className='text-sm item-city'>{item.city},{item.address_line_1},{item.address_line_2}, {item.zip_code}</p>
                                                                            <p className='text-sm'>+91 {item.phone}</p>
                                                                            <div className='flex'>


                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/* 
                                                                    <Popconfirm
                                                                        placement="topRight"
                                                                        title="Are you Sure, You Want to Delete this Address?"
                                                                        onConfirm={() => deleteAddress(item.address_id)}
                                                                        okText="Yes"
                                                                        cancelText="No"
                                                                    >
                                                                        <div className='flex items-center'>
                                                                            <DeleteFilled style={{ color: `${storeSettings.data ? storeSettings.data.primary_color : "black"}` }} />
                                                                            <button className="bg-white lg:py-6 pl-2 pr-2 font-montMedium float-right text-sm" style={{ color: `${storeSettings.data ? storeSettings.data.primary_color : "black"}` }}>Remove</button>
                                                                        </div>
                                                                    </Popconfirm> */}





                                                                </div>
                                                            )}
                                                            <button className='hidden  md:block mt-6 mb-12 w-full lg:flex lg:items-start lg:ml-5 md:ml-5 cursor-pointer  py-4 font-montSemiBold' onClick={() => { setAddNewAddress(!addNewAddress) }} style={{ color: `${storeSettings.data ? storeSettings.data.primary_color : "black"}` }}><span><PlusCircleOutlined style={{ color: `${storeSettings.data ? storeSettings.data.primary_color : "black"}`, marginTop: '-5px', fontSize: '27px', paddingRight: '6px' }} /></span> Add new Address </button>

                                                        </div> : '' :
                                                    <div className='h-72 flex justify-center w-full items-center'>
                                                        <Spin />
                                                    </div>}
                                        </div>

                                        {/* 
                                        <button className='hidden lg:block md:block mt-6 mb-12 w-full lg:ml-5 md:ml-5 cursor-pointer  py-4 font-montSemiBold' onClick={() => { setAddNewAddress(!addNewAddress) }} style={{ border: `2px solid ${storeSettings.data ? storeSettings.data.primary_color : "black"}`, borderStyle: 'dashed', width: '220px' }}>Add new Address <span><PlusOutlined style={{ color: `${storeSettings.data ? storeSettings.data.primary_color : "black"}`, marginTop: '-5px', fontSize: '20px', paddingLeft: '6px' }} /></span></button> */}
                                    </> :

                                    <>
                                        <div className='hidden bg-white lg:flex w-full px-24 py-12 mx-5'>
                                            <img src="/chef.png" className='h-60 w-48 ' />
                                            <p className='text-2xl font-montBold w-[500px] ml-36 mr-24 mt-12 z-[100]' style={{ color: ` ${storeSettings.data ? storeSettings.data.primary_color : "black"}` }}>Get Hot and Fresh meals served on your table.</p>
                                            <div className='absolute rounded-full h-44 w-44' style={{ backgroundColor: ` ${storeSettings.data ? rgbaBackground : "black"}`, marginLeft: '275px' }}></div>


                                            <div className='absolute rounded-full h-20 w-20' style={{ backgroundColor: ` ${storeSettings.data ? rgbaBackground : "black"}`, marginLeft: '495px' }}></div>


                                            <div className='absolute rounded-full h-10 w-10' style={{ backgroundColor: ` ${storeSettings.data ? rgbaBackground : "black"}`, marginLeft: '495px', marginTop: '100px' }}></div>
                                        </div>


                                        <div className='lg:hidden bg-white flex w-full px- py-12 mx-5 -ml-1'>
                                            <img src="/chef.png" className='h-40 mx-12 ' />
                                            <p className='text-lg font-montBold w-[300px] -ml-8  z-[100]' style={{ color: ` ${storeSettings.data ? storeSettings.data.primary_color : "black"}` }}>Get Hot and Fresh meals served on your table.</p>
                                            <div className='absolute rounded-full h-60 w-30' style={{ backgroundColor: ` ${storeSettings.data ? rgbaBackground : "black"}`, marginLeft: '120px' }}></div>


                                            <div className='absolute rounded-full h-20 w-20' style={{ backgroundColor: ` ${storeSettings.data ? rgbaBackground : "black"}`, marginLeft: '180px' }}></div>


                                            <div className='absolute rounded-full h-10 w-10' style={{ backgroundColor: ` ${storeSettings.data ? rgbaBackground : "black"}`, marginLeft: '250px', marginTop: '100px' }}></div>
                                        </div>


                                    </>

                                } </>
                            :

                            // /* Add Address Web View */
                            <>
                                {!isTabletOrMobile &&
                                    <div className='bg-white pl-4 lg:pl-8 lg:p-3 md:pl-8 md:p-3 flex text-left lg:ml-5 md:ml-5 w-full ' >
                                        <div className='cursor-pointer' onClick={() => {
                                            setAddNewAddress(!addNewAddress)
                                            if (edit) {
                                                Object.entries(edit).forEach(
                                                    ([name, value]) => setValue(name, ''));
                                                setEdit()
                                            }
                                        }}>
                                            {/* /account/user` */}
                                            {addNewAddress && <ArrowLeftOutlined className='text-black text-lg mr-4 mt-4 ' />}
                                        </div>
                                        <p className='text-black font-montBold mt-3 text-lg' >{`${edit ? `Edit Address` : `Add a New Address`}`}</p>
                                    </div>}

                                <div className=" hidden lg:block md:block bg-white w-full lg:ml-5 md:ml-5 lg:pl-8 lg:p-3 md:lg-8 md:p-3 ">


                                    {/* form */}
                                    <div className='px-6'>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            {/* input fields */}
                                            <div className='space-y-2 my-2'>
                                                <label htmlFor="" className='block'>Country*</label>
                                                <select className={`w-full lg:w-6/12 border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.country ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} {...register("country", { required: true })} >
                                                    <option value="India">India</option>
                                                </select>
                                            </div>
                                            <div className='space-y-2 my-2'>
                                                <label htmlFor="" className='block'>Name*</label>
                                                <input className={`w-full lg:w-6/12 border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.full_name ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} type="text" placeholder="Enter Your Full Name" {...register("full_name", { required: true })} />
                                            </div>
                                            <div className='space-y-2 my-2'>
                                                <label htmlFor="" className='block'>Mobile Number* <span className='text-xs'>(Commonly Used to Assist Delivery)</span></label>
                                                <input className={`w-full lg:w-6/12 border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.phone ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} type="text" placeholder="Enter Your 10 Digit Mobile Number" {...register("phone", {
                                                    required: true, pattern: {
                                                        value: /[1-9]{1}[0-9]{9}/,
                                                        message: 'Please enter a valid Phone number',
                                                    }
                                                })} />
                                                {errors ? <p className='text-red-500'>{errors?.phone?.message}</p> : ""}
                                            </div>
                                            <div className='space-y-2 my-2'>
                                                <label htmlFor="" className='block'>Flat No. , House No. / House Name, Road No.*</label>
                                                <input className={`w-full lg:w-6/12 border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.address_line_1 ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} type="text" placeholder="Address" {...register("address_line_1", { required: true })} />
                                            </div>
                                            <div className='lg:grid lg:grid-cols-2 lg:space-x-6'>
                                                <div className='space-y-2 my-2'>
                                                    <label htmlFor="" className='block'>Colony, Area, Street, Village*</label>
                                                    <input className={`w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.address_line_2 ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} type="text" placeholder="More Address Details" {...register("address_line_2", { required: true })} />
                                                </div>
                                                <div className='space-y-2 my-2'>
                                                    <label htmlFor="" className='block'>Land Mark <span className='text-xs'>(optional)</span></label>
                                                    <input className='w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' type="text" placeholder="e.g - Near 9 to 9 Super Market" {...register("land_mark", { required: false })} />
                                                </div>
                                            </div>
                                            <div className='lg:grid lg:grid-cols-4 lg:space-x-6'>
                                                <div className='col-span-2'>
                                                    <div className='space-y-2 my-2'>
                                                        <label htmlFor="" className='block'>State*</label>
                                                        <input className={`w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.state ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} type="text" placeholder="Select Your State" {...register("state", { required: true })} />
                                                    </div>
                                                </div>
                                                <div className='space-y-2 my-2 col-span-1'>
                                                    <label htmlFor="" className='block'>District*</label>
                                                    <input className={`w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.city ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} type="text" placeholder="Select Your District" {...register("city", { required: true })} />
                                                </div>

                                                <div className='space-y-2 my-2 col-span-1'>
                                                    <label htmlFor="" className='block'>Pin*</label>
                                                    <input className={`w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.zip_code ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} type="text" placeholder="Enter Your Area Pin" {...register("zip_code", {
                                                        required: true, pattern: {
                                                            value: /^[0-9]+$/,
                                                            message: 'Please enter numbers only',
                                                        }
                                                    })} />
                                                    {errors ? <p className='text-red-500 '>{errors?.zip_code?.message}</p> : ""}
                                                </div>
                                            </div>

                                            <div className='space-y-2 my-2'>
                                                {/* <p className='m-0 p-0'>Address Type</p> */}
                                                {/* <div className='flex gap-3'> */}
                                                <div className='flex gap-1 items-center'>

                                                    <input {...register("address_tag", { required: true })} name='address_tag' defaultChecked={true} type="radio" value="Home" />
                                                    <label htmlFor="">Home Address <span className='text-xs'>(product will be delivered between 7 am to 9 pm)</span></label>
                                                </div>
                                                <div className='flex gap-1 items-center'>

                                                    <input {...register("address_tag", { required: true })} name='address_tag' defaultChecked={true} type="radio" value="Work" />
                                                    <label htmlFor="">Office / Work Address <span className='text-xs'>(product will be delivered between 10 am to 6 pm)</span></label>
                                                </div>
                                                {/* </div> */}
                                            </div>
                                            {/* buttons */}
                                            {/* <div className="flex justify-between mt-3"> */}
                                            {/* <Button loading={loading}> */}
                                            {!loading && <input className='border  py-3 px-11 mt-3 text-base  cursor-pointer' style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.primary_color : 'black'}`, color: `white` }} type="submit" value={`${!edit ? 'SAVE ADDRESS' : 'EDIT ADDRESS'}`} />}
                                            {loading && <span className='ml-3'><LoadingOutlined style={{ fontSize: 24 }} spin /></span>}
                                            {/* </Button> */}
                                            {/* <button className='p-3 bg-red-500 w-5/12 rounded' onClick={() => setIsModalVisible(false)}>Cancel</button> */}
                                            {/* </div> */}
                                        </form>
                                    </div>

                                </div>
                            </>

                        }

                        {/* Add Address Mobile View */}
                        {showAddressMobile ?
                            <div className="lg:hidden md:hidden bg-white w-full lg:ml-5 md:ml-5 lg:pl-8 lg:p-3 md:lg-8 md:p-3 mb-20">
                                <h2 className='p-6 font-montBold text-xl'>{`${edit ? `Edit Address` : `Add a New Address`}`}</h2>
                                <hr />
                                {/* form */}
                                <div className='p-6'>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {/* input fields */}
                                        <div className='space-y-2 my-2'>
                                            <label htmlFor="" className='block'>Country*</label>
                                            <select className={`w-full lg:w-6/12 border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.country ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} {...register("country", { required: true })} >
                                                <option value="India">India</option>
                                            </select>
                                        </div>
                                        <div className='space-y-2 my-2'>
                                            <label htmlFor="" className='block'>Name*</label>
                                            <input className={`w-full lg:w-6/12 border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.full_name ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} type="text" placeholder="Enter Your Full Name" {...register("full_name", { required: true })} />
                                        </div>
                                        <div className='space-y-2 my-2'>
                                            <label htmlFor="" className='block'>Mobile Number* <span className='text-xs'>(Commonly Used to Assist Delivery)</span></label>
                                            <input className={`w-full lg:w-6/12 border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.phone ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} type="text" placeholder="Enter Your 10 Digit Mobile Number" {...register("phone", {
                                                required: true, pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: 'Please enter a valid Phone number',
                                                }
                                            })} />
                                            {errors ? <p className='text-red-500'>{errors?.phone?.message}</p> : ""}
                                        </div>
                                        <div className='space-y-2 my-2'>
                                            <label htmlFor="" className='block'>Flat No. , House No. / House Name, Road No.*</label>
                                            <input className={`w-full lg:w-6/12 border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.address_line_1 ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} type="text" placeholder="Address" {...register("address_line_1", { required: true })} />
                                        </div>
                                        <div className='lg:grid lg:grid-cols-2 lg:space-x-6'>
                                            <div className='space-y-2 my-2'>
                                                <label htmlFor="" className='block'>Colony, Area, Street, Village*</label>
                                                <input className={`w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.address_line_2 ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} type="text" placeholder="More Address Details" {...register("address_line_2", { required: true })} />
                                            </div>
                                            <div className='space-y-2 my-2'>
                                                <label htmlFor="" className='block'>Land Mark <span className='text-xs'>(optional)</span></label>
                                                <input className='w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' type="text" placeholder="e.g - Near 9 to 9 Super Market" {...register("land_mark", { required: false })} />
                                            </div>
                                        </div>
                                        <div className='lg:grid lg:grid-cols-4 lg:space-x-6'>
                                            <div className='col-span-2'>
                                                <div className='space-y-2 my-2'>
                                                    <label htmlFor="" className='block'>State*</label>
                                                    <input className={`w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.state ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} type="text" placeholder="Select Your State" {...register("state", { required: true })} />
                                                </div>
                                            </div>
                                            <div className='space-y-2 my-2 col-span-1'>
                                                <label htmlFor="" className='block'>District*</label>
                                                <input className={`w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.city ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} type="text" placeholder="Select Your District" {...register("city", { required: true })} />
                                            </div>

                                            <div className='space-y-2 my-2 col-span-1'>
                                                <label htmlFor="" className='block'>Pin*</label>
                                                <input className={`w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 ${errors.zip_code ? 'focus:ring-red-600 focus:border-red-600' : 'focus:ring-sky-500 focus:border-sky-500'}`} type="text" placeholder="Enter Your Area Pin" {...register("zip_code", {
                                                    required: true, pattern: {
                                                        value: /^[0-9]+$/,
                                                        message: 'Please enter numbers only',
                                                    }
                                                })} />
                                                {errors ? <p className='text-red-500 '>{errors?.zip_code?.message}</p> : ""}
                                            </div>
                                        </div>

                                        <div className='space-y-2 my-2'>
                                            {/* <p className='m-0 p-0'>Address Type</p> */}
                                            {/* <div className='flex gap-3'> */}
                                            <div className='flex gap-1 items-center'>

                                                <input {...register("address_tag", { required: true })} name='address_tag' defaultChecked={true} type="radio" value="Home" />
                                                <label htmlFor="">Home Address <span className='text-xs'>(product will be delivered between 7 am to 9 pm)</span></label>
                                            </div>
                                            <div className='flex gap-1 items-center'>

                                                <input {...register("address_tag", { required: true })} name='address_tag' type="radio" value="Work" />
                                                <label htmlFor="">Office / Work Address <span className='text-xs'>(product will be delivered between 10 am to 6 pm)</span></label>
                                            </div>
                                            {/* </div> */}
                                        </div>
                                        {/* buttons */}
                                        {/* <div className="flex justify-between mt-3"> */}
                                        {/* <Button loading={loading}> */}
                                        <input className='border  py-3 px-11 mt-3 text-base  cursor-pointer' style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.primary_color : 'black'}`, color: `white` }} type="submit" value={`${!edit ? 'SAVE ADDRESS' : 'EDIT ADDRESS'}`} />
                                        {loading && <span className='ml-3'><LoadingOutlined style={{ fontSize: 24 }} spin /></span>}
                                        {/* </Button> */}
                                        {/* <button className='p-3 bg-red-500 w-5/12 rounded' onClick={() => setIsModalVisible(false)}>Cancel</button> */}
                                        {/* </div> */}
                                    </form>
                                </div>

                            </div>
                            : ''}
                        <ToastContainer />


                    </div>
                </div>
                <div className='  lg:block md:block mt-0 w-96'>
                    {/* <Coupon storeSettings={storeSettings} validCoupon={validCoupon} billingDetails={checkout.purchaseDetails?.data} setValidCoupon={setValidCoupon} /> */}
                    <Billing className='' billingDetails={checkout.purchaseDetails?.data} checkout={checkout.backendCart?.purchase_id} review={false} shippingAdded={true} deliveryMethod={deliveryMethod} final={false} showAddressMobile={showAddressMobile} />
                </div>


            </div >
        </div>
    )
}

const mapStateToProps = (state) => ({
    storeSettings: state.storeSettingsReducer,
    customerDetails: state.customerDetailsReducer,
    defaultAddressState: state.checkoutReducer,
    checkout: state.checkoutReducer,
    stateAddress: state.addressReducer?.data,
    storeDetails: state.storeDetailsReducer?.data,
    storeDisplaySettings: state.storeDisplaySettingsReducer
})

const mapDispatchToProps = dispatch => {
    return {
        defaultAddressAction: (data) => dispatch(defaultAddress(data)),
        addAddressAction: (data) => dispatch(addAddressAction(data)),
        editAddressAction: (data) => dispatch(editAddressAction(data)),
        getAddressAction: (data) => dispatch(getAddressAction(data)),
        fetchPurchaseDetails: (purchaseid, setLoading) => dispatch(fetchPurchaseDetails(purchaseid, setLoading)),
        setParcelAction: (purchaseId) => dispatch(setParcelAction(purchaseId)),
        setDeliveryAction: (purchaseId) => dispatch(setDeliveryAction(purchaseId)),
        dispatchStoreDisplaySettings: (storeId) => dispatch(getStoreDisplaySettings(storeId)),


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)