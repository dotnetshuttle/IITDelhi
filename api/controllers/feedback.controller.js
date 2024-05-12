import Feedback from "../models/feedback.model.js";
import { errorHandler } from "../utils/error.js";

export const createFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.create(req.body);
    return res.status(201).json(feedback);
  } catch (error) {
    next(error);
  }
};
