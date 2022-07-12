import React, { useEffect, useState } from 'react'
import { getSimilarItems } from '../services/apiServices'

function SimilarItems({ itemId }) {

    const data = [
        'https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0/1519855918965?e=2147483647&v=beta&t=J3kUMZwIphc90TFKH5oOO9Sa9K59fimgJf-s_okU3zs',
        'https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0/1519855918965?e=2147483647&v=beta&t=J3kUMZwIphc90TFKH5oOO9Sa9K59fimgJf-s_okU3zs',
        'https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0/1519855918965?e=2147483647&v=beta&t=J3kUMZwIphc90TFKH5oOO9Sa9K59fimgJf-s_okU3zs',
        'https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0/1519855918965?e=2147483647&v=beta&t=J3kUMZwIphc90TFKH5oOO9Sa9K59fimgJf-s_okU3zs',
        'https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0/1519855918965?e=2147483647&v=beta&t=J3kUMZwIphc90TFKH5oOO9Sa9K59fimgJf-s_okU3zs',
        'https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0/1519855918965?e=2147483647&v=beta&t=J3kUMZwIphc90TFKH5oOO9Sa9K59fimgJf-s_okU3zs',
        'https://media-exp1.licdn.com/dms/image/C560BAQHMnA03XDdf3w/company-logo_200_200/0/1519855918965?e=2147483647&v=beta&t=J3kUMZwIphc90TFKH5oOO9Sa9K59fimgJf-s_okU3zs',
    ]


    const [similarItems, setSimilarItems] = useState(data)

    useEffect(() => {

        const getData = async () => {
            // const response = await getSimilarItems(itemId)
            // setSimilarItems(response.data)

        }
        getData()

    }, [itemId])

    return (
        <>
            {
                similarItems.length != 0 ?
                    <div className='flex flex-col  justify-between mt-12 w-full lg:mb-0 md:mb-0 mb-44'>
                        <p className='font-montSemiBold  pl-4 '>Similar Products</p>
                        <div className='flex flex-col lg:flex-row md:flex-row flex-wrap items-center bg-yellow-300 '>
                            {similarItems.map((product, index) =>
                                <div className='flex flex-col items-start lg:ml-4 md:ml-4 ' key={index}>
                                    <img src={product} className='lg:w-48 md:h-[25vw]' />
                                    <p className=' text-[#212B36] font-montSemiBold mt-3'></p>
                                    <p className=''></p>
                                </div>
                            )}
                        </div>
                    </div> : ''
            }</>
    )
}

export default SimilarItems