import React from 'react'
import { Grid } from "@mui/material";
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from "react-router-dom";

const OrderCard = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/account/order/${5}`)} className='p-5 shadow-lg hover:shadow-2xl border'>
      <Grid container spacing={2} sx={{justifyContent:"space-between"}}>
        <Grid item xs={6}>
            <div className='flex cursor-pointer'>
                <img className='w-[5rem] h-[5rem] object-cover object-top' src="https://rukminim1.flixcart.com/image/612/612/l0wrafk0/dress/l/2/o/3xl-m2s13003-peach-madame-original-imagchhhwbypcann.jpeg?q=70" />
                <div className='ml-5 space-y-2'>
                    <p>Women Asymmetric Pink Dress</p>
                    <p className='opacity-50 text-xs font-semibold'>Size: L</p>
                    <p className='opacity-50 text-xs font-semibold'>Color: Pink</p>
                </div>
            </div>
        </Grid>
        <Grid item xs={2}>
            <p>1299</p>
        </Grid>
        <Grid item xs={4}>
            {true && <p>
                <AdjustIcon sx={{width:"15px", height:"15px" }} className='text-green-600 mr-2 text-sm'/>
                <span>Delivered on April 21</span>
            </p>}
            {false && <p>
                <span>Expected Delivery on April 21</span>    
            </p>}
        </Grid>
      </Grid>
    </div>
  )
}

export default OrderCard
