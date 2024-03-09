import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getDriverListAPI } from "../apiCalls/driverAPIs";
import { setDriverList } from "../store/driver";


export const useDriverList = () => {
    const dispatch = useDispatch()
    const [apiState, setApiState] = useState('UNINIT')
    const {driverList} = useSelector(state => state.driver)
    const fetchDriverList = () =>{
        setApiState('INIT')
        getDriverListAPI().then(res => {
            if (res.status == 'success') {
                dispatch(setDriverList(res.data))
                setApiState('SUCCESS')
            } else setApiState('ERROR')
        })
    }
    useEffect(() => {
        fetchDriverList()
    }, [])
    return {apiState, driverList, fetchDriverList}
}