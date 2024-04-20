import { useState, useEffect, useContext, useRef} from "react";
import { toast } from "react-toastify";
import { authContext } from "../../context/AuthContext";
import HashLoader from "react-spinners/HashLoader";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";

const BookAppointment = ({ openModal, setOpenModal, doctorId }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);
  const tokenRef = useRef(null);

  const [formData, setFormData] = useState({
    appointmentTime: "",
    appointmentDate: "",
    doctorId,
  });

  useEffect(() => {
    tokenRef.current = localStorage.getItem('token');
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
     setLoading(true);
     try {
      const combinedDateTime = `${formData.appointmentDate}T${formData.appointmentTime}:00.000Z`;
      const res = await fetch(`${BASE_URL}/users/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${tokenRef.current}`,
      },
    body: JSON.stringify({
      doctorId: formData.doctorId,
      appointmentDateTime: combinedDateTime,
    }),
  
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({
        type: "UPDATE_USER",
        payload: {
          user: result.user,
        },
      });

      setLoading(false);
      toast.success("Appointment booked successfully. Awaiting approval");
    } catch (error) {
      toast.error("Failed to book");
      setLoading(false);
    }
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-1/2">
        <div className="flex flex-col items-start p-4">
          <div className="flex items-center w-full">
            <div className="text-lg font-medium text-gray-900">Book</div>
            <svg
              className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              onClick={() => setOpenModal()}
            >
              <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12 5.7 16.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.41z" />
            </svg>
          </div>

          <form
            className="w-full max-w-xl bg-white rounded-lg px-4 pt-2"
            onSubmit={submitHandler}
          >
            <div className="flex flex-wrap -mx-3 mb-6 w-full">
              <div className="mb-5 w-full">
                <p className="form__label">Appointment Time* </p>
                <input
                  type="time"
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  className="form__input"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-5 w-full">
                <p className="form__label">Appointment Date* </p>
                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  className="form__input"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                  {loading ? <HashLoader size={25} color="#fff" /> : "Book Appointment"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
