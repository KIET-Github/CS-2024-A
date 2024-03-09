import { fetchService } from "../utils/apiService"



export const bookDriverAPI = async (payload) => {
    const res = await fetchService('/api/book/driver', 'POST', payload)
    if(res.status == 201){
        return {
            status :'success',
            data : await res.json()
        }
    } else return {
        status :'error',
        data :null
    }
}


export const getbookingListAPI = async () => {
    const res = await fetchService('/api/book/list', 'GET')
    console.log('res++++',res)
    if([200,304].includes(res.status)){
        return {
            status :'success',
            data : await res.json()
        }
    } else return {
        status :'error',
        data :null
    }
}