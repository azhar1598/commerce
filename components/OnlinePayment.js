import { Modal } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import { useRouter } from 'next/router'
import { clearCart } from '../actions';
import { razorPayOrderSuccess } from '../services/apiServices';


const OnlinePayment = ({ paymentData, store, setPaymentData, clearCart, storeSettings, storeDetails,razorpayKey }) => {
    const router = useRouter();

    const back = () => {
        setPaymentData({})
        document.body.style.overflow='auto'
    }

   
    useEffect(() => {
        // console.log("razorpaykey from online order",razorpayKey || process.env.NEXT_PUBLIC_RAZORPAY_API_KEY)
        const orderAmount = paymentData.orderAmount;
        const rzpOrderId = paymentData.rzpOrderId;
        const customerId = paymentData.customerId;
        const purchaseId = paymentData.purchaseId;
        const options = {
            key: razorpayKey || process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
            amount: (orderAmount * 100).toFixed(2), // Accept in Paisa (₹1 = 100 paisa)
            name: storeDetails.store_name,
            description: "Powered by Goplinto",
            image: storeDetails.logo_img_url ? storeDetails.logo_img_url : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
            order_id: rzpOrderId,
            handler: async (response) => {
                if (!response.razorpay_payment_id) {
                    console.log("Your payment seems to have failed, please try again");
                } else {
                    // clearCart();
                    // confirmPayment({
                    //     purchaseId: purchaseId,
                    //     customerId: customerId,
                    //     amount: orderAmount,
                    //     id: response.razorpay_payment_id
                    // });
                    razorPayOrderSuccess(purchaseId, customerId, orderAmount, false,response.razorpay_payment_id)
                    router.push({
                        pathname: `/success`,
                        query: paymentData?.successInfo
                    })

                }
            },
            prefill: {
                name: paymentData?.username,
                contact: paymentData?.phone,
            },
            theme: {
                color: storeSettings?.data?.primary_color ? storeSettings.data.primary_color : null,
            },
            modal: {
                "ondismiss": back
            }
        };
        const rzp = new window.Razorpay(options);

        rzp.open();
    }, [])
    return (
        <div>
            <h1>loading...</h1>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        storeSettings: state.storeSettingsReducer,
        storeDetails: state.storeDetailsReducer.data,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearCart: () => dispatch(clearCart())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OnlinePayment);