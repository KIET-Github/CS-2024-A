import BookDriver from "./model.bookDriver";
import Driver from "../driver/model.driver";


/* book driver */
export const bookDriver = async (req, res) => {
  try {
    const bookDriver = new BookDriver({ 
      ...req.body ,
      customerId:req?.user?._id,
    });
    await bookDriver.save();

    await Driver.findOneAndUpdate({_id:req.body.driverId},{isBooked:true})

    res.status(201).send(bookDriver);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Something went wrong. Please contact support" });
  }
};

/* booking list */
export const bookingList = async (req, res) => {
  try {
    let bookingList = await BookDriver.find({customerId:req?.user?._id});

    res.status(200).send(bookingList);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Something went wrong. Please contact support" });
  }
};