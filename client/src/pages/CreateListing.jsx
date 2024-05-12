import { useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactMap from "../components/ReactMap";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    onboardingEngagement: "",
    address: "",

    family: false,
    adventure: false,
    foodie: false,
    backpacker: false,
    femaleSolo: false,
    overlanding: false,
    selectedPlaces: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);

  const [destinations, setDestinations] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(localStorage.getItem("user_id"));
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls?.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (
      e.target.id === "family" ||
      e.target.id === "adventure" ||
      e.target.id === "foodie" ||
      e.target.id === "backpacker" ||
      e.target.id === "femaleSolo" ||
      e.target.id === "overlanding" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      console.log("Submitting with userRef:", currentUser._id);
      console.log("Form data being sent:", {
        ...formData,
        position: formData.position,
        userRef: currentUser._id,
      });
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          position: formData.position,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create listing");
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      if (data && data._id) {
        navigate(`/listing/${data._id}`);
      } else {
        throw new Error("No ID returned");
      }
    } catch (error) {
      console.error("Submission error:", error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  const [currentStep, setCurrentStep] = useState(1); // New state for tracking steps

  const handleGetStartedClick = () => {
    setCurrentStep(2); // Assuming step 2 is after the "Get Started" screen
  };

  const handleContinueClick = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBackClick = () => {
    setCurrentStep(currentStep - 1); // Goes back to the previous step
  };

  function handleChangeCategory(category) {
    // Toggle the category's state in formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [category]: !prevFormData[category],
    }));
  }

  // State to manage dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSelect = (selectedPlace) => {
    const { address, placeId } = selectedPlace; // Destructure the selectedPlace object to get address and placeId

    // Geocode the address to get latLng if needed here
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng); // Log or use latLng as needed
        // Update form data if needed here
        setFormData((prevFormData) => ({ ...prevFormData, address }));
      })
      .catch((error) => console.error("Error", error));
  };

  const handleRemovePlace = (index) => {
    const filteredPlaces = formData.selectedPlaces.filter(
      (_, i) => i !== index
    );
    setFormData({
      ...formData,
      selectedPlaces: filteredPlaces,
    });
  };

  const handleSelectPlace = (address, placeId) => {
    const newPlaces = [...formData.selectedPlaces, { address, placeId }];
    if (newPlaces.length <= 10) {
      setFormData({
        ...formData,
        selectedPlaces: newPlaces,
      });
    } else {
      alert("You can only add up to 10 places.");
    }
  };
  // State for storing the single selected home location
  const [homeLocation, setHomeLocation] = useState("");

  // Function to handle selecting the home location
  const handleSelectHomeLocation = (address, placeId) => {
    setHomeLocation(address); // Update the state with the selected address
    setFormData({
      ...formData,
      address: address, // Set the address in formData for submission or other operations
    });
  };
  console.log(formData);
  return (
    <>
      <div className="h-screen w-screen bg-[url('createlistingbg.svg')] bg-cover bg-no-repeat bg-center">
        {currentStep === 1 && (
          <div className="flex w-full bg-white text-black items-center justify-center h-max">
            <div className="flex w-2/5 flex-col ml-32 mr-10 ">
              <div className="bg-[url('https://gyde-webapp-reactjs.onrender.com/groupimgdashboard.png')] w-32 h-10 bg-cover bg-no-repeat bg-center flex "></div>
              <p className="flex text-gray-400">
                Over 200 guides have joined our community!
              </p>
              <h2 className="flex font-bold text-5xl">
                Its easy getting started with Gyde,
              </h2>
            </div>
            <div className="flex w-3/5 mr-20">
              <div className="flex flex-col items-center mt-20">
                <div className="flex mb-10">
                  <div className="flex flex-col mr-5">
                    <p className="font-bold text-2xl">1. Introduce yourself</p>
                    <p className="text-gray-400">
                      Introduce yourself with bio, photos, and social links to
                      connect with travelers and showcase your unique
                      experiences.
                    </p>
                  </div>
                  <div className="bg-[url('https://gyde-webapp-reactjs.onrender.com/gydeformimg1.svg')] w-60 h-40 bg-cover bg-no-repeat bg-center"></div>
                </div>

                <div className="flex mb-10">
                  <div className="flex flex-col mr-5">
                    <p className="font-bold text-2xl">
                      2. Define your travel niche
                    </p>
                    <p className="text-gray-400">
                      Choose tags, list specialties, and define your travel
                      style to attract like-minded travelers to your expertise.
                    </p>
                  </div>
                  <div className="bg-[url('https://gyde-webapp-reactjs.onrender.com/gydeformimg2.svg')] w-60 h-40 bg-cover bg-no-repeat bg-center"></div>
                </div>

                <div className="flex flex-col items-center mb-10">
                  <div className="flex">
                    <div className="flex flex-col mr-5">
                      <p className="font-bold text-2xl">
                        3. Expertise verification & Payment details
                      </p>
                      <p className="text-gray-400">
                        Verify expertise, add payment method, and embark on your
                        Gyde journey with confidence and ease.
                      </p>
                    </div>
                    <div className="bg-[url('https://gyde-webapp-reactjs.onrender.com/gydeformimg3.svg')] w-60 h-40 bg-cover bg-no-repeat bg-center"></div>
                  </div>
                  <button
                    onClick={handleGetStartedClick}
                    className="flex mt-16 bg-black text-white p-3 rounded-2xl w-40 justify-center"
                  >
                    Get Started
                  </button>{" "}
                  {/* Adjusted button position */}
                </div>
              </div>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="flex flex-col w-full bg-white text-black items-center justify-center h-max">
            {/* Your new empty state content here */}
            <div className="flex flex-col mt-20 ">
              <p className="flex text-3xl m-10">Introduce yourself</p>

              <div className="flex mt-5">
                <p className="flex ml-6 ">Name</p>
                <span className=" text-red-600"> *</span>
              </div>
              <input
                type="text"
                placeholder="Full Name"
                className="flex border p-3 rounded-lg m-5"
                id="name"
                maxLength="62"
                minLength="6"
                required
                onChange={handleChange}
                value={formData.name || ""}
              />

              <div className="flex mt-5">
                <p className="flex ml-6 ">Bio</p>
                <span className=" text-red-600"> *</span>
              </div>
              <textarea
                type="text"
                placeholder="Bio"
                className=" flex border p-3 rounded-lg m-5"
                id="description"
                required
                onChange={handleChange}
                value={formData.description || ""}
              />

              <p className="font-semibold m-5">
                Showcase Your Top Travel Moments
                <span className="font-normal text-gray-600 ml-2">
                  The first image will be your DP
                </span>
              </p>
              <div className="flex gap-4 m-5">
                <input
                  onChange={(e) => setFiles(e.target.files)}
                  className="p-3 border border-gray-300 rounded w-full"
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                />
                <button
                  type="button"
                  disabled={uploading}
                  onClick={handleImageSubmit}
                  className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
              <p className="text-red-700 text-sm">
                {imageUploadError && imageUploadError}
              </p>
              {formData.imageUrls?.length > 0 &&
                formData.imageUrls.map((url, index) => (
                  <div
                    key={url}
                    className="flex justify-between p-3 border items-center"
                  >
                    <img
                      src={url}
                      alt="listing image"
                      className="w-20 h-20 object-contain rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <>
            <div className="flex flex-col w-full bg-white text-black items-center justify-center h-max">
              <div className="flex flex-col mt-20 px-4 sm:px-6 lg:px-8">
                <p className="text-3xl m-10 text-center">
                  Define Your Travel Niche
                </p>
                <div className="flex justify-center">
                  <p className="text-xl text-center">
                    Which Tags Best Describe Your Travel Style?
                  </p>
                  <span className=" text-red-600"> *</span>
                </div>
                <span className="text-gray-400 text-lg text-center">
                  (Select all that apply.)
                </span>
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                  {[
                    "family",
                    "adventure",
                    "foodie",
                    "backpacker",
                    "femaleSolo",
                    "overlanding",
                  ].map((category) => (
                    <button
                      key={category}
                      id={category}
                      type="button"
                      onClick={() => handleChangeCategory(category)}
                      className={`px-4 py-2 border-2 ${
                        formData[category]
                          ? "border-black text-black"
                          : "border-gray-400 text-gray-400"
                      } rounded bg-white transition-colors duration-150 ease-in-out`}
                    >
                      {formData[category] ? "✓" : "+"}{" "}
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="text-xl mt-5">Home Location</div>
                <div className="flex">
                  <PlacesAutocomplete
                    value={homeLocation}
                    onChange={setHomeLocation}
                    onSelect={(address, placeId) =>
                      handleSelectHomeLocation(address, placeId)
                    }
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div>
                        <input
                          {...getInputProps({
                            placeholder: "Search for your home location",
                            className:
                              "location-search-input flex border p-3 rounded-lg mt-4 w-64",
                          })}
                        />
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map((suggestion, index) => {
                            const className = suggestion.active
                              ? "suggestion-item--active"
                              : "suggestion-item";
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                })}
                                key={suggestion.placeId || index}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                  <p className=" text-red-600"> *</p>
                </div>
                <div className="text-xl mt-5">Destination Specialties</div>
                <span className="text-slate-400">
                  (List up to 10 destinations you are deeply familiar with.)
                </span>
                <div className="flex">
                  <PlacesAutocomplete
                    value={destinations}
                    onChange={setDestinations}
                    onSelect={(address, placeId) =>
                      handleSelectPlace(address, placeId)
                    }
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div>
                        <input
                          {...getInputProps({
                            placeholder: "Add destination",
                            className:
                              "location-search-input flex border p-3 rounded-lg mt-4 w-full",
                          })}
                        />
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map((suggestion, index) => {
                            const className = suggestion.active
                              ? "suggestion-item--active"
                              : "suggestion-item";
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                })}
                                key={suggestion.placeId || index}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                  <span className=" text-red-600"> *</span>
                </div>
                {formData.selectedPlaces.map((place, index) => (
                  <div
                    key={index}
                    className="selected-place-item border flex border-slate-400 w-fit p-2 rounded-xl m-2"
                  >
                    {place.address}{" "}
                    <button
                      onClick={() => handleRemovePlace(index)}
                      className="ml-2"
                    >
                      X
                    </button>
                  </div>
                ))}
                {/* Dropdown Button */}
                <div className="relative inline-block text-left mt-4 w-1/3 mx-auto">
                  <div>
                    <button
                      type="button"
                      onClick={toggleDropdown}
                      className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
                    >
                      How Did You Hear About Gyde?
                    </button>
                  </div>
                  {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1" role="none">
                        <a
                          href="#"
                          className="text-gray-700 block px-4 py-2 text-sm"
                        >
                          A Friend
                        </a>
                        <a
                          href="#"
                          className="text-gray-700 block px-4 py-2 text-sm"
                        >
                          Instagram Ad
                        </a>
                        <a
                          href="#"
                          className="text-gray-700 block px-4 py-2 text-sm"
                        >
                          TikTok Ad
                        </a>
                        <a
                          href="#"
                          className="text-gray-700 block px-4 py-2 text-sm"
                        >
                          YouTube Ad
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {currentStep === 4 && (
          <>
            <div className="flex flex-col w-full bg-white text-black items-center justify-center h-max">
              <div className="flex flex-col mt-20 px-4 sm:px-6 lg:px-8 w-1/2">
                <div className="flex">
                  <p className="text-xl mt-4">Onboarding Engagement</p>
                  <span className=" text-red-600"> *</span>
                </div>
                <textarea
                  type="text"
                  placeholder="Your First Gyde Challenge [Engage with our community by sharing a brief travel tip or story related to a theme we provide. This helps kickstart your profile engagement.]"
                  className=" flex border p-3 rounded-lg mt-4 h-60"
                  id="onboardingEngagement"
                  required
                  onChange={handleChange}
                  value={formData.onboardingEngagement || ""}
                />
              </div>
              <img
                src="https://gyde-webapp-reactjs.onrender.com/paymentqr.jpeg"
                className="w-1/4 h-1/4 object-cover"
              />
              <button
                disabled={loading || uploading}
                onClick={handleSubmit}
                className="p-3 m-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              >
                {loading ? "Creating..." : "Submit Form"}
              </button>
            </div>
          </>
        )}

        <div className="flex gap-96 mb-10 w-full bg-white text-black items-center justify-center">
          {currentStep > 1 && (
            <button
              onClick={handleBackClick}
              className="flex mt-16 p-3 rounded-2xl w-40 justify-center mx-auto"
            >
              <IoArrowBackOutline className="flex m-1" /> Back
            </button>
          )}
          {currentStep < 4 &&
            currentStep > 1 && ( // Only show the continue button if not on the last step
              <button
                onClick={handleContinueClick}
                className="flex mt-16 bg-black text-white p-3 rounded-2xl w-40 justify-center mx-auto"
              >
                Continue
              </button>
            )}
        </div>
      </div>
    </>
  );
}
