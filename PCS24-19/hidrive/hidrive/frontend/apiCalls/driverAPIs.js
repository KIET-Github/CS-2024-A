import { fetchService } from "../utils/apiService"

export const addDriverAPI = async (payload) => {
    const res = await fetchService('/api/driver/add', 'POST', payload)
    return res
}


export const getDriverListAPI = async () => {
    const res = await fetchService('/api/driver/list', 'GET')
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