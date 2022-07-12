import React from 'react';
import { connect } from "react-redux";
import Script from "next/script";

const GoogleAnalytics = ({ stateStoreSettings }) => {
    return (
        <>
            {stateStoreSettings.widgets ?
                stateStoreSettings.widgets?.GOOGLE_ANALYTICS ?
                stateStoreSettings.widgets?.GOOGLE_ANALYTICS?.record_status == "ACTIVE" ?
                        <>
                            <Script
                                strategy="lazyOnload"
                                id='googleAnalytics1'
                                src={`https://www.googletagmanager.com/gtag/js?id=${stateStoreSettings.widgets && stateStoreSettings.widgets?.GOOGLE_ANALYTICS?.integration_attributes?.trackingId}`}
                            />

                            <Script strategy="lazyOnload" id='googleAnalytics2'>
                                {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${stateStoreSettings.widgets && stateStoreSettings.widgets?.GOOGLE_ANALYTICS?.integration_attributes?.trackingId}', {
              page_path: window.location.pathname,
            });
                `}
                            </Script>
                        </>
                        :
                        ""
                    :
                    ""
                :
                ""
            }
        </>
    );
};

const mapStateToProps = state => ({
    stateStoreSettings: state.storeSettingsReducer,
})
export default connect(mapStateToProps)(GoogleAnalytics);