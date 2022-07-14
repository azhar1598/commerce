import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { CloseOutlined, HeartFilled, MenuOutlined, SearchOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import { Badge, Dropdown, Menu, message } from 'antd'
import { useRouter } from 'next/router'
import LoginModal from './LoginModal/LoginModal'
import Link from 'next/link'
import { FaUserAlt, FaShoppingBag } from 'react-icons/fa'
import { IoIosCart } from 'react-icons/io';
import { customerDetails, getStoreDetails, hideCartAction, mobileSearchAction, searchItems } from '../actions'
import Modal from 'antd/lib/modal/Modal'
import ContactUs from './ContactUs'
import { configConsumerProps } from 'antd/lib/config-provider'
import absoluteUrl from 'next-absolute-url'
import SearchSvg from './svgComponents/SearchSvg'



const Header = ({ cart, isLoggedIn, storeSettings, searchItems, storeDetails, storeDetailsReducer, customerDetails, stateMobileSearch, dispatchMobileSearch, searchedItem }) => {

    const cartQuantity = cart.map(item => item.qty).reduce((partialSum, a) => partialSum + a, 0);

    const [input, setInput] = useState({ input: data?.search ? data.search : '' })

    const [showMobileSearch, setShowMobileSearch] = useState(false)
    const [hideCart, setHideCart] = useState(false)

    const router = useRouter()
    const [visible, setVisible] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [rgbaBackground, setRgbaBackground] = useState('')
    const [rgbaColor, setRgbaColor] = useState()
    const[customBorder,setCustomBorder]=useState()
    const [contactUsVisible, setContactUsVisible] = useState(false)

    const [hamburger, setHamburger] = useState(false)
    const otherLinksName = ['refund-policy', 'privacy-policy']

    const otherLinksTitle = ['RETURN AND REFUND', 'PRIVACY POLICY']
    const [otherLinks, setOtherLinks] = useState([])

    const handleLogout = () => {
        setIsModalVisible(false)
        customerDetails()
        message.success('Logged Out Successfully')
        router.push('/')
    }

    const { origin } = absoluteUrl()
    // console.log("origin",origin)
    // const origin="https://dev.robinhoodstyle.com"
    var count = origin.match(new RegExp("\\.", 'g'));
    console.log("count", count);

    // console.log("originalDomain", extractDomain(origin))
    if (count) {
        if (count.length >= 2) {
            const firstDotIndex = origin.indexOf('.');
            console.log("firstDotIndex", firstDotIndex)
            var domain = origin.substring(firstDotIndex + 1);
        }
        else {
            var domain = origin
        }
    }
    else {
        var domain = origin
    }



    useEffect(() => {
        let other = []
        for (let i = 0; i < 2; i++) {
            const name = otherLinksTitle[i];
            // const url = `${domain}/${otherLinksName[i]}`
            if (domain.includes('http')) {
                // var url = `${domain}/${otherLinksName[i]}`
                var url = `https://www.goplinto.com/${otherLinksName[i]}`
            }
            else {
                var url = `https://www.goplinto.com/${otherLinksName[i]}`
            }
            const nameUrl = { name, url }
            other.push(nameUrl)
        }
        setOtherLinks(other)
    }, [])


    const data = router.query


    const handleSearch = () => {

    }

    const showModal = () => {
        setVisible(true);
    }




    useEffect(() => {
        if (router.pathname == `/product/[id]` || router.pathname == `/cart` || router.pathname == `/account/myOrders` || router.pathname == `/account/savedPlaces` || router.pathname == `/account/addAddress` || router.pathname == `/account/orderDetails/[orderId]` || router.pathname == `/account/wallet` || router.pathname == `/wishlist` || searchedItem?.data == '' || router.pathname == `/address` || router.pathname == `/review`) {
            setInput({ input: '' })

        }



        if (searchedItem?.data == '') {

            console.log('hellow wr',)
        }





        setShowMobileSearch(false)
    }, [router.pathname, router?.query?.enable == 'true'])

    useEffect(() => {
        
        setRgbaBackground(hex2rgba(storeSettings.data ? storeSettings.data.navbar_color : '#ffffff', 0.9))
        setRgbaColor(hex2rgba(storeSettings.data ? storeSettings.data.navbar_color : '#000000', 0.02))
        setCustomBorder(hex2rgba('#212B36' , 0.25))
    }, [rgbaBackground == ''])

    useEffect(() => {

        // if (searchedItem.data == '' || searchedItem.data == undefined || searchedItem.data.length == 0) {

        //     console.log('searched Item inside', searchedItem.data.length != 0)

        //     setTimeout(() => { dispatchMobileSearch(false) }, 15000)

        // }
        // console.log('searched Item', searchedItem.data)

    }, [searchedItem.data, stateMobileSearch])

    useEffect(() => {

        dispatchMobileSearch(false)


    }, [cartQuantity])



    const hex2rgba = (hex, alpha = 1) => {
        const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
        return `rgba(${r},${g},${b},${alpha})`;
    };







console.log('isLoggedIn.data?.is_account_verified=="Y" ',isLoggedIn.data?.is_account_verified=="Y" )

    const menu = (
        <>
            {isLoggedIn.data?.customer_id ?
                <Menu style={{ width: '200px' }} >

                    {/*  <Menu.Item>
                        <Link href={`/account/myOrders`} passHref>
                            My Orders
                        </Link>
                    </Menu.Item>
                   <Menu.Item>
                        <Link href={`/account/wishlist`} passHref>
                            Wishlist
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href={`/account/wallet`} passHref>
                            Wallet
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link href={`/account/savedPlaces`} passHref>
                            Saved Places
                        </Link>
                    </Menu.Item>*/}
                    <Menu.Item>
                        <p onClick={() => setIsModalVisible(true)} passHref>
                            <p >Logout</p>
                        </p>
                    </Menu.Item> 
                </Menu> :
                <Menu>
                    <Menu.Item>
                        <p onClick={showModal} passHref>
                            <p>Log In / Sign Up</p>
                        </p>
                    </Menu.Item>
                </Menu>
                }
        </>
    );

    const handleChange = async (e) => {

        searchItems(e.target.value)

        setInput({ ...input, [e.target.name]: [e.target.value] })

        if (data?.id || router.pathname == "/" || router.pathname == `/account/myOrders` || router.pathname == `/account/savedPlaces` || router.pathname == `/account/addAddress` || router.pathname == `/checkout` || router.pathname == `/cart` || router.pathname == `/account/orderDetails/[orderId]` || router.pathname == `/account` || router.pathname == `/success` || router.pathname == `/account/wallet` || router.pathname == `/review` || router.pathname == `/wishlist` || router.pathname == `/address`) {
            router.push('/shop')
        }
        else {

        }

    }

    const showHamburger = () => {
        setHamburger(!hamburger)
    }


    return (
        <div className="">
            {/* Mobile View */}
            <div className={`lg:hidden md:hidden  fixed top-0  flex items-center ${stateMobileSearch ? `justify-start` : `justify-between`} w-full cursor-pointer`} style={{ fontSize: '24px ', zIndex: 1000, backgroundColor: `${storeSettings.data ? storeSettings.data.primary_color : 'black'}`, color: `${storeSettings.data ? 'white' : 'black'}`, width: '100vw', padding: `${stateMobileSearch ? '10px' : '15px'}` }}>



                {hamburger ?
                    <div className='lg:hidden md:hidden bg-white fixed w-72 mt-[84vh] h-[95vh]  left-0' style={{ zIndex: 1111 }}>
                        <CloseOutlined style={{ color: 'black', fontSize: '16px', textAlign: 'left' }} className='w-full px-4' onClick={showHamburger} />

                        <div className='flex flex-col mt-4'>
                            <div className='flex flex-col items-center justify-center'>
                                <img src={storeDetailsReducer?.data?.logo_img_url} className='cursor-pointer h-12 w-12 max-h-16 max-w-20' onClick={() => { router.push('/') }} />
                                <p className=' font-montSemiBold text-lg pb-4 cursor-pointer ' style={{ color: storeSettings.data ? storeSettings.data.primary_color : 'black' }}>{storeDetailsReducer?.data?.store_name} </p>
                            </div>

                            <p className=' border-b border-slate-200 font-montSemiBold  text-sm pb-4 pl-9 cursor-pointer ' style={{ color: storeSettings.data ? storeSettings.data.secondary_color : 'black' }} onClick={() => setContactUsVisible(true)} >CONTACT US</p>

                            {
                                otherLinks.map((item, idx) => <p className=' border-b border-slate-200 font-montSemiBold text-sm pb-4 pl-9 cursor-pointer ' style={{ color: storeSettings.data ? storeSettings.data.secondary_color : 'black' }} onClick={() => window.location.href = `${item.url}`} key={idx}> {item.name}</p>)
                            }


                            <div className='w-full flex flex-col items-center justify-center py-6 absolute bottom-0' style={{ backgroundColor: storeSettings.data ? storeSettings.data.secondary_color : 'black' }}>
                                <p className='text-sm'>Online Store Created on</p>
                                <p className='text-sm mb-12' >www.Goplinto.com</p>

                                <img src={'https://devo2.goplinto.com/profileLogos/goplinto_logo.png'} className='h-6 object-contain' onClick={()=>{router.push('https://www.goplinto.com/')}} />

                            </div>
                            {/* <p className='text-[#6E335F] border-b border-slate-200 text-lg pb-4 pl-3 cursor-pointer'>About</p> */}
                        </div>







                    </div> : ''}


                <MenuOutlined style={{ color: 'white' }} onClick={showHamburger} />
                <div className='flex items-center justify-between '>
                    <div className="  p-2 flex flex-row items-center " >
                        <input type="text" placeholder="Search" name="input" value={input.input} className={`  text-white outline-none text-[19px]`} style={stateMobileSearch ? { background: storeSettings.data ? storeSettings.data.primary_color : 'black', borderBottom: '2px solid white', width: '75vw', transition: 'all .5s linear' } : { display: 'none', outline: 'none', transition: 'all .5s ease-out', width: '55vw' }} onChange={handleChange} autoComplete="off" />
                        <SearchOutlined
                            //  className={`text-gray-900 ${stateMobileSearch ? 'mr-5' : ''}`} 
                            style={stateMobileSearch ? { marginRight: '8px', transition: 'all 2s .5s ease-out' } : { marginRight: '7px', transition: 'all  .5s ease-out' }}
                            onClick={
                                () => {
                                    setShowMobileSearch(!showMobileSearch)
                                    dispatchMobileSearch(!stateMobileSearch)

                                    // setHideCart(!hideCart)

                                }} />
                    </div>
                    {!stateMobileSearch && <Link href="/cart">
                        <Badge count={cartQuantity} color={storeSettings?.data ? storeSettings.data.secondary_color : 'black'}>
                            <ShoppingOutlined style={{ color: `${storeSettings?.data ? 'white' : 'black'}`, fontSize: '28px ', cursor: 'pointer' }} />
                        </Badge>
                    </Link>}
                </div>
            </div>


            {/* Web View and Tablet View*/}
            <div className='hidden  fixed w-full lg:flex md:flex items-center top-0 justify-around p-5  pl-28 pr-28 mb-4' style={{ zIndex: 1000, backgroundColor: `${storeSettings.data ? storeSettings.data.primary_color : 'white'}`}}>
                <div className='flex items-center w-1/4 max-w-1/2 '>
                    <img src={storeDetailsReducer?.data?.logo_img_url} className='cursor-pointer min-h-20 min-w-20 max-h-[72px] max-w-20' onClick={() => { router.push('/') }} />
                 <p className={` text-xl font-montSemiBold mt-3 cursor-pointer px-3`} style={{
                        color: `${storeSettings.data ? storeSettings.data.navbar_color : 'black'}`
                    }} onClick={() => { router.push('/') }} >{storeDetailsReducer?.data?.store_name.toUpperCase()}</p> 
                </div>

                <div className='flex w-full  items-center justify-between font-montSemiBold'>
                    <ul className='flex items-center mt-2 ml-5 w-[20vw] justify-around  text-[#212B36] ' style={{
                        color: `${storeSettings.data ? storeSettings.data.navbar_color : 'black'}`
                    }}>
                         <li>|</li>
                        <li className='text-sm cursor-pointer px-2' style={{
                            color: `${storeSettings.data ? storeSettings.data.navbar_color : 'black'}`
                        }} 
                        onClick={() => { router.push('/shop') }}
                        >
                            Shop
                        </li>
                        <li>|</li>
                        <li className='text-sm cursor-pointer px-2' onClick={() => setContactUsVisible(true)} >
                            About
                        </li>
                        <li>|</li>
                        <li className='text-sm cursor-pointer px-2' onClick={() => setContactUsVisible(true)} >
                            Contact Us
                        </li>




                    </ul>
                    <div className=" p-1 flex flex-row items-center w-[30vw]
                    mr-4 -mt-1" style={{ backgroundColor: rgbaBackground ,boxShadow:`0px 0px 0px 1px ${customBorder}`}} >

                        <input type="text" placeholder="Search" name="input" value={input.input} className="w-full  text-black outline-none px-2" onChange={handleChange} autoComplete="off" style={{ color: `${storeSettings.data ? 'gray' : 'black'}`, backgroundColor: rgbaColor }} />
                    <SearchSvg navbarColor={storeSettings.data ? 'gray':'black'}/>
                        {/* <SearchOutlined className="text-lg px-2" style={{ color: `${storeSettings.data ? storeSettings.data.navbar_color : 'black'}` }} /> */}
                    </div>
                </div>

                <div className='flex items-center justify-center w-1/4 text-lg text-[#212B36]'>

                    <Dropdown overlay={menu} placement="bottomCenter" arrow >
                        <FaUserAlt className='ml-12 cursor-pointer' style={{ color: `${storeSettings.data ? storeSettings.data.navbar_color : 'black'}`, fontSize: '20px', cursor: 'pointer' }} />
                    </Dropdown>
                    <LoginModal visible={visible} setVisible={setVisible} showModal={showModal} />
                    {isLoggedIn.data?.customer_id ? <Link href="/"
                    // href="/account/wishlist"
                    >
                        <HeartFilled className='ml-12' style={{ color: `${storeSettings.data ? storeSettings.data.navbar_color : 'black'}`, fontSize: '20px', cursor: 'pointer' }} />
                    </Link> : <HeartFilled className='ml-12' style={{ color: `${storeSettings.data ? storeSettings.data.navbar_color : 'black'}`, fontSize: '20px', cursor: 'pointer' }}
                    //  onClick={showModal}
                      />}
                    <Link href="/"
                    // href="/cart"
                    >
                        <Badge count={cartQuantity} color={storeSettings.data ? storeSettings.data.secondary_color : 'black'} >
                            {/* <ShoppingCartOutlined  className='ml-12' style={{ color: `${storeSettings.data ? storeSettings.data.navbar_color : 'black'}`, fontSize: '20px', cursor: 'pointer' }} /> */}

                            <IoIosCart className='ml-12' style={{ color: `${storeSettings.data ? storeSettings.data.navbar_color : 'black'}`, fontSize: '27px', cursor: 'pointer' }}/>
                        </Badge>
                    </Link>
                </div>
            </div>

            <Modal title="Logout" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
                <p className='text-xl text-center font-montSemiBold'>Log Out?</p>
                <p className='text-base text-center'>Are you sure? You want to log out !</p>
                <div className='flex justify-center gap-3'>
                    <button onClick={() => setIsModalVisible(false)} className='w-4/12 border py-2 rounded' style={{ borderColor: `${storeSettings.data ? storeSettings.data.primary_color : 'black'}`, color: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}` }}>Cancel</button>
                    <button onClick={handleLogout} className='w-4/12 py-2 rounded' style={{ backgroundColor: `${storeSettings.data ? storeSettings.data.secondary_color : 'black'}`, color: `white` }}>Confirm</button>
                </div>

            </Modal>

            <ContactUs contactUsVisible={contactUsVisible} setContactUsVisible={setContactUsVisible} />

        </div>
    )
}

const mapStateToProps = (state) => ({
    storeSettings: state.storeSettingsReducer,
    cart: state.cartReducer.cart,
    isLoggedIn: state.customerDetailsReducer,
    storeDetailsReducer: state.storeDetailsReducer,
    stateMobileSearch: state.mobileHeaderReducer.data,
    searchedItem: state.searchItemsReducer,
})

const mapDispatchToProps = dispatch => {
    return {
        searchItems: (query) => dispatch(searchItems(query)),
        storeDetails: (data) => dispatch(getStoreDetails(data)),
        customerDetails: (data) => dispatch(customerDetails()),
        dispatchMobileSearch: (data) => dispatch(mobileSearchAction(data)),
        dispatchHideCart: (data) => dispatch(hideCartAction(data)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)


