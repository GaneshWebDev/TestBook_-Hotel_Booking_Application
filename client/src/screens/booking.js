import {useState,useEffect} from 'react';
import Loading from '../components/loading';
import StripeCheckout from 'react-stripe-checkout';
import swal from 'sweetalert2';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import Error from '../components/error';
import axios from 'axios';
function Booking(){
    const { roomid,fromDate,toDate,days } = useParams();
    const [total,setTotal]=useState(0);
    console.log(typeof(fromDate));
    const [room,setRoom]=useState();
    const [loading,setloading]=useState(true);
    const [error,setError]=useState(false);
    function onToken(token) {
        console.log(token);
          const bookingDetails={
            room,
            roomid,
            userid:JSON.parse(localStorage.getItem('user'))._id,
            fromDate,
            toDate,
            total,
            days,
            token
         }
       axios.post('/bookroom',bookingDetails).then(
         response=>{
             if(response.status==201){
                setloading(true);
                 console.log('success',response.data);
                 setloading(false);
                 swal.fire('congratulations','Your Room Booked Successfully','Success').then(result=>{
                  window.location.href = "/home";
                 });
                 
             }
             console.log(response.status);
         }
     ).catch(err=>{
         swal.fire('oops...','something when wrong','error');
         console.log(err);
     });
    }
    useEffect(() => {
        axios.get(`/api/roomsGetRoomById/${roomid}`)
          .then(response => {
            setRoom(response.data);
            console.log(response.data);
            setTotal(days*response.data.rentPerDay)
            setloading(false);
          })
          .catch(error => {
            setError(true);
            setloading(false);
            console.error('Error fetching data:', error);
          });
      }, [roomid]);
      if(loading){
        return(<Loading/>);
      }else if(error){
        return(<Error/>)
      }return(
          <>
            <div className="container border booking ">
                          <div className="row row align-items-center">
                          <div className="col col-lg-5 col-sm-8 p-4">
                              <h3 className='mb-2'>{room.name}</h3>
                              <img src={room.imageUrls[0]} alt='sorry'/>
                          </div>
                          <div className="col col-lg-7 p-4 col-sm-8 text-end">
                              <h2>Booking Details</h2>
                              <div className='row border-top'>
                                  <p><span className='fw-bold'>Name: </span><span>{JSON.parse(localStorage.getItem('user')).name}</span></p>
                                  <p><span className='fw-bold'>From Date: </span><span>{moment(fromDate).format('DD-MM-YYYY')}</span></p>
                                  <p><span className='fw-bold'>To Date: </span><span>{moment(toDate).format('DD-MM-YYYY')}</span></p>
                                  <p><span className='fw-bold'>Max Count: </span><span>{room.maxCount}</span></p>
                              </div>
                              <h2>Amount</h2>
                              <div className='row border-top'>
                                  <p><span>Total Days: </span><span className='fw-bold'>{days}</span></p>
                                  <p><span>Rent Per Day: </span><span className='fw-bold'>{room.rentPerDay}</span></p>
                                  <h5>Total Amount: {total}/-</h5>
                                  <StripeCheckout token={onToken} currency='INR' amount={total*100} stripeKey="pk_test_51NjLFYSGij6lMcouqOKfhrZFaR5SosykbHE2qgXzhvr1x3evaqrkYkL8FXuFEs8EWdJ93YrIcI2WwsWgEgLO0NsD00d5IkByUe">
                                  <Button >Pay Now</Button>
                                  </StripeCheckout>
                              </div>
                          </div>
                       </div>
          </div>
        </>
      )
}
export default Booking;