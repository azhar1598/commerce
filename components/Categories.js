import { AppstoreFilled, ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getCategoriesAction, getSearchItemsAction, searchItems } from '../actions'
import { getCategories } from '../services/apiServices'
import Category from './Category'

export const Categories = ({ dispatchCategories,stateStoreSettings ,searchedItem,dispatchSearchItems}) => {

    const [categories, setCategories] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [categoryKey, setCategoryKey] = useState()
    const router = useRouter()
    const data=router.query

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = () => {
        const payload = { storeId: 'storeId', setCategories }
        dispatchCategories({ payload })
    }

    const handleCategory = async (id, name,subCategories) => {

        // document.getElementById(id).style.color = "red"
        dispatchSearchItems('')

        console.log('subCategpries',subCategories,name)

        setCategoryKey(id)

    
        if(subCategories ||subCategories==undefined){
            router.push(`/shop/?category_id=${id}&category_name=${name}&${subCategories!=[] && subCategories!=undefined?`sub_category_id=${subCategories[0]?.sub_category_id}&sub_category_name=${subCategories[0]?.sub_category_name}`:``}`)
            setShowModal(false)
        }

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

            <div className='flex items-end justify-between w-full  bg-white -mt-12 fixed z-[1000] px-32 pt-3'>
                    <p className='min-w-[80px] cursor-pointer pl-2 px-2 font-montMedium' onClick={() => { handleCategory('All Items') }}>All Items</p>
                    
                    
                    
                        {categories.map(item =>
                            <Category name={item.category_name} id={item.category_id} key={item.category_id} handleCategory={handleCategory} handleSubCategory={handleSubCategory} subCategories={item.subCategories} categoryKey={categoryKey} />
                        )}
                    </div>


     
            <div className='lg:hidden md:hidden flex'>
                <AppstoreFilled className='mt-24 pl-4 text-2xl' onClick={openCategorySidebar} style={{color:stateStoreSettings?.data?stateStoreSettings?.data?.secondary_color:'white'}}/>
                {console.log('data.subcateg',data.sub_category_name,data?.category_id!='All Items',data.sub_category_name != undefined )}
                <p className='  mt-[100px] pl-1 text-sm font-montMedium'>{Object.keys(data).length != 0 && data.constructor === Object 
                 ?data?.category_id!='All Items' ? data.sub_category_name != 'undefined' ? data.sub_category_name : data.category_name:'All Items' :  searchedItem.data != '' && searchedItem.data != undefined && searchedItem.length != 0?`Search Results` : 'All Items'}</p>
                
            </div>

            {/* Mobile view Categories */}

            {showModal ?
                <div className='lg:hidden md:hidden bg-white fixed h-[100vh] w-full  left-0 top-[4rem]' style={{ zIndex: 1111 }}>
                    <div className='flex items-start justify-start  w-full' onClick={openCategorySidebar}>
                        <ArrowLeftOutlined style={{ color: 'black', fontSize: '24px', textAlign: 'left' }} className=' mt-4 pl-4' onClick={openCategorySidebar} />
                        <p className='text-lg mt-4 px-4 font-montSemiBold '>Categories</p>
                    </div>
                    <div className='flex bg-gray-100 h-20 overflow-scroll px-2'>
                    <p className='mt-6 min-w-[80px] cursor-pointer pl-2 px-2 font-montRegular' onClick={() => { handleCategory('All Items') }}>All Items</p>
                    
                    
                    
                        {categories.map(item =>
                            <Category name={item.category_name} id={item.category_id} key={item.category_id} handleCategory={handleCategory} handleSubCategory={handleSubCategory} subCategories={item.subCategories} categoryKey={categoryKey} />
                        )}
                    </div>


                </div> : ''}
        </>
    )
}

const mapStateToProps = (state) => {
    return{
        stateStoreSettings:state.storeSettingsReducer,
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