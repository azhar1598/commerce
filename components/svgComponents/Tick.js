import React from 'react'

function Tick({ navbarColor, secondaryColor }) {
    return (
        <div>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="23.207" height={mobile?"27.0":"17.207"} viewBox="0 0 23.207 23.207">
                <g id="Icon_feather-search" data-name="Icon feather-search" transform="translate(-2.625 -2.625)">
                    <path id="Path_7" data-name="Path 7" d="M23.042,13.083a9.958,9.958,0,1,1-9.958-9.958A9.958,9.958,0,0,1,23.042,13.083Z" transform="translate(0 0)" fill="none" stroke={mobile?'#fff':navbarColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                    <path id="Path_8" data-name="Path 8" d="M21.875,21.875l-4.531-4.531" transform="translate(3.25 3.25)" fill={navbarColor} stroke={mobile?'#fff':navbarColor} strokeLineCap="round" strokeLineJoin="round" strokeWidth="1" />
                </g>
            </svg> */}

            <svg xmlns="http://www.w3.org/2000/svg" width="33.624" height="33.041" viewBox="0 0 33.624 33.041">
                <g id="Icon_feather-check-circle" data-name="Icon feather-check-circle" transform="translate(-1.497 -1.473)">
                    <path id="Path_4648" data-name="Path 4648" d="M33,16.62V18A15,15,0,1,1,24.105,4.29" fill="none" stroke={secondaryColor}stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                    <path id="Path_4649" data-name="Path 4649" d="M33,6,18,21.015l-4.5-4.5" fill="none" stroke={secondaryColor} stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                </g>
            </svg>



        </div>
    )
}

export default Tick