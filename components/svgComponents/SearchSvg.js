import React from 'react'

function SearchSvg({navbarColor,mobile}) {
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="23.207" height={mobile?"27.0":"17.207"} viewBox="0 0 23.207 23.207">
                <g id="Icon_feather-search" data-name="Icon feather-search" transform="translate(-2.625 -2.625)">
                    <path id="Path_7" data-name="Path 7" d="M23.042,13.083a9.958,9.958,0,1,1-9.958-9.958A9.958,9.958,0,0,1,23.042,13.083Z" transform="translate(0 0)" fill="none" stroke={mobile?'#fff':navbarColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
                    <path id="Path_8" data-name="Path 8" d="M21.875,21.875l-4.531-4.531" transform="translate(3.25 3.25)" fill={navbarColor} stroke={mobile?'#fff':navbarColor} strokeLineCap="round" strokeLineJoin="round" strokeWidth="1" />
                </g>
            </svg>
        </div>
    )
}

export default SearchSvg