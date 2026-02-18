import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {

    const axiosSecure = useAxiosSecure();
    const [paymentInfo, setPaymentInfo] = useState({});
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    console.log(sessionId);


    useEffect(() => {
        let called = false;

        if(sessionId && !called) {
            called = true;
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res => {
                console.log(res.data);
                setPaymentInfo({
                    transactionId: res.data.transactionId,
                    trackingId: res.data.trackingId
                })
            })
        }
    }, [sessionId, axiosSecure])



    return (
        <div className='text-center space-y-3 mt-10'>
            <h2 className="text-4xl">Your Payment is Successful</h2>
            <h2 className="text-4xl">Thank You!</h2>
            <div className='text-xl mt-8 space-y-3'>
                <p>Your Transaction Id: <span className='font-semibold'>{paymentInfo?.transactionId}</span></p>
                <p>Your Parcel Tracking Id: <span className='font-semibold'>{paymentInfo.trackingId}</span></p>
            </div>
        </div>
    );
};

export default PaymentSuccess;