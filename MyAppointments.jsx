import React, { useEffect, useState, useRef } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY_ID);

const CheckoutForm = ({ clientSecret, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe has not loaded yet. Please try again.");
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:5173/payment-success',
      },
    });

    if (error) {
      console.error("Payment failed:", error.message);
      toast.error("Payment failed. Please try again.");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log("Payment successful!");
      toast.success("Payment successful!");
      onPaymentSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-800"
      >
        Pay Now
      </button>
    </form>
  );
};

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [paymentClientSecret, setPaymentClientSecret] = useState(null);
  const [payingAppointmentId, setPayingAppointmentId] = useState(null);

  const paymentSectionRef = useRef(null);

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const slotDateFormate = (slotDate) => {
    const dateArray = slotDate.split("_");
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", { headers: { token } });
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/cancel-appointment", { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const appointmentstripePay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/payment-stripe", { appointmentId }, { headers: { token } });
      console.log("Payment stripe response:", data);
      if (data.success && data.clientSecret) {
        setPaymentClientSecret(data.clientSecret);
        setPayingAppointmentId(appointmentId);
      } else {
        toast.error(data.message || "Failed to initiate payment.");
      }
    } catch (error) {
      console.error("Error in appointmentstripePay:", error);
      toast.error(error.message);
    }
  };

  const onPaymentSuccess = async (appointmentId) => {
    try {
        const { data } = await axios.post(backendUrl + '/api/user/confirm-payment', { appointmentId }, { headers: { token } });

        if (data.success) {
            toast.success(data.message);

            // Update the local state to mark the appointment as paid
            setAppointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment._id === appointmentId ? { ...appointment, paid: true } : appointment
                )
            );
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.error("Error in onPaymentSuccess:", error.message);
        toast.error(error.message);
    }

    setPaymentClientSecret(null);
    setPayingAppointmentId(null);
    getUserAppointments();
    getDoctorsData();
  };

  const handleChatWithDoctor = (doctorId, appointmentId) => {
    navigate(`/doctor-appointment-chat/${doctorId}/${appointmentId}`);
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  useEffect(() => {
    if (paymentClientSecret && paymentSectionRef.current) {
      paymentSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [paymentClientSecret]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-800 border-b">My Appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div className="grid grid-cols-[1fr_3fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
            <div>
              <img className="w-32 bg-slate-300" src={item.docData.image} alt="" />
            </div>
            <div className="flex-1 text-sm text-zinc-800">
              <p className="text-neutral-900 font-semibold">{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-900 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-900 font-medium">Date & Time:</span>{" "}
                {slotDateFormate(item.slotDate)} | {item.slotTime}{" "}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && !item.paid && (
                <button
                  disabled={!!paymentClientSecret}
                  onClick={() => appointmentstripePay(item._id)}
                  className="text-sm text-stone-800 text-center sm:min-w-48 py-2 border rounded hover:bg-slate-700 hover:text-white transition-all duration-300"
                >
                  Pay Online
                </button>
              )}
              {!item.cancelled && item.paid && (
                <button disabled className="text-sm text-white text-center sm:min-w-48 py-2 border rounded bg-green-700 cursor-not-allowed">
                  Payment Done
                </button>
              )}
              
              {/* Chat with Doctor button */}
              <button
                onClick={() => handleChatWithDoctor(item.docData._id, item._id)}
                className="text-sm text-stone-800 text-center sm:min-w-48 py-2 border rounded hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Chat with Doctor
              </button>
              
              {/* Audio Call with Doctor button */}
              <button
                onClick={() => window.open('https://meet.google.com/bpn-pywx-ywi', '_blank')}
                className="text-sm text-stone-800 text-center sm:min-w-48 py-2 border rounded hover:bg-green-600 hover:text-white transition-all duration-300"
              >
                Audio Call with Doctor
              </button>
              
              {!item.paid && !item.cancelled && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-800 text-center sm:min-w-48 py-2 border rounded hover:bg-red-700 hover:text-white transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              )}
              {item.cancelled && (
                <button className="text-sm text-white text-center sm:min-w-48 py-2 border rounded bg-red-700 hover:text-white transition-all duration-300">
                  Appointment Cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {paymentClientSecret && (
        <div ref={paymentSectionRef} className="mt-6 p-4 border rounded bg-gray-100">
          <Elements stripe={stripePromise} options={{ clientSecret: paymentClientSecret }}>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Complete Your Payment</h3>
            <CheckoutForm clientSecret={paymentClientSecret} onPaymentSuccess={onPaymentSuccess} />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
