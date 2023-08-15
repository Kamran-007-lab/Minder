import React, { useContext, useEffect } from "react";
import NavbarLoggedIn from "../components/shared/NavbarLoggedIn";
import Banner from "../components/shared/Banner";
import Nav from "../components/shared/Nav";
import AccountSettings from "../components/shared/AccountSettings";
import Gallery from "../components/shared/Gallery";
import Footer from "../components/shared/Footer";
import temppic from "../images/bgm1.jpg";
import profileContext from "../context/profiles/profileContext";
import { useNavigate } from "react-router-dom";
// import AccountSettings from "./AccountSettings";

const MyProfile = () => {
  let navigate = useNavigate();
  const context = useContext(profileContext);
  const { profile, getProfile } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getProfile();
    } else {
      navigate("/Login");
    }
    // eslint-disable-next-line
  }, [profile]);

  if (!profile) {
    // Loading state while profile data is being fetched
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavbarLoggedIn />
      <div className="bg-site bg-no-repeat bg-cover overflow-hidden bg-gradient-to-br from-red-50 via-red-100 to-yellow-100 py-20 px-3 w-full">
      {/* <NavbarLoggedIn /> */}
        <Banner/>
        <Nav/>
        <AccountSettings/>
        <Gallery/>
        {/* <div className="h-[4000px]"></div> */}

      </div>
      {/* <div className="border-2 border-black w-4/6 mx-auto h-screen p-10">
        <div className="flex w-full justify-center items-center">
          <img src={temppic} alt="Profile Pic" className="w-40 rounded-full" />
        </div>
        <div className="text-5xl font-semibold w-full text-center mt-7">
          {profile ? profile.username : "Your username here"}
        </div>
        <div className="w-full flex justify-center my-5 mt-16">
          <div className="mx-10 border-2 border-dotted border-slate-500 rounded-lg relative right- py-3 px-10">
            {profile ? profile.first_name : "First here"}
          </div>
          <div className="mx-10 border-2 border-dotted border-slate-500 rounded-lg relative left- py-3 px-10">
            {profile ? profile.last_name : "Last name here"}
          </div>
        </div>
      </div> */}
      <Footer />
    </>
  );
};

export default MyProfile;
