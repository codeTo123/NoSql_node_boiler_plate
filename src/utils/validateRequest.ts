import { Request, Response, NextFunction } from "express";

export function validateRequest(schema: any) {
  return (req: Request, res: Response, next: NextFunction): any => {
    const schemaObject =
      Object.keys(req.body).length > 0
        ? req.body
        : Object.keys(req.params).length > 0
          ? req.params
          : req.query; // Take any one schema object

    const validationResult = schema.validate(schemaObject, { abortEarly: false });

    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details.map((err) => err.message) });
    }

    next(); // Ensure `next()` is always called on success
  };
}
