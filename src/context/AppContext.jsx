// import { createContext, useEffect, useState } from "react";
// // import { doctors } from "../assets/assets";
// import axios from "axios";


// export const AppContext = createContext()

// const AppContextProvider = (props) => {

//     const currencySymbol = "$"
//     const backendUrl  = import.meta.env.VITE_BACKEND_URL
//     const [doctors, setDoctors] = useState([])
    
//     const value = {doctors, currencySymbol}
//     return (
//         <AppContext.Provider value = {value}>
//             {props.children}
//         </AppContext.Provider>
//     )
// }

// const getDoctorsData = async () => {
//     try {

//         const {data} = await axios.get(backendUrl + "/api/doctor/list")
//         if (data.success) {
//             setDoctors(data.data)
            
//         }
        
//     } catch (error) {
//         console.log(error);
        
        
//     }
// }

// useEffect(()=> {
//     getDoctorsData()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [])

// export default AppContextProvider


/////////////////////////////////////////////////////// 


import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = "$";
    const backendUrl = import.meta.env.VITE_BACKEND_URL; // Ensure this is set in your .env file
    const [doctors, setDoctors] = useState([]);
    const [token,setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token') : false )
    const [userData,setUserData] = useState(false)

    // Function to fetch doctors data
    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/doctor/list");
            if (data.success) {
                setDoctors(data.doctors)
            }else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log( error)
            toast.error(error.message)
        }
    };

    const loadUserProfileData = async () => {

        try {

            const {data} = await axios.get(backendUrl + "/api/user/get-profile", {headers: {token}})

            if (data.success) {
                setUserData(data.userData)
                
            } else {
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

    const value = {
        doctors, getDoctorsData,
        currencySymbol,
        token,setToken,
        backendUrl,
        userData,setUserData,
        loadUserProfileData,
       };

    // Fetch doctors data on component mount
    useEffect(() => {
        getDoctorsData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        if (token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
  
        

    }, [token])



    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;