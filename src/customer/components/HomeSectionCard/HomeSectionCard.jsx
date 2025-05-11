import React from 'react'

const HomeSectionCard = ({product}) => {

  const truncateText = (text) => {
    const maxLength = text.length;
    if(maxLength > 35){
      text = text.slice(0, 35) + "..."
    }
    return text;
  };

  return (
    <div className='cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[18rem] mx-3 border border-black'>

        <div className='h-[15rem] w-[100%]'>
            <img className='object-cover object-top w-full h-full' src={product.imageUrl} alt='' />
        </div>

        <div className='p-4'>
            <h3 className='text-lg font-medium text-gray-900'>{truncateText(product.brand)}</h3>
            <p className='mt-2 text-sm text-gray-600'>{truncateText(product.title)}</p>
        </div>
      
    </div>
  )
}

export default HomeSectionCard
