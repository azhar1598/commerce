import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react'

function CustomBreadcrumb({tab}) {

  return(
    
          <Breadcrumb>
              <Breadcrumb.Item href="">
                  <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item href="">     
                  <span className='bg-red-700'>{tab}</span>
              </Breadcrumb.Item>
              
          </Breadcrumb>
        
  )
}

export default Breadcrumb