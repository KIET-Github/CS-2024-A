import { fetchService } from "../utils/apiService"

export const userAPI = async () => {
    const res = await fetchService('/api/user', 'GET')
    return res
}