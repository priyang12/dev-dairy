import { Request, Response } from "@google-cloud/functions-framework";

exports.helloWorld2 = (req: Request, res: Response) => {
  let message = req.query.message || req.body.message || "Hello World!";
  res.status(200).send(message);
};
