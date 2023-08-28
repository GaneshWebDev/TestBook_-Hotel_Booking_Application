import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import Loading from './loading';
function BookingDiv({bookId,fromDate,toDate,amount,status}){
  const [loading,setLoading]=useState(false);
  function cancelBooking(){
    axios.get(`/cancelBooking/${bookId}`)
    .then(response => {
      setLoading(true);
      console.log(response.data);
      setLoading(false);
      window.location.href='/home';
    })
    .catch(error => {
      setLoading(false);
      console.error('Error fetching data:', error);
    });
  }
  if(loading){
    return(<Loading/>);
  }
    return(
        <div className="user-booking ms-4 me-4">
          <p className="booking-id">Booking ID: {bookId}</p>
          <div className="booking-info">
            <p><strong>Check-in : </strong> {moment(fromDate).format('DD-MM-YYYY')}</p>
            <p><strong>Check-out : </strong> {moment(toDate).format('DD-MM-YYYY')}</p>
            <p><strong>Amount : </strong> {amount}</p>
            <p className="status"><strong>Status :</strong>{status}</p>
            <p><button type="button" className="btn btn-danger" onClick={cancelBooking}>Cancel</button></p>
          </div>
        </div>
    )
}
export default BookingDiv;