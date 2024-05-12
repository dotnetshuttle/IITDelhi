import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedListing) {
      throw new Error("Failed to update listing");
    }
    res.status(200).json({ success: true, _id: updatedListing._id });
  } catch (error) {
    console.error("Update error:", error);
    next(errorHandler(500, error.message || "Error updating the listing"));
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let family = req.query.family;
    if (family === undefined || family === "false") {
      family = { $in: [false, true] };
    }

    let adventure = req.query.adventure;
    if (adventure === undefined || adventure === "false") {
      adventure = { $in: [false, true] };
    }

    let foodie = req.query.foodie;
    if (foodie === undefined || foodie === "false") {
      foodie = { $in: [false, true] };
    }

    let backpacker = req.query.backpacker;
    if (backpacker === undefined || backpacker === "false") {
      backpacker = { $in: [false, true] };
    }

    let femaleSolo = req.query.femaleSolo;
    if (femaleSolo === undefined || femaleSolo === "false") {
      femaleSolo = { $in: [false, true] };
    }

    let overlanding = req.query.overlanding;
    if (overlanding === undefined || overlanding === "false") {
      overlanding = { $in: [false, true] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },

      family,
      adventure,
      foodie,
      backpacker,
      femaleSolo,
      overlanding,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
