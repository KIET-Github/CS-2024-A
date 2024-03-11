
import Session from '../login/model.session'


/* logout- remove session from database */
export const logout = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (token) {
      const deletedToken=await Session.deleteOne({ token: token });
      if(deletedToken) res.clearCookie("token").status(200).send()
      else res.sendStatus(403)
    }else res.sendStatus(403)
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message:
        "Something went wrong while logging out. Please contact support.",
    });
  }
};
