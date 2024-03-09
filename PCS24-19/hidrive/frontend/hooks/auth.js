import { logoutAPI } from "../apiCalls/authAPIs"
import { useDispatch,useSelector } from 'react-redux'
import { setAuthLoggedinState } from "../store/auth"
import { setUserData } from "../store/user"
import { useRouter } from 'next/router'
 

export const useLogout = () => {
    const router =useRouter()
    const dispatch = useDispatch()
    const { userData } = useSelector((state => state.user))
    const logOut = () => logoutAPI().then(res => {
        console.log('res++', res)
        if (res.status == 200) {
            dispatch(setAuthLoggedinState(false))
            dispatch(setUserData(null))
            router.push('/login')
        }
    })

    return { logOut }
}