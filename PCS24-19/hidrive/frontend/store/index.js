import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth'
import userReucer from './user'
import driverReducer from './driver'
import bookReducer from './book'

export default configureStore({
reducer:{
    auth:authReducer,
    user:userReucer,
    driver:driverReducer,
    book:bookReducer
}
})