import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaMapMarkerAlt, FaShare } from "react-icons/fa";
import Contact from "../components/Contact";
import DashboardHeader from "../components/DashboardHeader";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/listing/get/${params.listingId}`);

        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  const startChat = () => {
    // Here you could either navigate to the Chat component with state
    navigate("/chat", { state: { otherID: listing.userRef, autoStart: true } });
    console.log(listing.userRef, "from listing page");
  };
  return (
    <main className="bg-white text-black flex bg-no-repeat bg-center bg-cover bg-[url('https://gyde-webapp-reactjs.onrender.com/dashboardimg.png')] ">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      <div className="text-white">
        <DashboardHeader />
      </div>
      {listing && !loading && !error && (
        <div className="flex m-20 ml-36 bg-white rounded-3xl">
          <div className="w-1/3 bg-white rounded-3xl">
            {listing?.imageUrls[0] && (
              <div
                style={{
                  backgroundImage: `url(${listing.imageUrls[0]})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  height: "350px",
                  width: "300px",
                  borderRadius: "20px",
                }}
              />
            )}
            <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
              <p className="text-2xl font-semibold">{listing.name} </p>
              <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
                <FaMapMarkerAlt className="text-green-700" />
                {listing.address}
              </p>

              <p className="text-slate-800">
                <span className="font-semibold text-slate-500">
                  About me <br />{" "}
                </span>
                {listing.description}
              </p>
              <div className="flex flex-col">
                <h3 className="font-semibold text-slate-500 mb-2">
                  Places I have been to : <br />
                </h3>
                {listing.selectedPlaces && listing.selectedPlaces.length > 0 ? (
                  <ul className="flex flex-wrap">
                    {listing.selectedPlaces.map((place, index) => {
                      const city = place.address.split(",")[0]; // Get the first part before the comma
                      return (
                        <li
                          key={index}
                          className="mb-1 border border-slate-300 p-2 w-fit rounded-xl m-2"
                        >
                          {city}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p>No places selected.</p>
                )}
              </div>
              {/* <p className="text-slate-800">
                <span className="font-semibold text-slate-500">
                  Onboarding Engagement <br />
                </span>
                {listing.onboardingEngagement}
              </p> */}
              <span className="font-semibold text-slate-500 mt-2">
                Travel Style <br />
              </span>
              <div className=" text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                {listing.family ? (
                  <span className="flex items-center gap-1 whitespace-nowrap border border-slate-300 rounded-xl p-2">
                    Family
                  </span>
                ) : null}

                {listing.adventure ? (
                  <span className="flex items-center gap-1 whitespace-nowrap border border-slate-300 rounded-xl p-2">
                    Adventure
                  </span>
                ) : null}

                {listing.backpacker ? (
                  <span className="flex items-center gap-1 whitespace-nowrap border border-slate-300 rounded-xl p-2">
                    Backpacker
                  </span>
                ) : null}

                {listing.foodie ? (
                  <span className="flex items-center gap-1 whitespace-nowrap border border-slate-300 rounded-xl p-2">
                    Foodie
                  </span>
                ) : null}

                {listing.femaleSolo ? (
                  <span className="flex items-center gap-1 whitespace-nowrap border border-slate-300 rounded-xl p-2">
                    Female Solo
                  </span>
                ) : null}

                {listing.overlanding ? (
                  <span className="flex items-center gap-1 whitespace-nowrap border border-slate-300 rounded-xl p-2">
                    Overlanding
                  </span>
                ) : null}
              </div>

              {currentUser &&
                listing.userRef !== currentUser._id &&
                !contact && (
                  <button
                    onClick={startChat}
                    className="bg-[#EDC16A] text-white rounded-lg uppercase hover:opacity-95 p-3"
                  >
                    Trip pe chalein ?
                  </button>
                )}

              {contact && <Contact listing={listing} />}
            </div>
          </div>
          <div className="w-2/3 flex flex-wrap h-fit my-auto ml-32 bg-white">
            {listing?.imageUrls.slice(1).map((url, index) => (
              <div key={index} className="w-max m-5 h-fit ">
                <div
                  className=" bg-no-repeat bg-center bg-cover"
                  style={{
                    backgroundImage: `url(${url})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    height: "200px",
                    width: "200px",
                    borderRadius: "20px",
                  }}
                />
              </div>
            ))}
          </div>
          {/* <div className=" z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className=" z-10 rounded-md bg-slate-100 p-2">Link copied!</p>
          )} */}
        </div>
      )}
    </main>
  );
}
