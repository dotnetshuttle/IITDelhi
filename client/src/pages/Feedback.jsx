import { useState } from "react";

export default function Feedback() {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  //   e.preventDefault();

  //   const res = await fetch("/api/feedback/create", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/feedback/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data) {
        // Check if the request was successful
        // Clear the form
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phonenumber: "",
          message: "",
        });

        // Popup message
        alert(
          "Feedback submitted successfully. Our team will reach out to you soon."
        );
      } else {
        // Handle errors (e.g., show a different message)
        alert("There was an issue submitting your feedback. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred during submission. Please try again.");
    }
  };

  return (
    <div className="bg-[url('https://mern-estate-uzdz.onrender.com/pricing.png')] w-full py-[10rem]  bg-no-repeat">
      <div className="flex flex-col">
        <div className="z-10 flex justify-center mt-20">
          <h2 className=" text-white text-4xl">Contact Us</h2>
        </div>

        <div className=" mt-60 w-full py-[10rem] bg-black  ">
          <h1 className=" flex justify-center text-3xl text-white m-3 ">
            {" "}
            Get in touch
          </h1>
          <span className=" flex justify-center text-lg text-center text-white m-3">
            {" "}
            If you have any questions? Just fill out this contact form.
            Servicing all of <br /> your billboard needs and locally owned
          </span>
          <span className=" flex justify-center text-2xl text-center text-[#40C6EC] m-3 mt-10">
            {" "}
            Contact us at : +1 234 56789 or fill out form below.
          </span>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 w-9/12 mx-auto p-4"
          >
            <div className="grid grid-cols-2 gap-x-4">
              <input
                type="text"
                placeholder="First Name"
                className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                id="firstname"
                value={formData.firstname || ""}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                id="lastname"
                value={formData.lastname || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <input
                type="email"
                placeholder="Email"
                className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                id="email"
                value={formData.email || ""}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                id="phonenumber"
                value={formData.phonenumber || ""}
                onChange={handleChange}
                required
              />
            </div>
            <textarea
              placeholder="Message"
              className="border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-all col-span-2"
              id="message"
              value={formData.message || ""}
              onChange={handleChange}
              required
            ></textarea>

            <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 w-1/2 mx-auto rounded-lg uppercase hover:opacity-95 disabled:opacity-50 transition-all">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
