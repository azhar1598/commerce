import { ArrowLeftOutlined, DeleteFilled, DeleteOutlined, EditFilled, LeftOutlined, LoadingOutlined, PlusCircleFilled, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { message, Modal, Popconfirm, Radio, Spin } from 'antd'
import { data } from 'autoprefixer'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import Head from 'next/head';
import { removeAddress } from '../../../services/apiServices'
import { addAddressAction, defaultAddress, editAddressAction, fetchPurchaseDetails, getAddressAction } from '../../../actions'
import ReviewTracker from '../../../components/ReviewTracker'
import Profile from '../../../components/Profile'
import { useRef } from "react"
import { toast, ToastContainer } from 'react-toastify';


export const Index = ({ storeSettings, customerDetails, defaultAddressAction, defaultAddressState, addAddressAction, editAddressAction, checkout, getAddressAction, stateAddress, storeDetails, fetchPurchaseDetails }) => {


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
    const ref = useRef(null);

    useEffect(() => {
        import("@lottiefiles/lottie-player");
    }, []);


    useEffect(() => {
        getData()

    }, [bool])


    useEffect(() => {
        if (loading) {

            edit && Object.entries(edit).forEach(
                ([name, value]) => setValue(name, ''));
            setEdit()

            reset()
        }

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

        console.log('adddress', address)

        setLoading(true);
        const payload = {
            customerId: customerDetails.data.customer_id, addressId
            , address, setLoading, bool, setBool, message, edit,toast
        }
        if (!edit) {
            addAddressAction({ payload })
            !isTabletOrMobile && setAddNewAddress(!addNewAddress)
            // getData()

            
        }
        else {
            // response = await editAddressAPI(customerDetails.data.customer_id, addressId, address)
            editAddressAction({ payload })
            setAddNewAddress(!addNewAddress)
            // getData()
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

    return (
        // <div className='mt-20 lg:mt-24 lg:flex lg:flex-col  md:-mt-4  bg-[#F6F6F6]  lg:pl-16 md:pl-32 lg:p-8 md:p-8'>

        <div className=' lg:mt-24 md:-mt-4 bg-[#F6F6F6] flex lg:pl-32 md:pl-32 lg:p-8 md:p-8'>
            {/* <Head>
                <title>{storeDetails ? storeDetails?.store_name : 'Apparel Store'}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href={storeDetails ? storeDetails?.logo_img_url : 'favicon.ico'} />
            </Head> */}
            <Profile />

            <div className='  lg:flex   md:-mt-4  bg-[#F6F6F6] md:p-8'>

                <div className='lg:w-[55vw]   lg:mr-24 md:mr-24'>
                    <div className='flex flex-col lg:[50vw] w-full lg:mr-24 md:mr-24 '>
                        {!showAddressMobile && isTabletOrMobile ?
                            <div className='bg-white pl-4 mt-16 lg:mt-0 lg:pl-8 lg:p-3 md:pl-8 md:p-3 flex text-left lg:ml-5 md:ml-5 w-full border border-blue-100 shadow '>
                                <div className='cursor-pointer' onClick={() => { router.push('/account/user') }}>
                                    {/* /account/user` */}
                                    <LeftOutlined className='text-black text-lg mr-4 mt-7 ' />
                                </div>
                                {/* onClick={() => !addNewAddress ? setAddNewAddress(!addNewAddress) : setAddNewAddress(!addNewAddress)} */}
                                <p className='text-black font-montSemiBold lg:mt-3  text-lg mt-6' >{!addNewAddress ? 'Saved Places' : 'Add New Address'}</p>
                            </div>

                            : ''}

                        {!showAddressMobile ?
                            <div className='lg:hidden md:hidden bg-white p-3 flex items-baseline justify-center  w-full   z-[400000] bottom-0 fixed border border-blue-100 shadow ' onClick={handleDisplayMobileAddress} >
                                <PlusCircleOutlined className='text-black text-lg mr-4 mt-3' style={{ color: `${storeSettings.data ? storeSettings.data.primary_color : "black"}` }} />
                                <p className='text-black font-montSemiBold  mt-3' style={{ color: `${storeSettings.data ? storeSettings.data.primary_color : "black"}` }}>Add New Address</p>
                            </div>
                            :
                            <div className=' bg-white p-3 flex items-baseline  w-full border-b-4 border-slate-[200]' onClick={edit ? handleEditMobileAddress : handleDisplayMobileAddress} >
                                <ArrowLeftOutlined className='text-black text-lg mr-4' />
                                <p className='text-black font-montSemiBold lg:mt-0 mt-20'>{edit ? `Edit Address` : `Add New Address`}</p>
                            </div>}

                        {!addNewAddress ?
                            <>
                                {!isTabletOrMobile && <div className='bg-white lg:-mt-4  pl-4 lg:pl-8 lg:p-3 md:pl-8 md:p-3 flex text-left lg:ml-5 md:ml-5 w-full '>
                                    <div className='cursor-pointer' onClick={() => { `${!addNewAddress ? setAddNewAddress(!addNewAddress) : ""}` }}>
                                        {/* /account/user` */}
                                        {addNewAddress && <ArrowLeftOutlined className='text-black text-lg mr-4 mt-4 ' />}
                                    </div>
                                    <p className='text-black font-montBold mt-3 text-lg' >{!addNewAddress ? 'Saved Places' : 'Add New Address'}</p>
                                </div>}
                                <div className='flex flex-col flex-wrap lg:w-[55vw]  lg:pl-8 lg:p-3 md:lg-8 md:p-3  items-center flex-wrap  justify-between lg:ml-5 md:ml-5 w-full bg-white w-[100vw] border-b-2 border-slate-[200] cursor-pointer  lg:pb-3 '>
                                    {
                                        stateAddress ?
                                            !showAddressMobile ?
                                                <div className='lg:flex flex-wrap lg:justify-between lg:w-full lg:mb-0 mb-48'>

                                                    {stateAddress?.map(item =>
                                                        <div className='lg:flex flex-col items-start py-2' key={item.address_tag}>
                                                            <div className='flex w-full lg:w-[24vw] md:w-[vw] lg:justify-start md:justify-start lg:border-2 rounded lg:border-dashed lg:border-slate-400 md:border-none border-b-2 border-slate-200 p-2' key={item.address_id}>
                                                                {/* <Radio.Group onChange={() => { handleAddressChange(item) }} value={valueAddress} >
                                                                <Radio className='font-montSemiBold' value={item.address_id}></Radio>
                                                            </Radio.Group> */}
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
                                                                    <p className='text-sm'>{item.city},{item.address_line_1},{item.address_line_2}, {item.zip_code}</p>
                                                                    <p className='text-sm'>+91 {item.phone}</p>
                                                                    <div className='flex'>


                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <div className='hidden lg:block'>
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
                                                                </Popconfirm>
                                                            </div>





                                                        </div>
                                                    )}
                                                    <button className='hidden  md:block mt-6 mb-12 w-full lg:flex lg:items-start lg:ml-5 md:ml-5 cursor-pointer  py-4 font-montSemiBold' onClick={() => { setAddNewAddress(!addNewAddress) }} style={{ color: `${storeSettings.data ? storeSettings.data.primary_color : "black"}` }}><span><PlusCircleOutlined style={{ color: `${storeSettings.data ? storeSettings.data.primary_color : "black"}`, marginTop: '-5px', fontSize: '27px', paddingRight: '6px' }} /></span> Add new Address </button>

                                                </div> : '' :

                                            <div className='h-96 w-full flex items-center justify-center'>


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
                                    }
                                </div>


                            </>
                            :

                            // /* Add Address Web View */
                            <>
                                {!isTabletOrMobile &&
                                    <div className='bg-white lg:-mt-4 pl-4 lg:pl-8 lg:p-3 md:pl-8 md:p-3 flex text-left lg:ml-5 md:ml-5 w-full ' >
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
                                <h2 className='hidden p-6 font-montBold text-xl'>{`${edit ? `Edit Address` : `Add a New Address`}`}</h2>
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



                    </div>
                </div>



            </div >
            <ToastContainer />
        </div>
    )
}

const mapStateToProps = (state) => ({
    storeSettings: state.storeSettingsReducer,
    customerDetails: state.customerDetailsReducer,
    defaultAddressState: state.checkoutReducer,
    checkout: state.checkoutReducer,
    stateAddress: state.addressReducer?.data,
    storeDetails: state.storeDetailsReducer?.data
})

const mapDispatchToProps = dispatch => {
    return {
        defaultAddressAction: (data) => dispatch(defaultAddress(data)),
        addAddressAction: (data) => dispatch(addAddressAction(data)),
        editAddressAction: (data) => dispatch(editAddressAction(data)),
        getAddressAction: (data) => dispatch(getAddressAction(data)),
        fetchPurchaseDetails: (purchaseid, setLoading) => dispatch(fetchPurchaseDetails(purchaseid, setLoading)),


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)