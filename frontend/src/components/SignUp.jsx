// import React, { useEffect, useState, useRef } from "react";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { storage } from "../firebase/config";
// import { baseApiURL } from "../baseUrl";
// import { FiUpload } from "react-icons/fi";
// import emailjs from '@emailjs/browser';
// const Signup = () => {
//   const [file, setFile] = useState();
//   const [branch, setBranch] = useState();
//   const [data, setData] = useState({
//     enrollmentNo: "",
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     language: "",
//     profile: "",
//   });
//   const getBranchData = () => {
//     const headers = {
//       "Content-Type": "application/json",
//     };
//     axios
//       .get(`${baseApiURL()}/branch/getBranch`, { headers })
//       .then((response) => {
//         if (response.data.success) {
//           setBranch(response.data.branches);
//         } else {
//           toast.error(response.data.message);
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   useEffect(() => {
//     const uploadFileToStorage = async (file) => {
//       toast.loading("Upload Photo To Storage");
//       const storageRef = ref(
//         storage,
//         `Student Profile/${data.branch}/${data.semester} Semester/${data.enrollmentNo}`
//       );
//       const uploadTask = uploadBytesResumable(storageRef, file);
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {},
//         (error) => {
//           console.error(error);
//           toast.dismiss();
//           toast.error("Something Went Wrong!");
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             toast.dismiss();
//             setFile();
//             toast.success("Profile Uploaded To Storage");
//             setData({ ...data, profile: downloadURL });
//           });
//         }
//       );
//     };
//     file && uploadFileToStorage(file);
//   }, [data, file]);

//   useEffect(() => {
//     getBranchData();
//   }, []);

//   const addStudentProfile = (e) => {
//     e.preventDefault();
//     toast.loading("Adding Student");
//     const headers = {
//       "Content-Type": "application/json",
//     };
//     axios
//       .post(`${baseApiURL()}/student/details/addDetails`, data, {
//         headers: headers,
//       })
//       .then((response) => {
//         toast.dismiss();
//         if (response.data.success) {
//           toast.success(response.data.message);
//           sendEmail();
//           axios
//             .post(
//               `${baseApiURL()}/student/auth/register`,
//               { loginid: data.enrollmentNo, password: 112233 },
//               {
//                 headers: headers,
//               }
//             )
//             .then((response) => {
//               toast.dismiss();
//               if (response.data.success) {
//                 toast.success(response.data.message);
//                 setFile();
//                 setData({
//                   enrollmentNo: "",
//                   firstName: "",
//                   middleName: "",
//                   lastName: "",
//                   email: "",
//                   phoneNumber: "",
//                   language: "",
//                   profile: "",
//                 });
//               } else {
//                 toast.error(response.data.message);
//               }
//             })
//             .catch((error) => {
//               toast.dismiss();
//               toast.error(error.response.data.message);
//             });
//         } else {
//           toast.error(response.data.message);
//         }
//       })
//       .catch((error) => {
//         toast.dismiss();
//         toast.error(error.response.data.message);
//       });
//   };

//   const form = useRef();

//   const sendEmail = () => {
//     const templateParams = {
//       studentname: data.firstName,
//       to: data.email, 
//       enrollmentnumber : data.enrollmentNo,
//     };
//     emailjs.send('service_6iw3a5k', 'template_smqt6hq', templateParams, '-HQ_08N7f1ml_-oOK')
//       .then((result) => {
//           console.log(result.text);
//       }, (error) => {
//           console.log(error.text);
//       });
//   };

//   return (
//     <form
//       onSubmit={(e) => {
//         addStudentProfile(e);
//       }}
//       ref={form}
//       className="w-[70%] flex justify-center items-center flex-wrap gap-6 mx-auto mt-10"
//     >
//       <div className="w-[40%]">
//         <label htmlFor="firstname" className="leading-7 text-sm ">
//           Enter First Name<span className="text-red-500">*</span>
//         </label>
//         <input
//           type="text"
//           id="firstname"
//           value={data.firstName}
//           onChange={(e) => setData({ ...data, firstName: e.target.value })}
//           className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//         />
//       </div>
//       <div className="w-[40%]">
//         <label htmlFor="middlename" className="leading-7 text-sm ">
//           Enter Middle Name
//         </label>
//         <input
//           type="text"
//           id="middlename"
//           value={data.middleName}
//           onChange={(e) => setData({ ...data, middleName: e.target.value })}
//           className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//         />
//       </div>
//       <div className="w-[40%]">
//         <label htmlFor="lastname" className="leading-7 text-sm ">
//           Enter Last Name<span className="text-red-500">*</span>
//         </label>
//         <input
//           type="text"
//           id="lastname"
//           value={data.lastName}
//           onChange={(e) => setData({ ...data, lastName: e.target.value })}
//           className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//         />
//       </div>
//       <div className="w-[40%]">
//         <label htmlFor="enrollmentNo" className="leading-7 text-sm ">
//           Enter Enrollment No<span className="text-red-500">*</span>
//         </label>
//         <input
//           type="number"
//           id="enrollmentNo"
//           value={data.enrollmentNo}
//           onChange={(e) => setData({ ...data, enrollmentNo: e.target.value })}
//           className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//         />
//       </div>
//       <div className="w-[40%]">
//         <label htmlFor="email" className="leading-7 text-sm ">
//           Enter Email Address<span className="text-red-500">*</span>
//         </label>
//         <input
//           type="email"
//           id="email"
//           value={data.email}
//           onChange={(e) => setData({ ...data, email: e.target.value })}
//           className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//         />
//       </div>
//       <div className="w-[40%]">
//         <label htmlFor="phoneNumber" className="leading-7 text-sm ">
//           Enter Phone Number<span className="text-red-500">*</span>
//         </label>
//         <input
//           type="number"
//           id="phoneNumber"
//           value={data.phoneNumber}
//           onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
//           className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//         />
//       </div>
//       <div className="w-[40%]">
//         <label htmlFor="branch" className="leading-7 text-sm ">
//           Select Language<span className="text-red-500">*</span>
//         </label>
//         <select
//           id="branch"
//           className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
//           value={data.language}
//           onChange={(e) => setData({ ...data, language: e.target.value })}
//         >
//           <option defaultValue>-- Select --</option>
//           {branch?.map((branch) => {
//             return (
//               <option value={branch.name} key={branch.name}>
//                 {branch.name}
//               </option>
//             );
//           })}
//         </select>
//       </div>
//       <div className="w-[40%]">
//         <label htmlFor="file" className="leading-7 text-sm ">
//           Select Profile
//         </label>
//         <label
//           htmlFor="file"
//           className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full flex justify-center items-center cursor-pointer"
//         >
//           Upload
//           <span className="ml-2">
//             <FiUpload />
//           </span>
//         </label>
//         <input
//           hidden
//           type="file"
//           id="file"
//           accept="image/*"
//           onChange={(e) => setFile(e.target.files[0])}
//         />
//       </div>
//       {data.profile && (
//         <div className="w-full flex justify-center items-center">
//           <img src={data.profile} alt="student" className="h-36" />
//         </div>
//       )}
//       <button
//         type="submit"
//         className="bg-blue-500 px-6 py-3 rounded-sm mb-6 text-white"
//       >
//         Add New Student
//       </button>
//     </form>
//   );
// };

// export default Signup;
// import React, { useEffect, useState, useRef } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { storage } from "../firebase/config";
// import { baseApiURL } from "../baseUrl";
// import { FiUpload } from "react-icons/fi";
// import emailjs from '@emailjs/browser';

// const Signup = () => {
//   const [file, setFile] = useState();
//   const [branch, setBranch] = useState();
//   const [data, setData] = useState({
//     enrollmentNo: "",
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     language: "",
//     profile: "",
//   });

//   // Fetch branch data from API
//   const getBranchData = () => {
//     const headers = {
//       "Content-Type": "application/json",
//     };
//     axios
//       .get(`${baseApiURL()}/branch/getBranch`, { headers })
//       .then((response) => {
//         if (response.data.success) {
//           setBranch(response.data.branches);
//         } else {
//           toast.error(response.data.message);
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   // Upload file to Firebase storage
//   useEffect(() => {
//     const uploadFileToStorage = async (file) => {
//       toast.loading("Uploading Profile Photo...");
//       const storageRef = ref(
//         storage,
//         `Student Profile/${data.branch}/${data.semester} Semester/${data.enrollmentNo}`
//       );
//       const uploadTask = uploadBytesResumable(storageRef, file);
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {},
//         (error) => {
//           console.error(error);
//           toast.dismiss();
//           toast.error("Something went wrong while uploading!");
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             toast.dismiss();
//             setFile();
//             toast.success("Profile Photo Uploaded!");
//             setData({ ...data, profile: downloadURL });
//           });
//         }
//       );
//     };
//     file && uploadFileToStorage(file);
//   }, [data, file]);

//   // Fetch branch data on component mount
//   useEffect(() => {
//     getBranchData();
//   }, []);

//   // Add new student profile
//   const addStudentProfile = (e) => {
//     e.preventDefault();
//     toast.loading("Adding Student...");
//     const headers = {
//       "Content-Type": "application/json",
//     };
//     axios
//       .post(`${baseApiURL()}/student/details/addDetails`, data, { headers: headers })
//       .then((response) => {
//         toast.dismiss();
//         if (response.data.success) {
//           toast.success(response.data.message);
//           sendEmail(); // Send confirmation email
//           axios
//             .post(
//               `${baseApiURL()}/student/auth/register`,
//               { loginid: data.enrollmentNo, password: 112233 },
//               { headers: headers }
//             )
//             .then((response) => {
//               toast.dismiss();
//               if (response.data.success) {
//                 toast.success(response.data.message);
//                 setFile();
//                 setData({
//                   enrollmentNo: "",
//                   firstName: "",
//                   middleName: "",
//                   lastName: "",
//                   email: "",
//                   phoneNumber: "",
//                   language: "",
//                   profile: "",
//                 });
//               } else {
//                 toast.error(response.data.message);
//               }
//             })
//             .catch((error) => {
//               toast.dismiss();
//               toast.error(error.response.data.message);
//             });
//         } else {
//           toast.error(response.data.message);
//         }
//       })
//       .catch((error) => {
//         toast.dismiss();
//         toast.error(error.response.data.message);
//       });
//   };

//   // Email sending function using EmailJS
//   const sendEmail = () => {
//     const templateParams = {
//       studentname: data.firstName,
//       to: data.email,
//       enrollmentnumber: data.enrollmentNo,
//     };
//     emailjs.send('service_6iw3a5k', 'template_smqt6hq', templateParams, '-HQ_08N7f1ml_-oOK')
//       .then((result) => {
//         console.log(result.text);
//       }, (error) => {
//         console.log(error.text);
//       });
//   };

//   const form = useRef();

//   return (
//     <div className="signup">
//       <Toaster />
//       <form
//         onSubmit={(e) => {
//           addStudentProfile(e);
//         }}
//         ref={form}
//         className="w-[70%] flex justify-center items-center flex-wrap gap-6 mx-auto mt-10"
//       >
//         <div className="w-[40%]">
//         <label htmlFor="firstname" className="leading-7 text-sm ">
//           Enter First Name<span className="text-red-500">*</span>
//         </label>
//         <input
//           type="text"
//           id="firstname"
//           value={data.firstName}
//           onChange={(e) => setData({ ...data, firstName: e.target.value })}
//           className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//         />
//       </div>
//       <div className="w-[40%]">
//         <label htmlFor="middlename" className="leading-7 text-sm ">
//           Enter Middle Name
//         </label>
//         <input
//           type="text"
//           id="middlename"
//           value={data.middleName}
//           onChange={(e) => setData({ ...data, middleName: e.target.value })}
//           className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//         />
//       </div>
//       <div className="w-[40%]">
//         <label htmlFor="lastname" className="leading-7 text-sm ">
//           Enter Last Name<span className="text-red-500">*</span>
//         </label>
//         <input
//           type="text"
//           id="lastname"
//           value={data.lastName}
//           onChange={(e) => setData({ ...data, lastName: e.target.value })}
//           className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//         />
//       </div>
//       <div className="w-[40%]">
//         <label htmlFor="enrollmentNo" className="leading-7 text-sm ">
//           Enter Enrollment No<span className="text-red-500">*</span>
//         </label>
//         <input
//           type="number"
//           id="enrollmentNo"
//           value={data.enrollmentNo}
//           onChange={(e) => setData({ ...data, enrollmentNo: e.target.value })}
//           className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//         />
//       </div>
//       <div className="w-[40%]">
//         <label htmlFor="email" className="leading-7 text-sm ">
//           Enter Email Address<span className="text-red-500">*</span>
//         </label>
//         <input
//           type="email"
//           id="email"
//           value={data.email}
//           onChange={(e) => setData({ ...data, email: e.target.value })}
//           className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//         />
//       </div>
//       <div className="w-[40%]">
//         <label htmlFor="phoneNumber" className="leading-7 text-sm ">
//           Enter Phone Number<span className="text-red-500">*</span>
//         </label>
//         <input
//           type="number"
//           id="phoneNumber"
//           value={data.phoneNumber}
//           onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
//           className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//         />
//       </div>
//       <div className="w-[40%]">
//         <label htmlFor="branch" className="leading-7 text-sm ">
//           Select Language<span className="text-red-500">*</span>
//         </label>
//         <select
//           id="branch"
//           className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full accent-blue-700 mt-1"
//           value={data.language}
//           onChange={(e) => setData({ ...data, language: e.target.value })}
//         >
//           <option defaultValue>-- Select --</option>
//           {branch?.map((branch) => {
//             return (
//               <option value={branch.name} key={branch.name}>
//                 {branch.name}
//               </option>
//             );
//           })}
//         </select>
//       </div>
//       <div className="w-[40%]">
//         <label htmlFor="file" className="leading-7 text-sm ">
//           Select Profile
//         </label>
//         <label
//           htmlFor="file"
//           className="px-2 bg-blue-50 py-3 rounded-sm text-base w-full flex justify-center items-center cursor-pointer"
//         >
//           Upload
//           <span className="ml-2">
//             <FiUpload />
//           </span>
//         </label>
//         <input
//           hidden
//           type="file"
//           id="file"
//           accept="image/*"
//           onChange={(e) => setFile(e.target.files[0])}
//         />
//       </div>
//       {data.profile && (
//         <div className="w-full flex justify-center items-center">
//           <img src={data.profile} alt="student" className="h-36" />
//         </div>
//       )}
//       <button
//         type="submit"
//         className="bg-blue-500 px-6 py-3 rounded-sm mb-6 text-white"
//       >
//         Add New Student
//       </button>
//       </form>
//     </div>
//   );
// };
// export default Signup;


// import React, { useEffect, useState, useRef } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { storage } from "../firebase/config";
// import { baseApiURL } from "../baseUrl";
// import { FiUpload } from "react-icons/fi";
// import emailjs from '@emailjs/browser';

// const Signup = () => {
//   const [file, setFile] = useState();
//   const [branch, setBranch] = useState();
//   const [data, setData] = useState({
//     enrollmentNo: "",
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     language: "",
//     profile: "",
//   });

//   // Fetch branch data from API
//   const getBranchData = () => {
//     const headers = {
//       "Content-Type": "application/json",
//     };
//     axios
//       .get(`${baseApiURL()}/branch/getBranch`, { headers })
//       .then((response) => {
//         if (response.data.success) {
//           setBranch(response.data.branches);
//         } else {
//           toast.error(response.data.message);
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   // Upload file to Firebase storage
//   useEffect(() => {
//     const uploadFileToStorage = async (file) => {
//       toast.loading("Uploading Profile Photo...");
//       const storageRef = ref(
//         storage,
//         `Student Profile/${data.branch}/${data.semester} Semester/${data.enrollmentNo}`
//       );
//       const uploadTask = uploadBytesResumable(storageRef, file);
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {},
//         (error) => {
//           console.error(error);
//           toast.dismiss();
//           toast.error("Something went wrong while uploading!");
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             toast.dismiss();
//             setFile();
//             toast.success("Profile Photo Uploaded!");
//             setData({ ...data, profile: downloadURL });
//           });
//         }
//       );
//     };
//     file && uploadFileToStorage(file);
//   }, [data, file]);

//   // Fetch branch data on component mount
//   useEffect(() => {
//     getBranchData();
//   }, []);

//   // Add new student profile
//   const addStudentProfile = (e) => {
//     e.preventDefault();
//     toast.loading("Adding Student...");
//     const headers = {
//       "Content-Type": "application/json",
//     };
//     axios
//       .post(`${baseApiURL()}/student/details/addDetails`, data, { headers: headers })
//       .then((response) => {
//         toast.dismiss();
//         if (response.data.success) {
//           toast.success(response.data.message);
//           sendEmail(); // Send confirmation email
//           axios
//             .post(
//               `${baseApiURL()}/student/auth/register`,
//               { loginid: data.enrollmentNo, password: 112233 },
//               { headers: headers }
//             )
//             .then((response) => {
//               toast.dismiss();
//               if (response.data.success) {
//                 toast.success(response.data.message);
//                 setFile();
//                 setData({
//                   enrollmentNo: "",
//                   firstName: "",
//                   middleName: "",
//                   lastName: "",
//                   email: "",
//                   phoneNumber: "",
//                   language: "",
//                   profile: "",
//                 });
//               } else {
//                 toast.error(response.data.message);
//               }
//             })
//             .catch((error) => {
//               toast.dismiss();
//               toast.error(error.response.data.message);
//             });
//         } else {
//           toast.error(response.data.message);
//         }
//       })
//       .catch((error) => {
//         toast.dismiss();
//         toast.error(error.response.data.message);
//       });
//   };

//   // Email sending function using EmailJS
//   const sendEmail = () => {
//     const templateParams = {
//       studentname: data.firstName,
//       to: data.email,
//       enrollmentnumber: data.enrollmentNo,
//     };
//     emailjs.send('service_6iw3a5k', 'template_smqt6hq', templateParams, '-HQ_08N7f1ml_-oOK')
//       .then((result) => {
//         console.log(result.text);
//       }, (error) => {
//         console.log(error.text);
//       });
//   };

//   const form = useRef();

//   return (
//     <div className="signup-container w-[70%] mx-auto mt-10">
//       <Toaster />
//       <h2 className="text-center text-2xl font-bold mb-4">SignUp</h2>
//       <div className="signup-form border rounded-lg shadow-md p-6">
//         <form
//           onSubmit={(e) => {
//             addStudentProfile(e);
//           }}
//           ref={form}
//           className="flex justify-center items-center flex-wrap gap-6"
//         >
//           <div className="w-[40%]">
//             <label htmlFor="firstname" className="leading-7 text-sm">
//               Enter First Name<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               id="firstname"
//               value={data.firstName}
//               onChange={(e) => setData({ ...data, firstName: e.target.value })}
//               className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//             />
//           </div>
//           <div className="w-[40%]">
//             <label htmlFor="middlename" className="leading-7 text-sm">
//               Enter Middle Name
//             </label>
//             <input
//               type="text"
//               id="middlename"
//               value={data.middleName}
//               onChange={(e) => setData({ ...data, middleName: e.target.value })}
//               className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//             />
//           </div>
//           <div className="w-[40%]">
//             <label htmlFor="lastname" className="leading-7 text-sm">
//               Enter Last Name<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               id="lastname"
//               value={data.lastName}
//               onChange={(e) => setData({ ...data, lastName: e.target.value })}
//               className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//             />
//           </div>
//           <div className="w-[40%]">
//             <label htmlFor="enrollmentNo" className="leading-7 text-sm">
//               Enter Enrollment No<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="number"
//               id="enrollmentNo"
//               value={data.enrollmentNo}
//               onChange={(e) => setData({ ...data, enrollmentNo: e.target.value })}
//               className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//             />
//           </div>
//           <div className="w-[40%]">
//             <label htmlFor="email" className="leading-7 text-sm">
//               Enter Email Address<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={data.email}
//               onChange={(e) => setData({ ...data, email: e.target.value })}
//               className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//             />
//           </div>
//           <div className="w-[40%]">
//             <label htmlFor="phoneNumber" className="leading-7 text-sm">
//               Enter Phone Number<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="number"
//               id="phoneNumber"
//               value={data.phoneNumber}
//               onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
//               className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//             />
//           </div>
//           <div className="w-[40%]">
//             <label htmlFor="language" className="leading-7 text-sm">
//               Select Language<span className="text-red-500">*</span>
//             </label>
//             <select
//               id="language"
//               className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//               value={data.language}
//               onChange={(e) => setData({ ...data, language: e.target.value })}
//             >
//               <option value="">-- Select --</option>
//               {branch?.map((branch) => (
//                 <option key={branch.name} value={branch.name}>
//                   {branch.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="w-[40%]">
//             <label htmlFor="profile" className="leading-7 text-sm">
//               Upload Profile Photo<span className="text-red-500">*</span>
//             </label>
//             <div className="flex items-center mt-2">
//               <label
//                 htmlFor="file-upload"
//                 className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
//               >
//                 <FiUpload className="mr-2" /> Upload
//               </label>
//               <input
//                 type="file"
//                 id="file-upload"
//                 accept=".jpg,.jpeg,.png"
//                 onChange={(e) => setFile(e.target.files[0])}
//                 className="hidden"
//               />
//               {file && <span className="ml-2">{file.name}</span>}
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-500 px-6 py-3 rounded-sm mb-6 text-white"
//           >
//             Add New Student
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;



import React, { useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/config";
import { baseApiURL } from "../baseUrl";
import { FiUpload } from "react-icons/fi";
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [file, setFile] = useState();
  const [branch, setBranch] = useState();
  const [data, setData] = useState({
    enrollmentNo: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    language: "",
    profile: "",
  });

  const navigate = useNavigate(); // Initialize useHistory

  // Fetch branch data from API
  const getBranchData = () => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL()}/branch/getBranch`, { headers })
      .then((response) => {
        if (response.data.success) {
          setBranch(response.data.branches);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Upload file to Firebase storage
  useEffect(() => {
    const uploadFileToStorage = async (file) => {
      toast.loading("Uploading Profile Photo...");
      const storageRef = ref(
        storage,
        `Student Profile/${data.branch}/${data.semester} Semester/${data.enrollmentNo}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error(error);
          toast.dismiss();
          toast.error("Something went wrong while uploading!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            toast.dismiss();
            setFile();
            toast.success("Profile Photo Uploaded!");
            setData({ ...data, profile: downloadURL });
          });
        }
      );
    };
    file && uploadFileToStorage(file);
  }, [data, file]);

  // Fetch branch data on component mount
  useEffect(() => {
    getBranchData();
  }, []);

  // Add new student profile
  const addStudentProfile = (e) => {
    e.preventDefault();
    toast.loading("Adding Student...");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/student/details/addDetails`, data, { headers: headers })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          sendEmail(); // Send confirmation email
          axios
            .post(
              `${baseApiURL()}/student/auth/register`,
              { loginid: data.enrollmentNo, password: 112233 },
              { headers: headers }
            )
            .then((response) => {
              toast.dismiss();
              if (response.data.success) {
                toast.success(response.data.message);
                setFile();
                setData({
                  enrollmentNo: "",
                  firstName: "",
                  middleName: "",
                  lastName: "",
                  email: "",
                  phoneNumber: "",
                  language: "",
                  profile: "",
                });
                setTimeout(()=>{
                    navigate('/') 
                }, 1000)
                // Redirect to root after success
              } else {
                toast.error(response.data.message);
              }
            })
            .catch((error) => {
              toast.dismiss();
              toast.error(error.response.data.message);
            });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.message);
      });
  };

  // Email sending function using EmailJS
  const sendEmail = () => {
    const templateParams = {
      studentname: data.firstName,
      to: data.email,
      enrollmentnumber: data.enrollmentNo,
    };
    emailjs.send('service_6iw3a5k', 'template_smqt6hq', templateParams, '-HQ_08N7f1ml_-oOK')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  };

  const form = useRef();

  return (
    <div className="signup-container w-[70%] mx-auto mt-10">
      <Toaster />
      <h2 className="text-center text-2xl font-bold mb-4">SignUp</h2>
      <div className="signup-form border rounded-lg shadow-md p-6">
        <form
          onSubmit={(e) => {
            addStudentProfile(e);
          }}
          ref={form}
          className="flex justify-center items-center flex-wrap gap-6"
        >
          <div className="w-[40%]">
            <label htmlFor="firstname" className="leading-7 text-sm">
              Enter First Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstname"
              value={data.firstName}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="middlename" className="leading-7 text-sm">
              Enter Middle Name
            </label>
            <input
              type="text"
              id="middlename"
              value={data.middleName}
              onChange={(e) => setData({ ...data, middleName: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="lastname" className="leading-7 text-sm">
              Enter Last Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastname"
              value={data.lastName}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="enrollmentNo" className="leading-7 text-sm">
              Enter Enrollment No<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="enrollmentNo"
              value={data.enrollmentNo}
              onChange={(e) => setData({ ...data, enrollmentNo: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="email" className="leading-7 text-sm">
              Enter Email Address<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="phoneNumber" className="leading-7 text-sm">
              Enter Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="phoneNumber"
              value={data.phoneNumber}
              onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="w-[40%]">
            <label htmlFor="language" className="leading-7 text-sm">
              Select Language<span className="text-red-500">*</span>
            </label>
            <select
              id="language"
              className="w-full bg-blue-50 rounded border focus:border-dark-green focus:bg-secondary-light focus:ring-2 focus:ring-light-green text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              value={data.language}
              onChange={(e) => setData({ ...data, language: e.target.value })}
            >
              <option value="">-- Select --</option>
              {branch?.map((branch) => (
                <option key={branch.name} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-[40%]">
            <label htmlFor="profile" className="leading-7 text-sm">
              Upload Profile Photo<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center mt-2">
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
              >
                <FiUpload className="mr-2" /> Upload
              </label>
              <input
                type="file"
                id="file-upload"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
              {file && <span className="ml-2">{file.name}</span>}
            </div>
          </div>
          {data.profile && (
            <div className="w-full flex justify-center items-center">
              <img src={data.profile} alt="student" className="h-36" />
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 px-6 py-3 rounded-sm mb-6 text-white"
          >
            Add New Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
