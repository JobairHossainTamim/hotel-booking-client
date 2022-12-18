import React, { useEffect, useState } from 'react';
import axios from "axios";
import Room from './../../Components/Room/Room';
import Loader from '../../Components/Messages/Loader/Loader';
import Error from '../../Components/Messages/Error/Error';
import { DatePicker, Space } from 'antd';
import "./HomeScreen.css";
import moment from 'moment';


const HomeScreen = () => {

    const [room, setRoom] = useState([]);
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()

    // Duplicate values for time filtering

    const [duplicateRooms, setDuplicateRoom] = useState();

    const { RangePicker } = DatePicker;

    // Search all Functionality
    const [searchKey, setSearchKey] = useState('');
    const [searchType, setSearchType] = useState('all');

    const getData = async () => {
        try {
            setLoading(true);
            const data = (await axios.get(`${process.env.REACT_APP_API_URL}/rooms/getAllRooms`)).data
            setRoom(data);
            setDuplicateRoom(data);
            setLoading(false);
        } catch (error) {
            setError(true);
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getData()
    }, []);

    // Date Filter
    function filterByData(dates) {

        setFromDate(moment(dates[0]).format('DD-MM-YYYY'));
        setToDate(moment(dates[1]).format('DD-MM-YYYY'));
        var tempRoom = [];


        for (var room of duplicateRooms) {

            var availability = false;

            for (var booking of room.currentBookings) {

                if (room.currentBookings.length) {

                    if (
                        !moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromDate, booking.toDate) &&
                        !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromDate, booking.toDate)
                    ) {
                        if (
                            moment(dates[0]).format('DD-MM-YYYY') !== booking.fromDate &&
                            moment(dates[0]).format('DD-MM-YYYY') !== booking.toDate &&
                            moment(dates[1]).format('DD-MM-YYYY') !== booking.fromDate &&
                            moment(dates[1]).format('DD-MM-YYYY') !== booking.toDate
                        ) {
                            availability = true;
                        }
                    }
                }

            }
            if (availability || room.currentBookings.length === 0) {
                tempRoom.push(room)
            }
            setRoom(tempRoom)
        }

    }
    // Search Data

    function filterBySearch() {
        const tempRoom = duplicateRooms.filter(room => room.name.toLowerCase().includes(searchKey.toLocaleLowerCase()));
        setRoom(tempRoom);

    }
    function filterByType(e){
        setSearchType(e)
        if( e!== "all"){
            const tempRoom = duplicateRooms.filter(room => room.type.toLowerCase()=== e.toLowerCase());
            setRoom(tempRoom);
        }
        else{
            setRoom(duplicateRooms);
        }
   

    }




    return (
        <div className='container'>
            <div className='row mt-5 bs'>
                <div className='col-md-3 mt-1'>
                    <RangePicker format="DD-MM-YYYY" onChange={filterByData} />
                </div>
                <div className='col-md-5'>
                    <input type="text" className="form-control" placeholder='search room'
                        value={searchKey} onChange={(e) => { setSearchKey(e.target.value) }} onKeyUp={filterBySearch}
                    />
                </div>
                <div className='col-md-4'>
                    <select className="form-control" value={searchType} onChange={(e)=>{filterByType(e.target.value)}}>
                        <option value="all">All</option>
                        <option value="deluxe">Deluxe</option>
                        <option value="non-deluxe">Non Deluxe</option>
                    </select>
                </div>
            </div>


            <div className='row justify-content-center mt-2'>
                {
                    loading ? (<Loader />) : error ? (<Error />) : (
                        room.map((room) => {
                            return <div key={room._id} className="col-md-9 mt-2">
                                <Room room={room} fromDate={fromDate} toDate={toDate}></Room>
                            </div>
                        })
                    )
                }
            </div>
        </div>
    );
};

export default HomeScreen;