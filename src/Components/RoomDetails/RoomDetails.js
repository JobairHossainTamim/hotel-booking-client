import React from 'react';
import { Carousel, Modal, Button } from 'react-bootstrap';
;

const RoomDetails = ({ show, setShow, room }) => {

    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose} size="lg" >
            <Modal.Header closeButton>
                <Modal.Title>{room.name}</Modal.Title>
            </Modal.Header>
            {/* Body Code  */}
            <Modal.Body>
                <Carousel >
                    {room.imageUrls.map((url, index) => {
                        return <Carousel.Item key={index} interval={2000}>
                            <img src={url} alt={url} className="d-block w-100 big-img" />
                        </Carousel.Item>

                    })}
                </Carousel>
                <p className='mt-3'>{room.description}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RoomDetails;