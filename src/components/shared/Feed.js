import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { MdSwipeRight, MdSwipeLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  let navigate = useNavigate();
  const host = "http://localhost:5000";
  let slidesinitial = [
    {
      image: "",
      first_name: "Name here",
      last_name: "",
      age: "Age here",
      dist: "Distance",
      gender: "Gender here",
      preference: "Preferance",
      bio: "Bio",
    },
  ];

  const [slides, setSlides] = useState(slidesinitial);
  //Get All profile data except your own
  const getAllProfile = async () => {
    //API call
    const response = await fetch(`${host}/api/profile/getallprofile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json);
    if (json.success) {
      setSlides(json.profiles);
    } else {
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const findage = (dob) => {
    dob = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();

    // Adjust the age based on the month and day
    if (
      today.getMonth() < dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
    ) {
      age--;
    }
    return age;
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setIsFlipped(false); // Reset flip state when changing slide
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setIsFlipped(false); // Reset flip state when changing slide
  };

  const handleImageClick = () => {
    setIsFlipped(!isFlipped); // Toggle flip state on image click
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllProfile();
      // console.log(slides);
    } else {
      navigate("/Login");
    }
    // eslint-disable-next-line
  }, [slides]);
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-center h-full relative w-full">
        <div
          style={{
            width: "30vw",
            height: "80vh",
            // borderRadius: "20px",
            transition: "transform 0.6s ease",
            position: "relative",
            // transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)", // Apply the flip effect
          }}
          id="pop-up1"
          className="absolute left-0 border-red-200 border-double mr-60 w-1/2 h-4/5 rounded-2xl bg-gradient-to-br from-red-150 via-red-150 to-yellow-50 duration-500 shadow-2xl shadow-black/100 inline-grid items-top"
        >
          <span className="w-full items-center text-center mt-6 text-black/90 text-4xl">
            CURRENT MATCHES 💓
          </span>
          <span className="cursor-pointer hover:scale-125 transition-all duration-150 ease-out w-full  items-center text-center mt-10 text-black/70 text-2xl">
            Leslie Grey
          </span>
          <span className="cursor-pointer hover:scale-125 transition-all duration-150 ease-out w-full  items-center text-center mt-6 text-black/70 text-2xl">
            Alisha Ray
          </span>
          <span className="cursor-pointer hover:scale-125 transition-all duration-150 ease-out w-full items-center text-center mt-6 text-black/70 text-2xl">
            Anna Kubov
          </span>
        </div>
        <div className="text-5xl text-red-200 mr-5 hover:cursor-pointer hover:scale-150 transition-all duration-150 ease-out hover:text-red-400 transform hover:-rotate-45">
          <MdSwipeLeft />
        </div>

        <div
          id="pop-up2"
          className="flex justify-center items-center h-4/5 w-1/3 relative group"
        >
          {/* Left Arrow */}
          <div className="hidden group-hover:block absolute left-0.5 text-2xl rounded-full m-2 p-2 z-10 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactLeft onClick={prevSlide} size={30} />
          </div>
          {/* Card Container */}
          <div
            onClick={handleImageClick}
            style={{
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)", // Apply the flip effect
            }}
            className={`w-full h-full rounded-2xl relative transform transition-transform ease-in-out duration-500`}
          >
            {/* Front side (Image) */}
            <div
              style={{
                backgroundImage:
                  slides === [] ? "" : `url(${slides[currentIndex].image[0]})`,
              }}
              className={`${
                isFlipped ? "hidden" : "block"
              } bg-cover bg-center bg-no-repeat w-full h-full rounded-2xl shadow-2xl shadow-black/100 text-center flex justify-center items-center backdrop-blur-md `}
            >
              <div
                onClick={() => {
                  navigate(`/ViewProfile/${slides[currentIndex]._id}`);
                }}
                id=" short_bio"
                className=" hidden group-hover:block absolute bottom-0 p-10 mx-auto text-white cursor-pointer backdrop-blur-sm w-full rounded-2xl "
              >
                <span className=" overflow-hidden text-xl backdrop-blur-lg font-medium ">
                  {slides[currentIndex].first_name +
                    " " +
                    slides[currentIndex].last_name}
                </span>
                {/* <span className=" ml-5 text-lg overflow-hidden hidden lg:inline-flex">
                  {findage(slides[currentIndex].date_of_birth)}
                </span> */}
                <span className=" ml-28 text-xl overflow-hidden hidden 2xl:inline-flex backdrop:blur-lg font-medium">
                  {findage(slides[currentIndex].date_of_birth) + " Years"}
                </span>
              </div>
            </div>

            {/* Back side (Text) */}
            <div
              style={{
                display: isFlipped ? "block" : "none",
                textAlign: "center",
                width: "100%",
                height: "100%",
                borderRadius: "20px",
                backgroundColor: "#f2f2f2",
                padding: "20px",
                boxSizing: "border-box",
                transform: "rotateY(180deg)",
                position: "absolute",
                top: 0,
                left: 0,
              }}
              className="shadow-2xl shadow-black/100 bg-gradient-to-br from-red-50 via-red-100 to-yellow-100 "
            >
              {/* <div class="py-50">{slides[currentIndex].text}</div> */}
              <div className="mt-[5rem] w-full">
                <p className=" text-black/90 text-lg lg:text-3xl mt-6 font-bold overflow-clip py-2">
                  Rahul Gupta
                </p>
                <p className=" text-black/80 text-lg lg:text-3xl mt-6 overflow-clip py-2 ">
                  29
                </p>
                <p className=" text-black/70 text-lg lg:text-3xl mt-6 overflow-clip py-2 ">
                  They/Them
                </p>
                <p className=" text-black/60 text-lg lg:text-3xl mt-6 overflow-clip py-2 ">
                  Prefers Horny Men
                </p>
                <p className=" text-black/50 text-lg lg:text-2xl mt-6  hidden lg:block py-2 italic ">
                  " {slides[currentIndex].bio} "
                </p>
                <p>
                  <button
                    onClick={() => {
                      navigate(`/ViewProfile/${slides[currentIndex]._id}`);
                    }}
                    className="hidden mt-8 w-1/2 right-32 lg:inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 dark:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                  >
                    <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      View Full Profile
                    </span>
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <div className="hidden group-hover:block absolute right-0.5 text-2xl rounded-full p-2 m-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactRight onClick={nextSlide} size={30} />
          </div>
        </div>
        <div className="text-5xl text-red-200 ml-5 hover:cursor-pointer hover:scale-150 transition-all duration-150 ease-out hover:text-red-400 transform hover:rotate-45">
          <MdSwipeRight />
        </div>
      </div>
    </>
  );
};

export default Feed;
