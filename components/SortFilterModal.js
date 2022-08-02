import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Slider, Tabs } from 'antd';
import Modal from 'react-modal';
import { AiOutlineClose } from "react-icons/ai";
import { BsFilterLeft } from 'react-icons/bs'
import { getFilterGroups } from '../actions';
import { useMediaQuery } from 'react-responsive';
import { BsArrowLeft } from 'react-icons/bs'
import Filter from './svgComponents/Filter';


const { TabPane } = Tabs;

export const SortFilterModal = ({ dispatchFilterGroups, storeId, filterAndSortPayload, setFilterAndSortPayload, sortOrder, setSortOrder, handleSortOrder, storeSettings, setLoading ,filterPayLoad, setFilterPayLoad,priceFilter, setPriceFilter}) => {

  const isTabletOrMobile = useMediaQuery({ query: ' (max-width: 992px)' })

 
  const [filtersGroup, setFiltersGroup] = useState({})
  const [filterArray, setFilterArray] = useState([])
 

  const [triggerFilter, setTriggerFilter] = useState('No')

  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [mobileSortOpen, setMobileSortOpen] = useState(false)
  const color = storeSettings?.data ? storeSettings.data.secondary_color.toLowerCase() : 'red-500'


  const customStyles = {
    overlay: { zIndex: 1000 },
    content: {
      width: '1000px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '0',
      zIndex: 100
    },
  };


  useEffect(() => {
    const payload = { storeId: 'az', setFiltersGroup }

    dispatchFilterGroups({ payload })
  }, [])


  const openMobileSort = () => {
    setMobileSortOpen(!mobileSortOpen)
  }

  console.log("filters group", filtersGroup, storeSettings.data.secondary_color.toLowerCase())

  const handleFilter = (groupid, value, e) => {

    var newFilterArray = []
    if (filterArray.length != 0) {
      const indexOfObject = filterArray.findIndex(object => {
        return object[groupid] == value;
      });
      console.log("index of value", indexOfObject)
      if (indexOfObject != -1) {
        filterArray.splice(indexOfObject, 1);
        console.log("filter Array after Splice", filterArray)
        newFilterArray = [...filterArray]
        setFilterArray(newFilterArray)
      }
      else {
        newFilterArray = [...filterArray, { [groupid]: value }]
        setFilterArray(newFilterArray)
      }
    }
    else {
      newFilterArray = [...filterArray, { [groupid]: value }]
      setFilterArray(newFilterArray)
    }

  }

  const filtergroupBy = (arr, key) => {
    const result = arr.reduce((h, obj) => Object.assign(h, { [Object.keys(obj)]: (h[Object.keys(obj)] || []).concat(Number(Object.values(obj))) }), {})
    return result
  }

  useEffect(() => {
    const filterAfterGroupby = filtergroupBy(filterArray)
    console.log("filter after groupby", filterAfterGroupby)
    setFilterPayLoad({ ...filterAfterGroupby })

  }, [filterArray])

  const priceSliderhandler = (value) => {
    console.log(value)
    setPriceFilter({ max_price: value[1], min_price: value[0] })
  }



  const handleFilterAndSort = () => {
    // console.log(priceFilter)
    setLoading(true)
    console.log('pricefilter', filterPayLoad,
      priceFilter)
    setFilterAndSortPayload({ filter_groups: filterPayLoad, priceRange: priceFilter })

    setFilterModalVisible(false)
  }


  useEffect(() => {
    const head = document.getElementById('style')
    const style = (` <style>

    .ant-tabs-nav .ant-tabs-tab-active {
        border: 3px solid ${storeSettings?.data ? storeSettings.data.secondary_color : 'black'} !important;
        border-radius:8px !important;
        background-color: white !important;
      }
           
          }
        </style>`)
    head.innerHTML = style

  }, [])

  console.log('sortOrder', sortOrder, filterAndSortPayload)


  return (
    <div>

      {
        isTabletOrMobile ? 
        <div className="flex   cursor-pointer " onClick={openMobileSort}>
          {/* <BsFilterLeft size={20} className='' /> */}
          <p className="flex items-center font-montSemiBold border border-slate-300 px-2 rounded p-2 -mt-3"> 
          <Filter secondaryColor={storeSettings?.data ? storeSettings.data.secondary_color.toLowerCase() : 'red'}/>
         <span className='px-2'> 
          Sort  |  Filter
           {/* {sortOrder != 'false' ? <img src="/images/dot.png" height={2} width={2} /> : ''} */}
           </span></p>
        </div>
          : <div className="flex font-bold cursor-pointer" onClick={() => setFilterModalVisible(true)}>
            {/* <BsFilterLeft size={20} className='' /> */}
            {/* <p className="flex items-center "> Sort By  {sortOrder != 'false' ? <img src="/images/dot.png" height={8} width={8} /> : ''}</p> */}
          </div>
      }

      <>
        {/* <Modal
          isOpen={filterModalVisible}
          // onAfterOpen={afterOpenModal}
          onRequestClose={() => setFilterModalVisible(false)}
          style={customStyles}
        > */}
        <div className='mt-12 hidden lg:block'>
          {/* <div className='flex justify-between pt-4 px-4'>

            <h2 className='text-2xl flex '><img src="/filter.svg" className='pr-4' />Filter / Sort  </h2>
            <p className='cursor-pointer text-xl font-thin' onClick={() => setFilterModalVisible(false)}><AiOutlineClose /></p>
          </div>
          <div className="pt-4">
            <div className="w-full border-t border-gray-400"></div>
          </div> */}
          <div>
            <div  type="card" size="large" tabBarGutter='0' className='h-[40vh]'>
              <div  key="sort" className='h-[40vh] overflow-hidden overflow-y-scroll ' >
                <p className='font-montSemiBold text-lg'>Sort By</p>
                <div className='mt-2'>
                  <input checked={sortOrder == "false" ? true : false} style={{ accentColor: storeSettings?.data ? storeSettings.data.secondary_color.toLowerCase() : 'pink-500' }} onClick={handleSortOrder} id='rel' type="radio" name='sort' value="false" />
                  <label className='text-[18px] ml-2' htmlFor="rel">Relevance</label>
                </div>
                <div className='mt-2'>
                  <input checked={sortOrder == "DESC" ? true : false} style={{ accentColor: storeSettings?.data ? storeSettings.data.secondary_color.toLowerCase() : 'pink-500' }} onClick={handleSortOrder} id='htl' type="radio" name='sort' value="DESC" />
                  <label className='text-[18px] ml-2' htmlFor="htl">Price (High to Low)</label>
                </div>
                <div className='mt-2'>
                  <input checked={sortOrder == "ASC" ? true : false} style={{ accentColor: storeSettings?.data ? storeSettings.data.secondary_color.toLowerCase() : 'pink-500' }} onClick={handleSortOrder} id='lth' type="radio" name='sort' value="ASC" />
                  <label className='text-[18px] ml-2' htmlFor="lth">Price (Low to High)</label>
                </div>
              </div>
              {
                Object.keys(filtersGroup).map(function (groupid) {
                  if (groupid != 'priceRange') {
                    return (<div tab={
                      <>
                        <p className='text-left'>{filtersGroup[groupid].filter_group_name}</p>
                        {filterPayLoad[groupid]?.length && <p className='text-[12px] text-left btn-color-revers'>{filterPayLoad[groupid]?.length} items selected</p>}
                      </>

                    }
                      key={groupid} className='h-[40vh] overflow-hidden overflow-y-scroll' >
                      {
                        Object.keys(filtersGroup[groupid].filter_group_values).map(function (value) {
                          return (
                            // <input type="radio" id="css" name="fav_language" value="CSS"></input>
                            // <p>{filtersGroup[groupid].filter_group_values[value].filter_value_name}</p>
                            // checked={filterArray.length&&filterArray.map(function(item){
                            //   if(Object.keys(item)[0]==groupid && Object.values(item)[0]==value){
                            //     console.log(Object.values(item)[0])
                            //     // return true
                            //     // // console.log(value,e.target.value)
                            //     // document.getElementById(value).checked=true
                            //     // console.log(document.getElementById(value))
                            //   }
                            //   else{
                            //     return false
                            //   }
                            // })}
                            <div className='mt-2' key={value}>

                              {/* // Object.keys(filterPayLoad).length&&filterPayLoad[groupid]?.includes(value)?
                                    // <input checked={true} type="checkbox" id={value} name={groupid} value={value} onClick={(e) => handleFilter(groupid, value, e)} /> */}

                              <input style={{ accentColor: storeSettings?.data ? storeSettings.data.secondary_color.toLowerCase() : 'pink-500' }} checked={filterPayLoad[groupid]?.includes(1 * value) ? true : false} type="checkbox" id={value} name={groupid} value={value} onClick={(e) => handleFilter(groupid, value, e)} />

                              <label className='text-[18px] ml-2' htmlFor={value}>{filtersGroup[groupid].filter_group_values[value].filter_value_name}</label>
                            </div>
                          )
                        })
                      }
                    </div>)
                  }
                  else if (groupid == 'priceRange') {
                    return (
                      <TabPane tab={`${groupid}`} key={groupid} className='h-[40vh] overflow-hidden overflow-y-scroll' >
                        <p className='text-xl text-center mt-14 mb-4'>Select the Price Range</p>
                        <div className='px-10'>

                          <Slider trackStyle={{ height: '10px' }} handleStyle={{ height: '20px', width: "20px" }} marks={{
                            [Number(filtersGroup[groupid]?.min_value)]: `${Number(filtersGroup[groupid]?.min_value)}`,
                            [Number(filtersGroup[groupid]?.max_value)]: `${Number(filtersGroup[groupid]?.max_value)}`,
                          }
                          } onAfterChange={priceSliderhandler} range max={Number(filtersGroup[groupid].max_value)} min={Number(filtersGroup[groupid].min_value)} defaultValue={[Number(filtersGroup[groupid].min_value), Number(filtersGroup[groupid].max_value)]} />
                        </div>
                      </TabPane>
                    )
                  }
                })
              }

            </div>
          </div>
          {/* <div className='absolute right-0 bottom-0 gap-6 pb-9 sort-btn'>
            <p onClick={() => setFilterModalVisible(false)} className='text-base px-5 py-2 btn-color-revese cursor-pointer inline' >Cancel</p>
            <p onClick={handleFilterAndSort} className='btn-bg text-white text-base mr-10 px-5 py-2 rounded cursor-pointer inline' style={{ backgroundColor: storeSettings?.data ? storeSettings.data.secondary_color : 'black' }}>Apply</p>
          </div> */}
        </div>

        {/* </Modal> */}
      </>





      {/* for mobile view */}



      <>{
        mobileSortOpen &&
        <div className='lg:hidden md:hidden bg-white fixed h-[91vh] w-full  left-0 top-0 z-[20000] overflow-y-scroll'>

          <h3 className='pt-5 pb-5 nav-bg' onClick={openMobileSort}><BsArrowLeft className={`mx-2 inline`} size={20} />Sort by</h3>
          <div className='mt-3 flex flex-wrap px-2 radio-custom'>

            <input checked={sortOrder == "false" ? true : false} onClick={handleSortOrder} className='hidden ' type="radio" id='Popularity' name="sort" value="false" />
            <label className='px-2 py-2 btn-bg rounded text-black mr-1 my-2 border' style={{ background: sortOrder == 'false' ? storeSettings?.data ? storeSettings.data.secondary_color : 'white' : 'white', color: sortOrder == 'false' ? 'white' : 'black' }} htmlFor="Popularity">Relevance</label>
            <input checked={sortOrder == "DESC" ? true : false} onClick={handleSortOrder} className='hidden' type="radio" id='High' name="sort" value="DESC" />
            <label className='px-2 py-2 btn-bg rounded text-black mr-1 my-2 border' style={{ background: sortOrder == 'DESC' ? storeSettings?.data ? storeSettings.data.secondary_color : 'white' : 'white', color: sortOrder == 'DESC' ? 'white' : 'black' }} htmlFor="High">Price (High to Low)</label>

            <input checked={sortOrder == "ASC" ? true : false} onClick={handleSortOrder} className='hidden ' type="radio" id='Low' name="sort" value="ASC" />
            <label className='px-2 py-2 btn-bg rounded text-black mr-1 my-2 border' style={{ background: sortOrder == 'ASC' ? storeSettings?.data ? storeSettings.data.secondary_color : 'white' : 'white', color: sortOrder == 'ASC' ? 'white' : 'black' }} htmlFor="Low">Price (Low to High)</label>
          </div>
          {Object.keys(filtersGroup).length != 0 && <h3 className='p-5 nav-bg'>Filter</h3>}
          <div>
            <Tabs tabPosition='left' type="card" size="large" tabBarGutter='0' className='mobile-tab max-h-full overflow-hidden overflow-y-scroll'>
              {
                Object.keys(filtersGroup).map(function (groupid) {
                  if (groupid != 'priceRange') {
                    return (<TabPane tab={
                      <>
                        <p className='text-left'>{filtersGroup[groupid].filter_group_name}</p>
                        {filterPayLoad[groupid]?.length && <p className='text-[10px] text-left btn-color-revers'>{filterPayLoad[groupid]?.length} items selected</p>}
                      </>
                    } key={groupid}>
                      {
                        Object.keys(filtersGroup[groupid].filter_group_values).map(function (value) {
                          return (
                            // <input type="radio" id="css" name="fav_language" value="CSS"></input>
                            // <p>{filtersGroup[groupid].filter_group_values[value].filter_value_name}</p>
                            <div className='mt-2' key={value}>
                              <input checked={filterPayLoad[groupid]?.includes(1 * value) ? true : false} type="checkbox" id={value} value={value} onClick={() => handleFilter(groupid, value)} />
                              <label className='text-[18px] ml-2' htmlFor={value}>{filtersGroup[groupid].filter_group_values[value].filter_value_name}</label>
                            </div>
                          )
                        })
                      }
                    </TabPane>)
                  }
                  else if (groupid == 'priceRange') {
                    return (
                      <TabPane tab={`${groupid}`} key={groupid} >
                        <p className='text-[18px] text-center mt-14 mb-4'>Select the Price Range</p>
                        <div className='px-2'>
                          <Slider trackStyle={{ height: '10px' }} handleStyle={{ height: '20px', width: "20px" }} marks={{
                            [Number(filtersGroup[groupid].min_value)]: `${Number(filtersGroup[groupid].min_value)}`,
                            [Number(filtersGroup[groupid].max_value)]: `${Number(filtersGroup[groupid].max_value)}`,
                          }
                          } onChange={priceSliderhandler} range max={Number(filtersGroup[groupid].max_value)} min={Number(filtersGroup[groupid].min_value)} defaultValue={[Object.values(priceFilter).length ? Object.values(priceFilter)[1] : Number(filtersGroup[groupid].min_value), Object.values(priceFilter).length ? Object.values(priceFilter)[0] : Number(filtersGroup[groupid].max_value)]} />
                        </div>
                      </TabPane>
                    )
                  }
                })
              }

            </Tabs>
          </div>
          <div className='max-h-[100vh] h-1 w-1 mobile-sort-div '>
            <div className='flex justify-end gap-6 pb-5 fixed bottom-0 right-0 bg-white left-0 shadow-[0_20px_10px_15px_rgba(0,0,0,0.6)] pt-5'>
              <p onClick={openMobileSort} className='text-base px-5 py-2 btn-color-revese'>Cancel</p>
              <p onClick={() => { handleFilterAndSort(), openMobileSort() }} style={{ backgroundColor: storeSettings ? storeSettings?.data.secondary_color : 'red' }} className='btn-bg text-white text-base mr-10 px-5 py-2 rounded'>Apply</p>
            </div>
          </div>
        </div>
      }
      </>


      {/* <>{
        mobileSortOpen && <div className='lg:hidden md:hidden bg-white fixed h-[91vh] w-full  left-0 top-0 z-[1000] overflow-y-scroll'>

          <h3 className='pt-5 pb-5 bg-[#E5E5E5]' onClick={openMobileSort}><BsArrowLeft className={`mx-2 inline`} size={20} />Sort by</h3>
          <div className='mt-3 flex flex-wrap px-2 radio-custom'>

            <input checked={sortOrder == "false" ? true : false} onClick={handleSortOrder} className='hidden ' type="radio" id='Popularity' name="sort" value="false" />
            <label className='px-2 py-2 btn-bg rounded text-black mr-1 my-2 border' htmlFor="Popularity">Relevance</label>

            <input checked={sortOrder == "DESC" ? true : false} onClick={handleSortOrder} className='hidden' type="radio" id='High' name="sort" value="DESC" />
            <label className='px-2 py-2 btn-bg rounded text-black mr-1 my-2 border' htmlFor="High">Price (High to Low)</label>

            <input checked={sortOrder == "ASC" ? true : false} onClick={handleSortOrder} className='hidden ' type="radio" id='Low' name="sort" value="ASC" />
            <label className='px-2 py-2 btn-bg rounded text-black mr-1 my-2 border' htmlFor="Low">Price (Low to High)</label>
          </div>
          <h3 className='p-5 bg-[#E5E5E5]'>Filter</h3>
          <div>
            <Tabs tabPosition='left' type="card" size="large" tabBarGutter='0' className='mobile-tab max-h-full overflow-hidden overflow-y-scroll'>
              {
                Object.keys(filtersGroup).map(function (groupid) {
                  if (groupid != 'priceRange') {
                    return (<TabPane tab={

                      <>
                      <p className='text-left'>{filtersGroup[groupid].filter_group_name}</p>
                      {filterPayLoad[groupid]?.length && <p className='text-[12px] text-left btn-color-revers'>{filterPayLoad[groupid]?.length} items selected</p>}
                    </>

                    } key={groupid}>
                      {
                        Object.keys(filtersGroup[groupid].filter_group_values).map(function (value) {
                          return (
                            // <input type="radio" id="css" name="fav_language" value="CSS"></input>
                            // <p>{filtersGroup[groupid].filter_group_values[value].filter_value_name}</p>
                            <div className='mt-2' key={value}>
                              <input type="checkbox" className={`accent-red-500`} id={value} value={value} onClick={() => handleFilter(groupid, value)} />
                              <label className='text-[18px] ml-2' htmlFor={value}>{filtersGroup[groupid].filter_group_values[value].filter_value_name}</label>
                            </div>
                          )
                        })
                      }
                    </TabPane>)
                  }
                  else if (groupid == 'priceRange') {
                    return (
                      <TabPane tab={`${groupid}`} key={groupid} >
                        <p className='text-[18px] text-center mt-14 mb-4'>Select the Price Range</p>
                        <div className='px-2'>
                          <Slider trackStyle={{ height: '10px' }} handleStyle={{ height: '20px', width: "20px" }} marks={{
                            [Number(filtersGroup[groupid].min_value)]: `${Number(filtersGroup[groupid].min_value)}`,
                            [Number(filtersGroup[groupid].max_value)]: `${Number(filtersGroup[groupid].max_value)}`,
                          }
                          } onChange={priceSliderhandler} range max={Number(filtersGroup[groupid].max_value)} min={Number(filtersGroup[groupid].min_value)} defaultValue={[Number(filtersGroup[groupid].min_value), Number(filtersGroup[groupid].max_value)]} />
                        </div>
                      </TabPane>
                    )
                  }
                })
              }

            </Tabs>
          </div>
          <div className='max-h-[100vh] h-1 w-1 mobile-sort-div'>
            <div className='flex justify-end gap-6 pb-5 fixed  right-0 bg-white left-0 shadow-[0_20px_10px_15px_rgba(0,0,0,0.6)] pt-5'>
              <p onClick={openMobileSort} className='text-base px-5  btn-color-revese '>Cancel</p>
              <p onClick={() => { handleFilterAndSort(), openMobileSort() }} className='btn-bg text-black text-base mr-10 px-5 rounded'>Apply</p>
            </div>
          </div>
        </div>
      }
      </> */}



    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => {
  return {
    dispatchFilterGroups: (payload) => dispatch(getFilterGroups(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortFilterModal)