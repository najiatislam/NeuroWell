import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllApointmets = () => {
  const { aToken, appointments, getAllAppointments,cancelAppointment} = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Add gap between columns */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b gap-4">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p className="text-right">Fees</p>
          <p>Action</p>
        </div>
        {appointments &&
          appointments.map((item, index) => (
            <div
              className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50 gap-4"
              key={index}
            >
              <p className="max-sm:hidden">{index + 1}</p>
              <div className="flex items-center gap-2">
                <img className="w-8 rounded-full" src={item.userData.image} alt="Patient" />
                <p>{item.userData.name}</p>
              </div>
              <p>{calculateAge(item.userData.birthDate)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <div className="flex items-center gap-2">
                <img className="w-8 rounded-full bg-gray-200" src={item.docData.image} alt="Doctor" />
                <p>{item.docData.name}</p>
              </div>
              {/* Display fees with a dollar sign and align it to the right */}
              <p className="text-right">{currency || "$"}{item.amount}</p>
              <div className="flex justify-center">
              {item.cancelled
              ? <p className="text-red-400 text">Cancelled</p>
            : <img onClick={()=>cancelAppointment(item._id)} className="w-10 cursor-pointer" src={assets.cancel_icon} alt="Cancel" />
            }
            
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllApointmets;