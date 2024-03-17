import { fetchService } from "../utils/apiService"

export const signupAPI = async (payload) => {
    const res = await fetchService('/api/signup', 'POST', payload)
    return res
}

export const loginAPI = async (payload) => {
    const res = await fetchService('/api/login', 'POST', payload)
    if(res.status == 200){
        return {
            status :'success',
            data : await res.json()
        }
    } else return {
        status :'error',
        data :null
    }
}

export const logoutAPI = async (payload) => {
    const res = await fetchService('/api/logout', 'POST', payload)
    return res
}