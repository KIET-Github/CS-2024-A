import { useEffect,useState } from "react"
import { userAPI } from "../apiCalls/userAPIs";
import { setUserData } from "../store/user";
import {useDispatch,useSelector} from 'react-redux'
import { setAuthLoggedinState } from "../store/auth";


export const useUserrProfile = () => {
    const [apiStatus,setApiStatus] =useState('UNINIT')
    const dispatch = useDispatch()

    const getUser = () =>{
        setApiStatus('INIT')
        userAPI().then(res => {
            res.json().then(jsonRes => {
                dispatch(setAuthLoggedinState(true))
                dispatch(setUserData(jsonRes))
                setApiStatus('SUCCESS')
            }).catch((e)=>{ setApiStatus('ERROR')})
        }).catch((e)=>{ setApiStatus('ERROR')})
    }
    useEffect(() => {
        getUser()
    }, [])
    return {apiStatus, getUser}
}