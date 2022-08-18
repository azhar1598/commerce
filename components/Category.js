import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { CaretDownOutlined } from '@ant-design/icons'


export const Category = ({ name, id, handleCategory, handleSubCategory, categories, subCategories, categoryKey, setCategoryKey, openCategorySidebar, stateStoreSettings, closeSubCategory, setCloseSubCategory }) => {

    const router = useRouter()

    const data = router.query

    console.log('categor', data, data?.category_id == id)


    useEffect(() => {
        
        // console.log('categor', id, stateStoreSettings?.secondary_color, categoryKey, data, data?.category_id == categoryKey)
        
        if(data?.category_id){
            setCategoryKey(data?.category_id)
        }

    }, [router.query])

    return (
        <>
            {/* Web View */}
            <div className='hidden lg:flex flex-col md:block -ml-4 '>
                <div className='flex '>
                    <p id={id} className={`${categoryKey == id && data?.category_id == categoryKey ? 'font-montMedium' : 'font-montMedium'} cursor-pointer`} style={categoryKey == id && data?.category_id == categoryKey ? { color: stateStoreSettings ? stateStoreSettings?.secondary_color : 'black' } : { color: 'black' }} onClick={() => { handleCategory(id, name, subCategories) }} onMouseEnter={() => {
                        if (subCategories.length != 0) {
                            // handleCategory(id, name, subCategories)
                            setCategoryKey(id)
                            setCloseSubCategory(true)
                        }
                    }}

                    >{name}</p>
                    <div className='-mt-1 px-2'>
                        <CaretDownOutlined style={categoryKey == id && data?.category_id == categoryKey ? { color: stateStoreSettings ? stateStoreSettings?.secondary_color : 'black' } : { color: 'black' }} />
                    </div>





                </div>
                {closeSubCategory ?
                    <div className='absolute bg-white bg-opacity-40 backdrop-blur-lg   border-blue-100 shadow mt-8 px-5' onMouseLeave={() => {
                        if (subCategories.length != 0) {
                            // handleCategory(id, name, subCategories)
                            setCloseSubCategory(false)
                        }
                    }}>
                        {categoryKey == id && subCategories?.map(item =>
                            <p className='cursor-pointer pl-5' style={data?.sub_category_id == item.sub_category_id ? { color: stateStoreSettings ? stateStoreSettings?.secondary_color : 'black' } : { color: 'black' }} onClick={() => { handleSubCategory(item.category_id, item.sub_category_id, item.sub_category_name) }} key={item.sub_category_id}    >{item.sub_category_name}</p>
                        )}
                    </div>
                    : ''}


            </div>

            <div>

            </div>

            {/* Mobile View */}
            {/* <div className='lg:hidden md:hidden flex flex-col'> */}
            {/* <div className={`flex flex-col  whitespace-nowrap overflow-scroll `}
                    style={data.category_id == id ? { borderBottom: `2px solid ${stateStoreSettings ? stateStoreSettings.secondary_color : 'black'}` } : { border: 'none' }}> */}
            <p className={`lg:hidden flex flex-col pb-2 px-4 border-white border-b-2 text-lg ${categoryKey == id && data?.category_id == categoryKey ? 'font-montSemiBold' : 'font-montMedium '} `} onClick={() => { handleCategory(id, name, subCategories) }}>{name}</p>
            {/* </div> */}
            {/* </div> */}

            <div className='lg:hidden md:hidden absolute mt-28 ml-2' >
                {categoryKey == id && subCategories?.map(item =>
                    <p className='cursor-pointer text-lg font-semibold border ' style={data.sub_category_id == item.sub_category_id ? { color: `${stateStoreSettings ? stateStoreSettings.secondary_color : 'black'}` } : { color: 'black' }} onClick={() => { handleSubCategory(item.category_id, item.sub_category_id, item.sub_category_name) }} key={item.sub_category_id}>{item.sub_category_name}</p>
                )}
            </div>

        </>

    )
}

const mapStateToProps = (state) => ({
    stateStoreSettings: state.storeSettingsReducer?.data
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Category)