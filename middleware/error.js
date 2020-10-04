const unknownEndpoints = () => {
  const error = new Error("Unknown Endpoints");
  error.status = 404;
  throw error;
};

const errorHandler = (err, req, res, next) => {
  //Mongoose Bad ObjectId
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(404).send({
      status: "Error",
      error: `Resource is not found`,
    });
  }

  //Mongoose validation Error
  if (err.name === "ValidationError") {
    console.log(err);
    const message = Object.values(err.errors).map((val) => val.message);
    const arrayIntoString = message.join(",");
    return res.status(400).send({ status: "Error", error: arrayIntoString });
  }

  //Mongoose Dublicat key
  if (err.code === 11000) {
    return res
      .status(409)
      .send({ status: "Error", error: "Dublicate value entered" });
  }

  res.status(err.status || 500).send({ status: "Error", error: err.message });
};

module.exports = {
  unknownEndpoints,
  errorHandler,
};
