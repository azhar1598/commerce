import React from 'react'

function Grid({navbarColor,secondaryColor,mobile,grid}) {
    return (
    
        <svg xmlns="http://www.w3.org/2000/svg" width="18.413" height="18.898"  viewBox="0 0 27 27">
      <path id="Icon_ionic-md-grid" data-name="Icon ionic-md-grid" d="M28.8,4.5H7.2A2.71,2.71,0,0,0,4.5,7.2V28.8a2.71,2.71,0,0,0,2.7,2.7H28.8a2.71,2.71,0,0,0,2.7-2.7V7.2A2.71,2.71,0,0,0,28.8,4.5ZM12.6,28.8H7.2V23.4h5.4Zm0-8.1H7.2V15.3h5.4Zm0-8.1H7.2V7.2h5.4Zm8.1,16.2H15.3V23.4h5.4Zm0-8.1H15.3V15.3h5.4Zm0-8.1H15.3V7.2h5.4Zm8.1,16.2H23.4V23.4h5.4Zm0-8.1H23.4V15.3h5.4Zm0-8.1H23.4V7.2h5.4Z" transform="translate(-4.5 -4.5)" fill={grid?secondaryColor:`rgba(0,0,0,0.5)`}/>
     </svg>
       
    )
}

export default Grid