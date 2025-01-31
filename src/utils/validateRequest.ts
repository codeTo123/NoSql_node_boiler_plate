import { Request, Response, NextFunction } from "express";

export function validateRequest(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const schemaObject =
      Object.keys(req.body).length > 0
        ? req.body
        : Object.keys(req.params).length > 0
        ? req.params
        : req.query; //take any one schema object

    const validationResult = schema.validate(schemaObject);
    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.message });
    }
    next();
  };
}