import { validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
  const errorsResult = validationResult(req);

  if (!errorsResult.isEmpty()) {
    console.log(errorsResult.errors);
    const errArray = errorsResult.errors.map((err) => {
      if (err.type === "field") {
        return { message: err.msg, field: err.path };
      }
      return { message: err.msg };
    });
    return res.status(400).send({ message: errArray });
  }

  next();
};
