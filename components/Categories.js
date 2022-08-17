import { AppstoreFilled, ArrowLeftOutlined, CaretDownOutlined, CloseOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getCategoriesAction, getSearchItemsAction, searchItems } from '../actions'
import { getCategories } from '../services/apiServices'
import Category from './Category'
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu'

export const Categories = ({ dispatchCategories, stateStoreSettings, searchedItem, dispatchSearchItems, showMenu }) => {

    const [categories, setCategories] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [categoryKey, setCategoryKey] = useState()
    const [closeSubCategory, setCloseSubCategory] = useState(false)
    const [showOthers, setShowOthers] = useState(false)


    const router = useRouter()


    const [categoryId, setCategoryId] = useState()
    const data = router.query

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = () => {
        const payload = { storeId: 'storeId', setCategories }
        dispatchCategories({ payload })
    }

    const handleCategory = async (id, name, subCategories) => {

        // document.getElementById(id).style.color = "red"
        dispatchSearchItems('')


        console.log('subCategpries', subCategories, name)

        setCategoryKey(id)


        // if (subCategories || subCategories == undefined) {
        //     subCategories.length == 0 && 

        router.push(`/shop/?category_id=${id}&category_name=${name}`)

        // if you want to add default subcategory then copy below code and paste  or attachin line 41

        // {*/  &${subCategories != [] && subCategories != undefined ? `sub_category_id=${subCategories[0]?.sub_category_id}&

        // sub_category_name=${subCategories[0]?.sub_category_name}` : ``}

        // setShowModal(false)
        // }

        if (id != "All Items") {

            const filterCategory = categories.filter(item => {
                if (item.category_id == id)
                    return item
            })

            if (!filterCategory[0].subCategories) {
                router.push(`/shop/?category_id=${id}&category_name=${name}`)
            }
            setShowModal(false)
        }
        else {
            setShowModal(false)
            router.push(`/shop/?category_id=${id}`)
        }
    }





    const handleSubCategory = (categoryId, subCategoryId, subCategoryName) => {
        setShowModal(!showModal)

        router.push(`/shop/?category_id=${categoryId}&sub_category_id=${subCategoryId}&sub_category_name=${subCategoryName}`)
    }

    const openCategorySidebar = () => {
        setShowModal(!showModal)
    }

    const menu = (

        // <Menu>
        //     {categories.map((item, index) =>

        //         index >= 6 &&
        //         <Menu.Item>
        //             <>
        //                 <p onClick={() => { handleCategory(item.category_id, item.category_name, item.subCategories) }}  onMouseEnter={() => {setCategoryId(item.category_id)
        //                 }}>{item.category_name}


        //                 {item.subCategories.map(product => 
        //                     categoryId == product.category_id &&

        //                     <SubMenu key={product.category_id} title={product.category_name} onTitleClick={() => {
        //                         handleSubCategory(product.category_id, product.category_name)
        //                     }}
        //                     >
        //                         <Menu.Item key={product.sub_category_id}>{product.sub_category_name}</Menu.Item>
        //                     </SubMenu>



        //                 )} 

        //                 </p>



        //             </>
        //         </Menu.Item>
        //     )}
        // </Menu>



        <></>


    )





    return (
        <>
            {/* Web View Categories */}
            {/* <div className='hidden lg:flex md:flex flex-col mt-8 lg:ml-28  md:ml-28  p-5 border-r-2 border-slate-300 w-[15vw] max-w-[15vw] min-w-[15vw] '> */}
            {/* <p className='font-montBold text-lg'>Categories</p> */}
            {/* <p className='cursor-pointer pl-2 font-montRegular' onClick={() => { handleCategory('All Items') }}>All Items</p>
                {categories.map(item =>
                    <Category name={item.category_name} id={item.category_id} key={item.category_id} handleCategory={handleCategory} categories={categories} subCategories={item.subCategories} handleSubCategory={handleSubCategory} categoryKey={categoryKey} />
                )} */}
            {/* </div> */}

            <div className={`hidden  lg:flex items-end justify-between w-full  bg-white ${router.pathname == '/shop' ? '-mt-11' : '-mt-[65px]'}  fixed z-[1000] px-32 pt-3`}>
                {/* <p className='min-w-[80px] cursor-pointer pl-2 px-2 font-montMedium' onClick={() => { handleCategory('All Items') }}>All Items</p> */}

                {categories.map((item, key) => {
                    if (key <= 5) {
                        return (
                            <Category name={item.category_name} id={item.category_id} key={item.category_id} handleCategory={handleCategory} handleSubCategory={handleSubCategory} subCategories={item.subCategories} categoryKey={categoryKey} setCategoryKey={setCategoryKey} keyLimit={key} categories={categories} closeSubCategory={closeSubCategory} setCloseSubCategory={setCloseSubCategory} />
                        )
                    }
                    else {
                        return (
                            key == 6 &&
                            <div className=''>




                                <div className='flex relative '>
                                    <div className='flex show-others'>
                                        <p id={item.category_id} className={`inline ${categoryKey == item.category_id && data?.category_id == categoryKey ? 'font-montMedium' : 'font-montMedium'} cursor-pointer`} style={categoryKey == item.category_id && data?.category_id == categoryKey ? { color: stateStoreSettings ? stateStoreSettings?.secondary_color : 'black' } : { color: 'black' }}
                                        // onClick={() => { handleCategory(item.category_id, item.category_name, item.subCategories) }} onMouseEnter={() => {
                                        //     if (item.subCategories.length != 0) {
                                        //         // handleCategory(id, name, subCategories)
                                        //         setCategoryKey(id)
                                        //         setCloseSubCategory(true)
                                        //     }
                                        // }}

                                        // onMouseEnter={() => setShowOthers(true)}
                                        >Others</p>
                                        <div className='-mt-1 px-2 inline'>
                                            <CaretDownOutlined style={categoryKey == item.category_id && data?.category_id == categoryKey ? { color: stateStoreSettings ? stateStoreSettings?.secondary_color : 'black' } : { color: 'black' }} />
                                        </div>

                                        <div className='hidden absolute bg-white w-[250px] bg-opacity-40 backdrop-blur-lg  border-blue-100 shadow mt-8 px-5 left-[50%] -translate-x-[50%] others-menu ' onMouseLeave={() => { setShowOthers(!showOthers) }}>

                                            {categories.map((item, key) => {
                                                return (
                                                    key >= 6 &&
                                                    <div className='category relative' >

                                                        <p className='px-5 cursor-pointer' onClick={() => { handleCategory(item.category_id, item.category_name, item.subCategories) }} style={categoryKey == item.category_id && data?.category_id == categoryKey ? { color: stateStoreSettings ? stateStoreSettings?.secondary_color : 'black' } : { color: 'black' }} 
                                                        onMouseEnter={() => {
                                                            if (item.subCategories.length != 0) {
                                                                // handleCategory(id, name, subCategories)
                                                                setCategoryKey(item.category_id)
                                                                // setCloseSubCategory(true)
                                                            }
                                                        }} 
                                                        >{item.category_name}</p>


                                                        <div className='hidden absolute right-[100%] bg-opacity-40 backdrop-blur-lg  border-blue-100 shadow mt- px-8  top-0  sub-category'>
                                                            {/* {closeSubCategory ?
                                                                showOthers &&  */}
                                                                {item.subCategories.map((item, key) => {
                                                                    return (
                                                                       



                                                                        // <div className='bg-red-300' onMouseLeave={() => {
                                                                        //     if (item.subCategories.length != 0) {
                                                                        //         // handleCategory(id, name, subCategories)
                                                                        //         setCloseSubCategory(false)
                                                                        //     }
                                                                        // }}>
                                                                        //     {categoryKey == item.category_id && item.subCategories?.map(item =>
                                                                                <p className='cursor-pointer px-8 min-w-[100%] ' style={data?.sub_category_id == item.sub_category_id ? { color: stateStoreSettings ? stateStoreSettings?.secondary_color : 'black' } : { color: 'black' }} onClick={() => { handleSubCategory(item.category_id, item.sub_category_id, item.sub_category_name) }} key={item.sub_category_id}    >{item.sub_category_name}</p>
                                                                        //     )}
                                                                        // </div>
                                                                    )
                                                                })}
                                                                {/* // : ''} */}
                                                        </div>



                                                    </div>

                                                )
                                            })}
                                        </div>
                                    </div>





                                </div>




                            </div>



                            // <Dropdown overlay={menu}>
                            //     <a onClick={(e) => e.preventDefault()}>
                            //         <div className='flex '>
                            //             <p className='text-black font-montMedium'>Others</p>
                            //             <CaretDownOutlined className='px-2 pt-1 ' style={{ color: 'black' }} />
                            //         </div>
                            //     </a>
                            // </Dropdown>
                        )







                    }
                }

                )}

            </div>



            <div className='lg:hidden md:hidden flex'>
                {/* <AppstoreFilled className='mt-24 pl-4 text-2xl' onClick={openCategorySidebar} style={{ color: stateStoreSettings?.data ? stateStoreSettings?.data?.secondary_color : 'white' }} /> */}
                {console.log('data.subcateg', data.sub_category_name, data?.category_id != 'All Items', data.sub_category_name != undefined)}
                <p className='  pl-2 text-lg font-montSemiBold' style={{ marginTop: '80px' }}>{Object.keys(data).length != 0 && data.constructor === Object
                    ? data?.category_id != 'All Items' ? data.sub_category_name != undefined ? data.sub_category_name : data.category_name : 'All Items' : searchedItem.data != '' && searchedItem.data != undefined && searchedItem.length != 0 ? `Search Results` : 'All Items'}</p>

            </div>

            {/* Mobile view Categories */}

            {showMenu ?
                <div className='lg:hidden md:hidden bg-white fixed h-[100vh] w-full  left-0 top-[4rem] -mt-16' style={{ zIndex: 1111 }}>
                    <div className='flex items-start justify-start  w-full' onClick={openCategorySidebar} style={{ color: stateStoreSettings?.data ? stateStoreSettings?.data?.navbar_color : 'white', backgroundColor: stateStoreSettings?.data ? stateStoreSettings?.data?.primary_color : 'white' }} >
                        {/* <ArrowLeftOutlined style={{ color: 'black', fontSize: '24px', textAlign: 'left' }} className=' mt-4 pl-4' onClick={openCategorySidebar} /> */}
                        <p className='text-lg mt-4 py-3 px-4 font-montSemiBold ' >Categories</p>
                    </div>

                    <div className='bg-gray-100 pt-4 overflow-scroll h-[80vh] '>
                        {/* <p className='  cursor-pointer  text-lg px-4 font-montMedium border-white border-b-2 py-3' onClick={() => { handleCategory('All Items') }}>All Items</p> */}



                        {categories.map(item =>
                            <Category name={item.category_name} id={item.category_id} key={item.category_id} handleCategory={handleCategory} handleSubCategory={handleSubCategory} subCategories={item.subCategories} categoryKey={categoryKey} />
                        )}
                    </div>


                </div> : ''}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        stateStoreSettings: state.storeSettingsReducer,
        searchedItem: state.searchItemsReducer,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchCategories: (payload) => dispatch(getCategoriesAction(payload)),
        dispatchSearchItems: (query) => dispatch(searchItems(query)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)