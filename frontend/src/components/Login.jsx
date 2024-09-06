// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { FiLogIn } from "react-icons/fi";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import { baseApiURL } from "../baseUrl";
// const Login = () => {
//   const navigate = useNavigate();
//   const [selected, setSelected] = useState("Student");
//   const { register, handleSubmit } = useForm();
//   const onSubmit = (data) => {
//     if (data.login !== "" && data.password !== "") {
//       const headers = {
//         "Content-Type": "application/json",
//       };
//       axios
//         .post(`${baseApiURL()}/${selected.toLowerCase()}/auth/login`, data, {
//           headers: headers,
//         })
//         .then((response) => {
//           navigate(`/${selected.toLowerCase()}`, {
//             state: { type: selected, loginid: response.data.loginid },
//           });
//         })
//         .catch((error) => {
//           toast.dismiss();
//           console.error(error);
//           toast.error(error.response.data.message);
//         });
//     } else {
//     }
//   };
//   return (
//     <div className="h-[100vh] w-full flex-column justify-between items-center" style={{backgroundColor:"#def5f5"}}>
//       <div style={{display:"flex"}}>
//         <img style={{height:"90px", width:"90px", marginLeft:"15px"}}
//         src="https://static.thenounproject.com/png/5423870-200.png"/>
//         <h1 style={{width: "580px", fontSize:"2.2rem", fontWeight:"bold", color:"red", marginLeft:"0.001rem", textAlign:"center", marginTop:"1.45rem", textShadow:"1px 2px 2px #000000", letterSpacing:"0.03rem"}}>
//           Learning Management System
//           </h1>
//       </div>
//       <div style={{display:"flex", flexDirection:"row"}}>
//       <img
//         className="w-[60%] h-[85.5vh] object-cover" style={{marginTop: "15px", borderRadius:"0.9rem"}}
//         src="https://images.unsplash.com/photo-1583526241256-cb18e8635e5b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         alt=""
//       />
//       <div className="w-[40%] flex justify-center items-start flex-col pl-8">
//         <p className="text-3xl font-semibold pb-2 border-b-2 border-green-500">
//           {selected && selected} Login
//         </p>
//         <form
//           className="flex justify-center items-start flex-col w-full mt-10"
//           onSubmit={handleSubmit(onSubmit)}
//         >
//           <div className="flex flex-col w-[70%]">
//             <label className="mb-1" htmlFor="eno">
//               {selected && selected} Login ID
//             </label>
//             <input
//               type="number"
//               id="eno"
//               required
//               className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
//               {...register("loginid")}
//             />
//           </div>
//           <div className="flex flex-col w-[70%] mt-3">
//             <label className="mb-1" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               required
//               className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
//               {...register("password")}
//             />
//           </div>
//           <button className="bg-blue-500 mt-5 text-white px-6 py-2 text-xl rounded-md hover:bg-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all flex justify-center items-center">
//             Login
//             <span className="ml-2">
//               <FiLogIn />
//             </span>
//           </button>
//         </form>
//       </div>
//       <div className="absolute top-4 right-4">
//         <button
//           className={`text-blue-500 mr-6 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
//             selected === "Student" && "border-b-2 border-green-500"
//           }`}
//           onClick={() => setSelected("Student")}
//         >
//           Student
//         </button>
//         <button
//           className={`text-blue-500 mr-6 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
//             selected === "Faculty" && "border-b-2 border-green-500"
//           }`}
//           onClick={() => setSelected("Faculty")}
//         >
//           Faculty
//         </button>
//         <button
//           className={`text-blue-500 mr-6 text-base font-semibold hover:text-blue-700 ease-linear duration-300 hover:ease-linear hover:duration-300 hover:transition-all transition-all ${
//             selected === "Admin" && "border-b-2 border-green-500"
//           }`}
//           onClick={() => setSelected("Admin")}
//         >
//           Admin
//         </button>
//       </div>
//       <Toaster position="bottom-center" />
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { baseApiURL } from "../baseUrl";

const Login = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Student");
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (data.loginid !== "" && data.password !== "") {
      const headers = {
        "Content-Type": "application/json",
      };

      axios
        .post(`${baseApiURL()}/${selected.toLowerCase()}/auth/login`, data, {
          headers: headers,
        })
        .then((response) => {
          navigate(`/${selected.toLowerCase()}`, {
            state: { type: selected, loginid: response.data.loginid },
          });
        })
        .catch((error) => {
          toast.dismiss();
          console.error(error);
          toast.error(error.response.data.message);
        });
    } else {
      // Handle empty fields error if necessary
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="relative sm:max-w-sm sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-lg"></div>
        <div className="relative bg-white shadow-lg sm:rounded-lg sm:px-10 py-10">
          <div className="mb-8">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Language Learning App
            </h2>
          </div>
          <div className="flex justify-center mb-8">
            <div className="relative rounded-lg border border-gray-300 bg-white divide-x divide-gray-300">
              <button
                onClick={() => setSelected("Student")}
                className={`${
                  selected === "Student"
                    ? "text-white bg-blue-600"
                    : "text-gray-700"
                } relative w-1/2 px-6 py-3 focus:outline-none`}
              >
                Student
              </button>
              <button
                onClick={() => setSelected("Admin")}
                className={`${
                  selected === "Admin"
                    ? "text-white bg-blue-600"
                    : "text-gray-700"
                } relative w-1/2 px-6 py-3 focus:outline-none`}
              >
                Admin
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="loginid" className="sr-only">
                {selected} Login ID
              </label>
              <input
                id="loginid"
                name="loginid"
                type="number"
                autoComplete="loginid"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={`${selected} Login ID`}
                {...register("loginid")}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                {...register("password")}
              />
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FiLogIn
                    className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                    aria-hidden="true"
                  />
                </span>
                Login
              </button>
            </div>
          </form>
          <Toaster position="bottom-center" />
        </div>
      </div>
    </div>
  );
};

export default Login;


