import React,{useEffect,useState} from 'react';
import { Tabs } from 'antd';
import { TabPane } from 'react-bootstrap';
import Loading from '../components/loading';
import Error from '../components/error';
import axios from 'axios';
import moment from 'moment';
function Admin(){
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false);
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem('user'));
        if(!user.isAdmin){
             window.location.href='/';
        }
    },[])
    if(loading){
        <Loading/>
    }else if(error){
        <Error/>
    }
    return(
        <>
        <h1>Admin Panel</h1>
    <Tabs defaultActiveKey="1">
        <TabPane tab="Booking" key={1}>
            <Bookings/>
        </TabPane>
        <TabPane  tab="Rooms" key={2}>
            <GetRooms/>
        </TabPane>
        <TabPane tab="Add Room" key={3}>
            <AddRooms/>
        </TabPane>
        <TabPane tab="Users" key={4}>
            <Users/>
        </TabPane>
    </Tabs>
    </>
    )
}
export default Admin;

export function Bookings(){
    const [loading,setLoading]=useState(true);
    const [bookings,setBookings]=useState(null);
    useEffect(() => {
        axios.get('/getAllBookingDetails')
          .then(response => {
            console.log(response.data)
            setBookings(response.data);
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
            console.error('Error fetching data:', error);
          });
      }, []);
    return(
        <>
        {loading ? (<Loading/>) :
    <table className="booking-table ">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr>
              <td>{booking._id}</td>
              <td>{moment(booking.fromDate).format('DD-MM-YYYY')}</td>
              <td>{moment(booking.toDate).format('DD-MM-YYYY')}</td>
              <td>{booking.total}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
            
        }
        </>
    )

}

export function Users(){
    const [loading,setLoading]=useState(true);
    const [users,setUsers]=useState(null);
    useEffect(() => {
        axios.get('/getAllUsersDetails')
          .then(response => {
            console.log(response.data)
            setUsers(response.data);
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
            console.error('Error fetching data:', error);
          });
      }, []);
    return(
        <>
        {loading ? (<Loading/>) :
    <table className="booking-table ">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Is Admin </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin?'Yes':'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
            
        }
        </>
    )

}
export function AddRooms(){
    const [loading,setLoading]=useState(true);
  const [formData, setFormData] = useState({
    name: '',
    maxCount: '',
    phoneNumber: '',
    rentPerDay: '',
    img1:'',
    img2:'',
    img3:'',
    type: '',
    description: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    axios.post('/roomData',formData)
    .then(response => {
      console.log(response.data)
      if(response.status==201){
        setLoading(false);
      }
    })
    .catch(error => {
      setLoading(false);
      console.error('Error fetching data:', error);
    });
    console.log('Form submitted:', formData);
  };

  return (
    <div className="room-form-container">
      <h2>Create New Room</h2>
      <form className="room-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="name"
          name="name"
          placeholder='Name'
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          id="maxCount"
          name="maxCount"
          value={formData.maxCount}
          onChange={handleChange}
          placeholder='Max Count'
          required
        />

        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder='Mobile Number'
          required
        />
        <input
          type="number"
          id="rentPerDay"
          name="rentPerDay"
          value={formData.rentPerDay}
          onChange={handleChange}
          placeholder='Rent Per Day'
          required
        />

         <input
          type="text"
          id="type"
          name="img1"
          value={formData.imageUrl1}
          onChange={handleChange}
          placeholder='Image One'
          required
        />
         <input
          type="text"
          id="type"
          name="img2"
          value={formData.imageUrl2}
          onChange={handleChange}
          placeholder='Image Two'
          required
        />
         <input
          type="text"
          id="type"
          name="img3"
          value={formData.imageUrl3}
          onChange={handleChange}
          placeholder='Image Three'
          required
        />
        
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder='Type'
          required
        />

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder='Description'
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export function GetRooms(){
    const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch room data from your backend API
    axios.get('/admin/rooms')
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        console.error('Error fetching room data:', error);
      });
  }, []);
  return(
    <div className="room-details-table">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Max Count</th>
          <th>Facilities</th>
          <th>Phone Number</th>
          <th>Rent Per Day</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map((room) => (
          <tr >
            <td>{room.name}</td>
            <td>{room.maxCount}</td>
            <td>{room.facilities.join(', ')}</td>
            <td>{room.phoneNumber}</td>
            <td>{room.rentPerDay}</td>
            <td>{room.type}</td>
            <td>{room.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}