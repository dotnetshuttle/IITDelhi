import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    onboardingEngagement: {
      type: String,
      required: true,
    },
    position: {
      lat: { type: Number, required: false },
      lng: { type: Number, required: false },
    },

    address: {
      type: String,
      required: true,
    },

    family: {
      type: Boolean,
      required: true,
    },
    adventure: {
      type: Boolean,
      required: true,
    },
    foodie: {
      type: Boolean,
      required: true,
    },
    backpacker: {
      type: Boolean,
      required: true,
    },
    femaleSolo: {
      type: Boolean,
      required: true,
    },
    overlanding: {
      type: Boolean,
      required: true,
    },

    imageUrls: {
      type: Array,
      required: true,
    },

    selectedPlaces: [
      {
        address: { type: String, required: true },
        placeId: { type: String, required: true },
      },
    ],
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
