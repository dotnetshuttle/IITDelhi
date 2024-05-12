// Import useEffect, useState, useNavigate, Link, and useSelector from their respective libraries.
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import ListingItem from "../components/ListingItem";
import { useSelector } from "react-redux";

// Define the Search function component.
export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    family: false,
    adventure: false,
    foodie: false,
    backpacker: false,
    femaleSolo: false,
    overlanding: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const familyFromUrl = urlParams.get("family");
    const adventureFromUrl = urlParams.get("adventure");
    const foodieFromUrl = urlParams.get("foodie");
    const backpackerFromUrl = urlParams.get("backpacker");
    const femaleSoloFromUrl = urlParams.get("femaleSolo");
    const overlandingFromUrl = urlParams.get("overlanding");

    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      familyFromUrl ||
      adventureFromUrl ||
      foodieFromUrl ||
      backpackerFromUrl ||
      femaleSoloFromUrl ||
      overlandingFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        family: familyFromUrl === "true" ? true : false,
        adventure: adventureFromUrl === "true" ? true : false,
        foodie: foodieFromUrl === "true" ? true : false,
        backpacker: backpackerFromUrl === "true" ? true : false,
        femaleSolo: femaleSoloFromUrl === "true" ? true : false,
        overlanding: overlandingFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

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
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("family", sidebardata.family);
    urlParams.set("adventure", sidebardata.adventure);
    urlParams.set("foodie", sidebardata.foodie);
    urlParams.set("backpacker", sidebardata.backpacker);
    urlParams.set("femaleSolo", sidebardata.femaleSolo);
    urlParams.set("overlanding", sidebardata.overlanding);

    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  function takeMeToDasboard() {
    navigate("/dashboard");
  }
  const handleToggle = (filter) => {
    setSidebardata((prevState) => ({
      ...prevState,
      [filter]: !prevState[filter],
    }));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      className="flex md:flex-row w-full h-screen bg-no-repeat bg-center bg-cover bg-[url('https://gyde-webapp-reactjs.onrender.com/dashboardimg.png')]"
      style={{ backgroundAttachment: "fixed" }}
    >
      <button onClick={takeMeToDasboard}>
        <DashboardHeader />
      </button>
      <div className="flex-1 flex-col">
        <div className="p-7 ml-32">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex items-center gap-2">
              <input
                type="text"
                id="searchTerm"
                placeholder="Search..."
                className="border rounded-lg p-3 w-full"
                value={sidebardata.searchTerm}
                onChange={handleChange}
              />
              <div className="flex bg-white w-80 h-12 rounded-lg p-1">
                <img
                  className="flex rounded-full h-10 w-10 object-cover mr-2"
                  src={currentUser.avatar}
                  alt="profile"
                />
                <div className="flex flex-col">
                  <h2 className="flex text-black">
                    Hello, {currentUser.username}
                  </h2>
                  <h2 className="flex text-gray-500 text-xs">
                    Explore the world!!
                  </h2>
                </div>
                <div className="flex">
                  <img
                    className="flex rounded-full h-10 w-10 object-cover ml-6"
                    src="notificationhomedashboard.png"
                    alt="profile"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 flex-wrap items-center">
              <div className="flex gap-2">
                <button
                  id="family"
                  className={`w-fit h-8 p-1 px-5 ${
                    sidebardata.family
                      ? "bg-black text-white"
                      : "bg-gray-200 text-black"
                  }  rounded-lg`}
                  onClick={() => handleToggle("family")}
                >
                  Family
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  id="adventure"
                  className={`w-fit h-8 p-1 px-5 ${
                    sidebardata.adventure
                      ? "bg-black text-white"
                      : "bg-gray-200 text-black"
                  }  rounded-lg`}
                  onClick={() => handleToggle("adventure")}
                >
                  Adventure
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  id="foodie"
                  className={`w-fit h-8 p-1 px-5 ${
                    sidebardata.foodie
                      ? "bg-black text-white"
                      : "bg-gray-200 text-black"
                  }  rounded-lg`}
                  onClick={() => handleToggle("foodie")}
                >
                  Foodie
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  id="backpacker"
                  className={`w-fit h-8 p-1 px-5 ${
                    sidebardata.backpacker
                      ? "bg-black text-white"
                      : "bg-gray-200 text-black"
                  }  rounded-lg`}
                  onClick={() => handleToggle("backpacker")}
                >
                  Backpacker
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  id="femaleSolo"
                  className={`w-fit h-8 p-1 px-5 ${
                    sidebardata.femaleSolo
                      ? "bg-black text-white"
                      : "bg-gray-200 text-black"
                  }  rounded-lg`}
                  onClick={() => handleToggle("femaleSolo")}
                >
                  Female Solo
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  id="overlanding"
                  className={`w-fit h-8 p-1 px-5 ${
                    sidebardata.overlanding
                      ? "bg-black text-white"
                      : "bg-gray-200 text-black"
                  }  rounded-lg`}
                  onClick={() => handleToggle("overlanding")}
                >
                  Overlanding
                </button>
              </div>
            </div>

            <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
              Search
            </button>
          </form>
        </div>
        <div className="flex ml-32 overflow-auto h-3/4">
          <div className="p-7 flex flex-wrap gap-4">
            {!loading && listings.length === 0 && (
              <p className="text-xl text-slate-700">No listing found!</p>
            )}
            {loading && (
              <p className="text-xl text-slate-700 text-center w-full">
                Loading...
              </p>
            )}

            {!loading &&
              listings &&
              listings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}

            {showMore && (
              <button
                onClick={onShowMoreClick}
                className="text-green-700 hover:underline p-7 text-center w-full"
              >
                Show more
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
