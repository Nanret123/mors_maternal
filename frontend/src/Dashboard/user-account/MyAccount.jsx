import { useContext, useState, useEffect } from "react";
import userImg from "../../assets/images/doctor-img01.png";
import { authContext } from "../../context/AuthContext";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL, token } from "../../config";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

const MyAccount = () => {
  const [userData, setUserData] = useState(null);
  const { dispatch, user: userContext } = useContext(authContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [tab, setTab] = useState("bookings");

  const getProfile = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/users/profile/me`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userContext.token}`,
        },
      });

      if (!res.ok) setError("Failed To Fetch Profile");

      const userData = await res.json();
      const data = userData.data;
      setUserData(data);
      setLoading(false)
    } catch (err) {
      setLoading(false);
      <Error errorMessage={error} />;
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading/> }



        { error && !loading && <Error errorMessage={error}/> }

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                  <img
                    src={userData?.photo}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {userData?.name}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  {userData?.email}
                </p>
              </div>

              <div className="mt-[50px] md:mt-[100px]">
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#181A1E] text-white p-3 text-[16px] leading-7 rounded-md"
                >
                  Logout
                </button>
                <button className="mt-[10px] w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md text-white">
                  Delete account
                </button>
              </div>
            </div>

            <div className="md:col-span-2 md:px-[30px]">
              <div>
                <button
                  onClick={() => setTab("bookings")}
                  className={`${
                    tab === "bookings" &&
                    `bg-primaryColor text-white font-normal`
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  My Bookings
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className={`${
                    tab === "settings" &&
                    `bg-primaryColor text-white font-normal`
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>
              </div>
               
              {tab === "bookings" && <MyBookings />}
              {tab === "settings" && <Profile user={userData} />}
            </div>
          </div>
         )}
      </div>
    </section>
  );
};

export default MyAccount;
