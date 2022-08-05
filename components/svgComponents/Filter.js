import React from 'react'

function Filter({ navbarColor, secondaryColor, mobile, grid }) {
    return (

        <svg width="26" height="15" viewBox="0 0 26 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0.75" y1="3.46875" x2="24.5625" y2="3.46875" stroke="#B6B6B6" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="0.75" y1="11.9062" x2="24.5625" y2="11.9062" stroke="#B6B6B6" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="7.03125" cy="3.28125" r="2.53125" fill={secondaryColor} stroke={secondaryColor} strokeWidth="1.5" />
            <circle cx="20.1562" cy="11.7188" r="2.53125" fill={secondaryColor} stroke={secondaryColor} strokeWidth="1.5" />
        </svg>

    )
}

export default Filter