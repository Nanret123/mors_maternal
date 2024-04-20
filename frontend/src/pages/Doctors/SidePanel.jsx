import { useState, useContext } from "react";
import { convertTime } from "../../utils/convertTime";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import { authContext } from "../../context/AuthContext";
import HashLoader from 'react-spinners/HashLoader';
import { Link, useNavigate } from "react-router-dom";
import BookAppointment from "./BookAppointment";


const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {

  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  
  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Ticket Price </p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {ticketPrice} Naira
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text-para mt-0 font-semibold text-headingColor">
          Available slots
        </p>

        <ul className="mt-[30px]">
          {timeSlots?.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {convertTime(item.startingTime)} -
                {convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <button className="btn px-2 w-full rounded-md" onClick={() => setOpenModal(true)}>Book Appointment</button>
      {/* <button onClick={createAppointment}  type="submit" className="btn px-2 w-full rounded-md">
             
              { loading ? <HashLoader size={25} color="#fff" /> :  "Book Appointment"}
            </button> */}
      {openModal && <BookAppointment openModal={openModal} setOpenModal={setOpenModal} doctorId={doctorId} />}
    </div>
  );
};

export default SidePanel;
