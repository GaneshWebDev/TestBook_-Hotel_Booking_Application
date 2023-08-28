import React,{useState,useEffect} from 'react';
import { Tabs } from 'antd';
import Loading from '../components/loading';
import Error from '../components/error'
import BookingDiv from '../components/bookingDiv';
import axios from 'axios';
import { TabPane } from 'react-bootstrap';
function Profile(){
    const [loading,setloading]=useState(false);
    const [bookings,setBookings]=useState([]);
    const [error,setError]=useState(false);
    const user=JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        axios.get(`/bookingDetails/${user._id}`)
          .then(response => {
            setloading(true);
            console.log(response.data);
            setBookings(response.data);
            console.log(bookings);
            setloading(false);
          })
          .catch(error => {
            setError(true);
            setloading(false);
            console.error('Error fetching data:', error);
          });
      }, []);
    console.log(user);
    if(loading){
        <Loading/>
    }else if(error){
        <Error/>
    }
  return(
    <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key={1}>
            <h1>{user.name}</h1>
            <h2><span>Email : </span><span>{user.email}</span></h2>
            <h2><span>Admin Access : </span><span>{user.isAdmin?'YES':'NO'}</span></h2>
        </TabPane>
        <TabPane  tab="Bookings" key={2}>
            <>{loading ? (<Loading/>) : bookings.map((booked)=>{
                        return (<BookingDiv bookId={booked._id} fromDate={booked.fromDate} toDate={booked.toDate} amount={booked.total} status={booked.status}/>)})}</>
        </TabPane>
    </Tabs> 
  )

}
export default Profile;
