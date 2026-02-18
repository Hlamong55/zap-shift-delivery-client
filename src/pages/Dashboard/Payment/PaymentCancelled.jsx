import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div className='space-y-3 flex flex-col items-center mt-10'>
            <h2 className="text-4xl">Payment is Cancelled. Please Try Again</h2>
            <h3 className="text-4xl ">Thank You!</h3>
            <Link to='/dashboard/my-parcels'>
                <button className='btn btn-primary text-black font-bold hover:text-red-600'>Try Again</button>
            </Link>
        </div>
    );
};

export default PaymentCancelled;