import User from '../routes/user/model.user'
import Session from '../routes/login/model.session'
import jwt from 'jsonwebtoken'
export const requiresLogin = async (req, res, next) => {
  try {
    const token = req.cookies.token
    if (token) {
      const isInSession = await Session.find({ token: token })
      if (isInSession) {
        const decodedToken = jwt.verify(token, 'secret')
        if (decodedToken) {
          const user = await User.findOne({ _id: decodedToken.userId }, { password: 0 })
          if (user) {
            req.user = user
            next()
          } else { res.sendStatus(403) }
        } else {
          res.sendStatus(403)
        }
      } else { res.sendStatus(403) }

    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Something went wrong while authorizing. Please contact support.' })
  }
};
