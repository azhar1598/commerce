import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import Head from 'next/head'
import { getShopSeoStart } from '../../actions';
import { useRouter } from "next/router";


const Verifier = ({ children,storeSettingsReducer,storeDetails,getShopSeo,seo }) => {
  const router = useRouter()
  useEffect(() => {
    getShopSeo(196);
}, [router])
    return (
        <>
      <Head>
        {storeSettingsReducer.widgets ?
          storeSettingsReducer.widgets?.GOOGLE_MERCHANT_CENTER ?
          storeSettingsReducer.widgets?.GOOGLE_MERCHANT_CENTER?.record_status == "ACTIVE" ?
              <meta name="google-site-verification" content={storeSettingsReducer.widgets && storeSettingsReducer.widgets?.GOOGLE_MERCHANT_CENTER?.integration_attributes?.verificationCode} />
              : ""
            : ""
          : ""
        }
        <title>{seo ? seo.seo_title : storeDetails ? storeDetails?.store_name : 'Apparel Store'}</title>
        <meta name="description" content={seo ? seo?.seo_desc : storeDetails ? storeDetails?.store_desc:'GoPlinto'} />
        <link rel="icon" href={storeDetails ? storeDetails?.logo_img_url : 'favicon.ico'} />
      </Head>
            <main>{children}</main>
        </>
    );
};

const mapStateToProps = state => {
    return {
        storeDetails: state.storeDetailsReducer?.data,
      storeSettingsReducer: state.storeSettingsReducer,
      seo: state.storeSettingsReducer?.seo,
    }
  }
  const mapDispatchToProps = dispatch => {
    return{
      getShopSeo: (shopId) => dispatch(getShopSeoStart(shopId)),
    }

}

  const HOC = connect(mapStateToProps,mapDispatchToProps)(Verifier)

  const PageWrapper = WrappedComponent => {
  

      return function condition(props) {
        return(
      <HOC>
          <WrappedComponent {...props} />
      </HOC>
      )}
  }


  export default PageWrapper;