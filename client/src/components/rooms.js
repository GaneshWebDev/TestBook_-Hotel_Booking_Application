import React,{useState} from "react";
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
function Rooms({rooms,fromDate,toDate,days,func}){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
            <>
            <div className="col my-2 mx-6 align-self-center col-sm-12 col-md-6 col-lg-3">
                <div className="card d-flex  justify-content-center">
                <Carousel>
                    <Carousel.Item>
                        <img src={rooms.imageUrls[0]} alt="slide 1"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={rooms.imageUrls[1]} alt="slide 2"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={rooms.imageUrls[0]} alt="slide 3"/>
                    </Carousel.Item>
                </Carousel>
                <div className="card-body text-start">
                <h5 className="card-title">{rooms.name}</h5>
                <p className="card-text">{rooms.facilities.map((fac)=>{return (<span className="fw-bold">{fac}&nbsp;&nbsp;</span>)})}</p>
                <p className="card-text"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
  <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z"/>
</svg></span><span className="fw-bold text-danger">{rooms.rentPerDay}</span></p>
                <p className="card-text"><span className="fw-bold">Type&nbsp;:</span><span>&nbsp;{rooms.type}</span></p>
                <div class="d-grid d-flex">
                {JSON.parse(localStorage.getItem('user'))?<a href={`/booking/${rooms._id}/${fromDate}/${toDate}/${days}`} className="btn btn-primary" onClick={func} disabled={true}>Book</a>:<a href='/login' className="btn btn-primary" onClick={func} disabled={true}>Book</a>}
                <a href="#" className="btn btn-primary align-self-end ms-auto" onClick={handleShow}>View Details</a>
                </div>
                </div>
                </div>
            </div>
            <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            >
            <Modal.Header>
            <Modal.Title className="text-center">{rooms.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Carousel className="carousel">
                    <Carousel.Item>
                        <img src={rooms.imageUrls[0]} alt="slide 1"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={rooms.imageUrls[1]} alt="slide 2"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={rooms.imageUrls[0]} alt="slide 3"/>
                    </Carousel.Item>
                </Carousel>
                <p>{rooms.description}</p>
                <p className="card-text"><span className="fw-bold">Count&nbsp;:</span><span>&nbsp;{rooms.maxCount}</span></p>
                <p className="card-text"><span className="fw-bold">PhoneNo&nbsp;:</span><span>&nbsp;{rooms.phoneNumber}</span></p>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" className="btn" onClick={handleClose}>Close</Button>
            </Modal.Footer>
            </Modal>
            </>
    )
}
export default Rooms;