import Document, { Html, Head, Main, NextScript } from 'next/document'
import { getStoreDetailsAPI, handleSEO } from '../services/apiServices'

class MyDocument extends Document {


    static async getInitialProps(ctx) {
        const originalRenderPage = ctx.renderPage

        // Run the React rendering logic synchronously
        ctx.renderPage = () =>
            originalRenderPage({
                // Useful for wrapping the whole react tree
                enhanceApp: (App) => App,
                // Useful for wrapping in a per-page basis
                enhanceComponent: (Component) => Component,
            })
            const initialProps = await Document.getInitialProps(ctx)
        // Run the parent `getInitialProps`, it now includes the custom `renderPage`
        const storeId = 196;
        try {
       
            const storeSettingsRes = await getStoreDetailsAPI(storeId);
            const seo = await handleSEO(storeId);
            return { ...initialProps, data: storeSettingsRes.data, seo: seo.data };
        } catch (error) {
            return { ...initialProps, data: null, seo: null };
        }
    }



    render() {


        // console.log('rendered data',this.props.seo)
        const store = this.props?.data;
        const seo = this.props?.seo;
        return (
            <Html>
                <Head>
                    <title>{seo ? seo.seo_title : store ? store?.store_name : 'GoPlinto'}</title>
                    <link rel="shortcut icon" href={store ? store.logo_img_url : 'https://www.goplinto.com/assets/images/goplinto-logo-white-480x97.png'} type="image/x-icon" />


                    
                    <meta name="description" content={seo ? seo?.seo_desc : store ? store.store_desc : 'GoPlinto'} />

                    <meta property="og:title" content={seo ? seo.seo_title : store ? store?.store_name : 'GoPlinto'}></meta>
                    <meta property="og:description" content={seo ? seo?.seo_desc : store ? store.store_desc : 'GoPlinto'}></meta>
                    <meta property="og:image" content={store ? store.logo_img_url : 'https://www.goplinto.com/assets/images/goplinto-logo-white-480x97.png'}></meta>
                    <meta property="og:image:secure_url" content={store ? store.logo_img_url : 'https://www.goplinto.com/assets/images/goplinto-logo-white-480x97.png'}></meta>

                    <meta name="keywords" content={seo ? seo?.seo_tags : `Goplinto, Amazon.in, Amazon, Online Shopping, online shopping india, india shopping online, amazon india, amazn, buy online, buy mobiles online, buy books online, buy movie dvd's online, kindle, kindle fire hd, kindle e-readers, ebooks, computers, laptop, toys, trimmers, watches, fashion jewellery, home, kitchen, small appliances, beauty, Sports, Fitness &amp; Outdoors`} />
                    {/* <link rel="manifest" href="/manifest.json" /> */}
                    <link rel="manifest" id="my-manifest-placeholder"></link>
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="white" />
                    <link rel="apple-touch-icon" href="ic_launcher-web.png" />
                    <meta name="theme-color" content="#468E97" />
                    <base href="/" />
                    {/* <link rel="manifest" crossOrigin="use-credentials" href="/manifest.json" /> */}

                    {/* <meta name="description" content={` Amazon.in: Online Shopping India - Buy mobiles, laptops, cameras, books, watches, apparel, shoes and e-Gift Cards. Free Shipping &amp; Cash on Delivery Available. `} />
                    <meta property="og:description"
                        content={`The pizzeria is the largest pizza restaurant chain in the Country with multiple outlets in and around. The pizzeria is known for its fresh pizzas made using organic produce and local ingredients.`} />
                    <meta name="keywords" content={`Goplinto, Amazon.in, Amazon, Online Shopping, online shopping india, india shopping online, amazon india, amazn, buy online, buy mobiles online, buy books online, buy movie dvd's online, kindle, kindle fire hd, kindle e-readers, ebooks, computers, laptop, toys, trimmers, watches, fashion jewellery, home, kitchen, small appliances, beauty, Sports, Fitness &amp; Outdoors`} /> */}
                    <script src="https://checkout.razorpay.com/v1/checkout.js" defer={true}></script>
                </Head>
                <body>
                    <div id='style'></div>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

// export async function getStaticProps() {
//     // Call an external API endpoint to get posts.
//     // You can use any data fetching library

//     console.log('responseee',res)

//     const posts = await res.json()

//     // By returning { props: { posts } }, the Blog component
//     // will receive `posts` as a prop at build time
//     return {
//       props: {
//         posts,
//       },
//     }
//   }


export default MyDocument