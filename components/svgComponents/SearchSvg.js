import React from 'react'

function SearchSvg({navbarColor,mobile}) {
    return (
        <div>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="23.207" height={mobile?"27.0":"17.207"} viewBox="0 0 23.207 23.207">
                <g id="Icon_feather-search" data-name="Icon feather-search" transform="translate(-2.625 -2.625)">
                    <path id="Path_7" data-name="Path 7" d="M23.042,13.083a9.958,9.958,0,1,1-9.958-9.958A9.958,9.958,0,0,1,23.042,13.083Z" transform="translate(0 0)" fill="none" stroke={mobile?'#fff':navbarColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                    <path id="Path_8" data-name="Path 8" d="M21.875,21.875l-4.531-4.531" transform="translate(3.25 3.25)" fill={navbarColor} stroke={mobile?'#fff':navbarColor} strokeLineCap="round" strokeLineJoin="round" strokeWidth="1" />
                </g>
            </svg> */}

<svg xmlns="http://www.w3.org/2000/svg" width="23.207" height={mobile?"27.0":"17.207"} viewBox="0 0 28.491 29.06">
  <g id="Group_1758" data-name="Group 1758" transform="translate(-1454.556 -45.497)">
    <path id="Path_4" dataName="Path 4" d="M25.331,14.916A10.416,10.416,0,1,1,14.916,4.5,10.416,10.416,0,0,1,25.331,14.916Z" transform="translate(1452.056 42.997)" fill="none" stroke={mobile?'#fff':navbarColor} strokeLinecap="round" strokeLinejoin="round" stroke-width="4"/>
    <path id="Path_5" data-name="Path 5" d="M30.637,30.729l-5.662-5.754" transform="translate(1449.581 41)" fill={navbarColor} stroke={mobile?'#fff':navbarColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"/>
  </g>
</svg>


        </div>
    )
}

export default SearchSvg