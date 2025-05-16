import React, { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import doctorIcon from "../../assets/doctor_icon.svg"; // Import assets
import appointmentsIcon from "../../assets/appointments_icon.svg";
import patientsIcon from "../../assets/patients_icon.svg";
import listIcon from "../../assets/list_icon.svg";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div>
        <div className="m-5">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 bordr-gray-100 cursor-pointer hover:scale-105 transition-all">
              <img className="w-14" src={doctorIcon} alt="Doctor Icon" />
              <div>
                <p className="text-xl font-semibold text-gray-600">{dashData.doctors}</p>
                <p className="text-gray-400">Doctors</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 bordr-gray-100 cursor-pointer hover:scale-105 transition-all">
              <img className="w-14" src={appointmentsIcon} alt="Appointments Icon" />
              <div>
                <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
                <p className="text-gray-400">Appointments</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 bordr-gray-100 cursor-pointer hover:scale-105 transition-all">
              <img className="w-14" src={patientsIcon} alt="Patients Icon" />
              <div>
                <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
                <p className="text-gray-400">Patients</p>
              </div>
            </div>
          </div>

          <div className="bg-white">
            <div className="flex items-center gap-2.5 px-4 py4 mt-10 rounded-t border">
              <img src={listIcon} alt="List Icon" />
              <p className="font-semibold">Latest Bookings</p>
              <div className="pt-4 border border-t-0">
                {dashData.latestAppointments.map((item, index) => (
                  <div key={index}>
                    <img src={item.docData.image} alt="Doctor" />
                    <div>
                      <p>{item.docData.name}</p>
                      <p>{item.slotDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;