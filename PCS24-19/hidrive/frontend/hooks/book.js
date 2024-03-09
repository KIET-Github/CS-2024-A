import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getDriverListAPI } from "../apiCalls/driverAPIs";
import { setDriverList } from "../store/driver";
import { bookDriverAPI, getbookingListAPI } from "../apiCalls/bookAPIs";
import { setBookingList } from "../store/book";


export const useBookDriver = () => {
    const [apiState, setApiState] = useState('UNINIT')
    const bookDriver = (payload) => {
        setApiState('INIT')
        bookDriverAPI(payload).then(res => {
            if (res.status == 'success') {
                setApiState('SUCCESS')
            } else setApiState('ERROR')
        })
    }
    // useEffect(() => {
    //     fetchDriverList()
    // }, [])
    return { apiState, bookDriver }
}

export const useBookingList = () => {
    const [bookingListApiStatus, setBookingListApiStatus] = useState('UNINIT')
    const { bookingList } = useSelector(state => state.book)
    const dispatch = useDispatch()
    const fetchBookingList = () => {
        setBookingListApiStatus('INIT')
        getbookingListAPI().then(res => {
            if (res.status = 'success') {
                dispatch(setBookingList(res.data))
                setBookingListApiStatus('SUCCESS')
            }
        }).catch(e => {
            console.log('errr+++',e)
            setBookingListApiStatus('ERROR')
        })
    }

    useEffect(() => {
        fetchBookingList()
    }, [])
    return { bookingListApiStatus, bookingList, fetchBookingList }
}