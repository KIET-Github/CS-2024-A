import Driver from "./model.driver";

/* get driver data */
export const getDriver = (req, res) => {
  res.status(200).json(req.user);
};

/* get driver list */
export const getDriverList = async (req, res) => {
  const driverList = await Driver.find();
  res.status(200).json(driverList);
};

/* add driver */
export const addDriver = async (req, res) => {
  try {
    const driver = new Driver({ ...req.body });
    await driver.save();

    res.status(201).send(driver);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Something went wrong. Please contact support" });
  }
};

/* update driver data */
export const updateDriver = (req, res) => {};

/* delete driver data */
export const deleteDriver = (req, res) => {};
