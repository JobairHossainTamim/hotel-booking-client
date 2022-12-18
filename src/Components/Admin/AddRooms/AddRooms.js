import React, { useState } from 'react';
import axios from "axios";
import Loader from '../../Messages/Loader/Loader';
import Swal from "sweetalert2";

const AddRooms = () => {
    const [room, setRoom] = useState("");
    const [rentPerDay, setRentPerDay] = useState("");
    const [maxCount, setMaxCount] = useState("");
    const [description, setDescription] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [type, setType] = useState("");
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    async function addRoom() {
        try {
            setLoading(true)
            const roomObj = {
                room,
                rentPerDay, maxCount, description, phoneNumber, type, image1, image2, image3
            }
            const result = await axios.post(`${process.env.REACT_APP_API_URL}/rooms/addRoom`, roomObj)

            Swal.fire('Success', 'Add Data Success ', 'success').then(result => {
                window.location.reload();
            })



            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (

        <div className='row'>
            {loading && <Loader />}

            <div className="col-md-6">
                <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Room name"
                    value={room}
                    onChange={(e) => {
                        setRoom(e.target.value);
                    }}
                />

                <input
                    type="number"
                    className="form-control mt-1"
                    placeholder="Rent Per Day"
                    value={rentPerDay}
                    onChange={(e) => {
                        setRentPerDay(e.target.value);
                    }}
                />

                <input
                    type="number"
                    className="form-control mt-1"
                    placeholder="Max People Count"
                    value={maxCount}
                    onChange={(e) => {
                        setMaxCount(e.target.value);
                    }}
                />

                <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />

                <input
                    type="number"
                    className="form-control mt-1"
                    placeholder="phone Number"
                    value={phoneNumber}
                    onChange={(e) => {
                        setPhoneNumber(e.target.value);
                    }}
                />

            </div>

            <div className="col-md-6">
                <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="type please type Deluxe or Non-Deluxe"
                    value={type}
                    onChange={(e) => {
                        setType(e.target.value);
                    }}
                />
                <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Image url 1"
                    value={image1}
                    onChange={(e) => {
                        setImage1(e.target.value);
                    }}
                />
                <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Image url 2"
                    value={image2}
                    onChange={(e) => {
                        setImage2(e.target.value);
                    }}
                />
                <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Image url 3"
                    value={image3}
                    onChange={(e) => {
                        setImage3(e.target.value);
                    }}
                />
                <div className='mt-1 text-right'>
                    <button className="btn btn-primary" onClick={addRoom}>ADD ROOM</button>
                </div>
            </div>

        </div>

    );
};

export default AddRooms;