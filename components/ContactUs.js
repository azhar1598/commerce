import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import call from "../public/footer/Call.svg"
import location from '../public/footer/Location.svg';
import { connect } from 'react-redux';
import { useRouter } from 'next/router'
import { getSocialProfile } from '../services/apiServices';

const ContactUs = ({ contactUsVisible, setContactUsVisible, storeDetails, storeId, storeSettings, stateSocialProfile }) => {
    const [socialLinks, setSocialLinks] = useState([])
    const Router = useRouter();

    // useEffect(() => {
    //     getSocialLink(storeId)
    // }, [Router.query])

    // const getSocialLink = async (store) => {
    //     const res = await getSocialProfile(store)
    //     setSocialLinks(res.data)
    // }




    return (
        <div>
            <>
                <Modal
                    centered
                    visible={contactUsVisible}
                    onCancel={() => setContactUsVisible(false)}
                    width={1000}
                    footer={null}
                    bodyStyle={{
                        padding: "0",
                    }}
                >
                    <div className='grid     lg:grid-cols-5'>
                        <div className=' p-7 flex flex-col items-center justify-center col-span-2 lg:py-24 w-full'>
                            <div className=''>
                                <img className="h-32 w-32 max-h-32" src={storeDetails?.logo_img_url} alt="" />
                            </div>
                            <div className=''>
                                <h3 className='text-base font-montSemiBold'>{storeDetails?.store_name}</h3>
                                <p className='text-center font-montMedium'>{storeDetails?.store_type}</p>
                            </div>
                        </div>
                        <div className='p-7 col-span-3' style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, color: `white` }}>
                            <p className='text-xl font-montSemiBold'>CONTACT US</p>
                            <div className='text-white space-y-5 pl-4'>
                                {storeDetails?.address ? <div>
                                    <span><svg className='inline mr-2' width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17 9.18182C17 15.5455 9 21 9 21C9 21 1 15.5455 1 9.18182C1 7.01187 1.84285 4.93079 3.34315 3.3964C4.84344 1.86201 6.87827 1 9 1C11.1217 1 13.1566 1.86201 14.6569 3.3964C16.1571 4.93079 17 7.01187 17 9.18182Z" stroke="white" strokeOpacity="1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M8.99992 11.9091C10.4727 11.9091 11.6666 10.6881 11.6666 9.18186C11.6666 7.67563 10.4727 6.45459 8.99992 6.45459C7.52716 6.45459 6.33325 7.67563 6.33325 9.18186C6.33325 10.6881 7.52716 11.9091 8.99992 11.9091Z" stroke="white" strokeOpacity="1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>{storeDetails?.address},{storeDetails?.city},{storeDetails?.state},{storeDetails?.country}</span>
                                </div> : ''}

                                {storeDetails?.primary_phone?
                                <div>
                                    <span><svg className='inline mr-2' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.9995 12.9791V15.3877C17.0004 15.6113 16.9545 15.8327 16.8648 16.0375C16.775 16.2424 16.6434 16.4263 16.4783 16.5775C16.3132 16.7286 16.1183 16.8437 15.906 16.9154C15.6938 16.987 15.4689 17.0136 15.2457 16.9935C12.7702 16.725 10.3923 15.8808 8.30312 14.5286C6.35937 13.2959 4.71141 11.6512 3.47627 9.71135C2.11669 7.61679 1.27059 5.23206 1.00653 2.75036C0.986426 2.52834 1.01286 2.30457 1.08416 2.0933C1.15546 1.88203 1.27005 1.6879 1.42065 1.52325C1.57124 1.35861 1.75454 1.22706 1.95886 1.13699C2.16319 1.04691 2.38407 1.00029 2.60744 1.00008H5.02086C5.41128 0.996243 5.78977 1.13422 6.0858 1.3883C6.38182 1.64237 6.57517 1.99521 6.62981 2.38103C6.73168 3.15185 6.92059 3.9087 7.19295 4.63713C7.30118 4.9245 7.32461 5.23682 7.26045 5.53707C7.19629 5.83732 7.04723 6.11292 6.83093 6.33121L5.80925 7.35087C6.95446 9.36092 8.62206 11.0252 10.6361 12.1682L11.6578 11.1485C11.8765 10.9326 12.1527 10.7839 12.4535 10.7198C12.7544 10.6558 13.0673 10.6792 13.3552 10.7872C14.0851 11.059 14.8435 11.2476 15.6158 11.3492C16.0066 11.4042 16.3635 11.6007 16.6186 11.9012C16.8737 12.2017 17.0093 12.5853 16.9995 12.9791Z" stroke="white" strokeOpacity="1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>+91 {storeDetails?.primary_phone}</span>
                                </div>:''}
                                {storeDetails?.primary_email?
                                <div>
                                    <p><span className='text-[18px] mr-2 font-montMedium'>@</span> {storeDetails?.primary_email}</p>
                                </div>:''}
                            </div>
                            {
                                stateSocialProfile?.length ? <div className='mt-10'>
                                    <p className='text-xl font-montSemiBold'>CONNECT WITH US</p>
                                    <div className='flex space-x-2 flex-wrap'>
                                        {
                                            stateSocialProfile.map(function (item, idx) {
                                                if (item.social_account_link) {
                                                   
                                                    return <img onClick={() =>
                                                        //  window.location.href = `https://${item.social_account_link}`} 
                                                         window.open(`https://${item.social_account_link}`)}
                                                         className='w-8 h-8 max-h-8 rounded cursor-pointer' key={idx} src={item.logo_img_url}></img>
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                                    : ""
                            }

                        </div>
                    </div>
                </Modal>
            </>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        storeSettings: state.storeSettingsReducer,
        storeId: state.storeDetailsReducer?.data?.store_id,
        storeDetails: state.storeDetailsReducer?.data,
        stateSocialProfile: state.socialProfileReducer?.data
    }
}

export default connect(mapStateToProps)(ContactUs);