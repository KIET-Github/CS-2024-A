import user from './user'
import login from './login'
import logout from './logout'
import signup from './signup'
import fibonacci from './fibonacci'
import driver from './driver'
import book from './book'

export default (app)=>{
    
    app.use('/api/user',user)
    app.use('/api/driver',driver)
    app.use('/api/book',book)
    app.use('/api/login',login)
    app.use('/api/logout',logout)
    app.use('/api/signup',signup)
    app.use('/api/fibonacci',fibonacci)
    
    app.get('/*',(req,res)=>{res.sendStatus(404)})
}