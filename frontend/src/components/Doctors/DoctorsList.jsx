import { doctors } from "../../assets/data/doctors";
import DoctorsCard from "./DoctorCard";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

const DoctorsList = () => {
  const { data:doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`);
  return (
    <>
      {loading && <Loading />}
      {error && <Error />}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
          {doctors.map((doctor) => (
            <DoctorsCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}
    </>
  );
};

export default DoctorsList;
