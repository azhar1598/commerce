import React, { useState } from 'react'

function Skeleton(props) {
    const [length, setLength] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8])


    return (
        <div>
            {!props.grid ?
                <div className='hidden p-2  lg:flex flex-col items-start w-full lg:w-[75vw] md:w-[75vw]  mb-24 '>
                    {length?.map((l, index) => {
                        return (
                            <div className="border border-blue-100 shadow rounded-md p-4   mx-auto  justify-between custom-style lg:min-w-[65vw] md:max-w-[80vw] lg:mt-12 lg:max-w-[5vw] md:min-w-[15vw] " key={index}>

                                <div class="animate-pulse flex space-x-4">
                                   
                                         <div className="rounded bg-slate-700 lg:h-56 w-[16vw] lg:ml-3 md:ml-7"></div>          
                                         <div class="flex-1 space-y-6 py-1">
                                        <div class="h-2 bg-slate-200 rounded"></div>
                                        <div class="space-y-3">
                                            <div class="grid grid-cols-3 gap-4">
                                                <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                                                <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                                            </div>
                                            <div class="grid grid-cols-3 gap-4">
                                                <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                                                <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                                            </div>
                                            <div class="h-2 bg-slate-200 rounded"></div>
                                        </div>
                                        <div class="space-y-3">
                                            <div class="grid grid-cols-3 gap-4">
                                                <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                                                <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                                            </div>
                                            <div class="grid grid-cols-3 gap-4">
                                                <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                                                <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                                            </div>
                                            <div class="h-2 bg-slate-200 rounded"></div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        )
                    })}

                </div>
                :

                <div className='hidden p-2  lg:flex flex-wrap items-start w-full lg:w-[75vw] md:w-[75vw]  mb-24 '>
                    {length?.map((l, index) => {
                        return (
                            <div className="border border-blue-100 shadow rounded-md p-4   mx-auto  justify-between custom-style lg:min-w-[20vw] md:max-w-[24vw] lg:mt-12 lg:max-w-[5vw] md:min-w-[15vw] " key={index}>
                                <div className="animate-pulse flex space-x-4">
                                    <div className="flex-1 space-y-6 py-5">
                                        <div className="rounded bg-slate-700 lg:h-56 w-[16vw] lg:ml-3 md:ml-7"></div>
                                        <div className="h-2 bg-slate-700 rounded"></div>
                                        <div className="space-y-3">
                                            <div Name="grid grid-cols-3 gap-4">
                                                <div className="h-2 bg-slate-700 rounded col-span-2 mb-2"></div>
                                                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                                            </div>
                                            <div className="h-2 bg-slate-700 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>


            }


            <div className=' p-2 lg:hidden md:hidden flex flex-wrap items-start w-full lg:w-[75vw] md:w-[75vw]  mb-24 '>
                {length?.map((l, index) => {
                    return (
                        <div className="border border-blue-100 shadow rounded-md p-4 mb-2 w-[45vw]    mx-auto  justify-between custom-style" key={index}>
                            <div className="animate-pulse flex space-x-8">
                                <div className="flex-1 space-y-6 py-2">
                                    <div className="rounded bg-slate-700 lg:h-56 w-[35vw] h-24 lg:ml-3 md:ml-7"></div>

                                    <div className="space-y-1">
                                        <div Name="grid grid-cols-3 gap-4">
                                            <div className="h-2 bg-slate-700 rounded col-span-2 mb-2"></div>

                                        </div>
                                        <div className="h-2 bg-slate-700 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>


        </div>
    )
}

export default Skeleton