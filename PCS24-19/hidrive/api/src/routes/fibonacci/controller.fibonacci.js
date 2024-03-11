import { fibonacciService } from "./model.fibonacci";

/* login users */
export const fibonacci = async (req, res) => {
  try {
    let num = parseInt(req.params.num);

    let result = await fibonacciService(num);

    res.status(200).send({ result: result });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Something went wrong. Please contact support." });
  }
};
