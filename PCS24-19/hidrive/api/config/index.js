import mongoose from "mongoose";
import routes from "../src/routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

export default (app) => {
  

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  // parse application/json
  app.use(bodyParser.json());

  // parse cookie
  app.use(cookieParser())

  routes(app);

  mongoose.connect(
    "mongodb://mongodb:27017/MERN-APP",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.error("FAILED TO CONNECT MONGODB");
        console.error(err);
      } else {
        console.log("CONNECTED TO MONGODB");
      }
    }
  );
};
