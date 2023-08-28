import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { differenceInDays } from 'date-fns';
import Loading from '../components/loading';
import Error from '../components/error';
import Rooms from '../components/rooms';
import { DatePicker } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design CSS
function HomePage() {
  const [rooms, setRooms] = useState([]);
  const [loading,setloading]=useState(true);
  const [error,setError]=useState(false);
  const [fromDate,setFromDate]=useState('');
  const [toDate,setToDate]=useState('');
  const [days,setDays]=useState(0);
  const [searchKey,setSearchKey]=useState();
  const [duplicateRooms,setDuplicateRooms]=useState([]);
  const [type,setType]=useState('All');
  const [selectedRange, setSelectedRange] = useState([null, null]);

  /*const handleDateChange = (dates) => {
      setSelectedRange(dates);
  };*/
  const filterByDate=(dates)=>{
    setSelectedRange(dates);
    if(dates){
      console.log('filter',dates);
      let tempRooms=[];
      var availability=false;
      for(const room of duplicateRooms){
        if(room.currentBookings.length>0){
            console.log(room.name,"stage1");
            for(const booking of room.currentBookings){
              if(!moment(moment(dates[0].$d).format('DD-MM-YYYY')).isBetween(booking.fromDate,booking.toDate)&&!moment(moment(dates[1].$d).format('DD-MM-YYYY')).isBetween(booking.fromDate,booking.toDate)){
                  console.log(room.name,"stage2");

                if(
                    moment(dates[0].$d).format('DD-MM-YYYY')!== booking.fromDate&&
                    moment(dates[0].$d).format('DD-MM-YYYY')!== booking.toDate&&
                    moment(dates[1].$d).format('DD-MM-YYYY')!== booking.fromDate&&
                    moment(dates[1].$d).format('DD-MM-YYYY')!==booking.toDate
                ){availability=true 
                  console.log(room.name,"stage3");
                }
              }
            }
        }
        if(availability==true || room.currentBookings.length==0){
          console.log(room.name,"stage4");
          tempRooms.push(room);
          console.log(tempRooms);
        }
        setRooms(tempRooms);
      }
    }else{
      window.location.reload();
    }
    
  }

  const handleShowDates = (event) => {
    if(selectedRange[1] && selectedRange[0]){
      const start=new Date(moment(selectedRange[0].$d).format('YYYY-MM-DD'));
      const end=new Date(moment(selectedRange[1].$d).format('YYYY-MM-DD'));
      setToDate(selectedRange[1].$d);
      setFromDate(selectedRange[0].$d);
      setDays(differenceInDays(end,start)+1);
      console.log(days);
    }else{
      alert('please select date');
      event.preventDefault();
    }
  };
  function filterBySearch(){
     const tempRooms=duplicateRooms.filter(room=>room.name.toLowerCase().includes(searchKey.toLowerCase()));
     setRooms(tempRooms);
  }
  function filterByType(e){
    setType(e)
    if(e!=='All'){
      const tempRooms=duplicateRooms.filter(room=>room.type.toLowerCase()==e.toLowerCase());
      setRooms(tempRooms);
    }else{
      setRooms(duplicateRooms);
    }
     
  }
  useEffect(() => {
    axios.get('/api/rooms')
      .then(response => {
        setRooms(response.data.rooms);
        setDuplicateRooms(response.data.rooms);
        console.log(response.data);
        setloading(false);
      })
      .catch(error => {
        setError(true);
        setloading(false);
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array means this effect runs once on mount
  return (
    <div>
      <div className="container-fluid  text-center mt-4">
                <div className='row filter'>
                  <div className='col'>
                  <div style={{ margin: '20px' }}>
                          <DatePicker.RangePicker value={selectedRange} onChange={filterByDate} />
                  </div>
                  </div>
                  <div className='col'>
                  <div style={{ margin: '17px' }}>
                          <input type='text' className='form-control' placeholder='Search' value={searchKey} onChange={(e)=>{setSearchKey(e.target.value)}} onKeyUp={filterBySearch}/>
                  </div>
                </div>
                <div className='col'>
                  <div style={{ margin: '17px' }}>
                          <select className='form-control' value={type} onChange={(e)=>{filterByType(e.target.value)}}>
                            <option value='All'>All</option>
                            <option value='Delux'>Delux</option>
                            <option value='Non-Delux'>Non-Delux</option>
                          </select>
                  </div>
              </div>
              </div>
                <div className="row mt-4">
                    {loading ? (<Loading/>) : rooms.map((rooms)=>{
                        return (<Rooms rooms={rooms} fromDate={fromDate} toDate={toDate} days={days} func={handleShowDates}/>)})}
                </div>
      </div>
    </div>)

}
export default HomePage;
