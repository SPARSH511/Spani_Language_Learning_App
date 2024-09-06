import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import axios from "axios";
import { IoMdLink } from "react-icons/io";
import { HiOutlineCalendar } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import toast from "react-hot-toast";
import { baseApiURL } from "../baseUrl";

const Notice = () => {
  const router = useLocation();
  const [notice, setNotice] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const [data, setData] = useState({
    title: "",
    description: "",
    language: "",
    link: "",
  });
  const [branches, setBranches] = useState([]);
  const [userLanguage, setUserLanguage] = useState("");
  useEffect(() => {
    axios
      .get(`${baseApiURL()}/branch/getBranch`)
      .then((response) => {
        if (response.data.success) {
          setBranches(response.data.branches);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error("Failed to fetch branches");
      });
  }, []);

  // Fetch user details including language during authentication
  useEffect(() => {
    // Check if the user is an admin before fetching user details
    const fetchUserDetails = async () => {
      const userId = router.state.loginid;
  
      // Avoid fetching user details for admin
      if (!userId || router.pathname === "/admin") return;
  
      try {
        const response = await axios.post(`${baseApiURL()}/student/details/getDetails`, { userId });
        if (response.data.success) {
          setUserLanguage(response.data.user.language);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Failed to fetch user details");
      }
    };
  
    fetchUserDetails();
  }, [router.state.loginid, router.pathname]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let types = ["student"];
      
  //     // Fetch all notices for admin
  //     if (router.pathname === "/faculty" || router.pathname === "/admin") {
  //       types.push("faculty");
  //     }
      
  //     const headers = { "Content-Type": "application/json" };
      
  //     try {
  //       const response = await axios.post(`${baseApiURL()}/notice/getNotice`, { type: data.language }, { headers });
  //       if (response.data.success) {
  //         setNotice(response.data.notice);
  //       } else {
  //         toast.error(response.data.message);
  //       }
  //     } catch (error) {
  //       toast.error("Failed to fetch notices");
  //     }
  //   };
  
  //   // Don't fetch notices if the path is for admin
  //   if (router.pathname === "/admin") {
  //     fetchData();
  //   }
  // }, [router.pathname, data.language]);


  useEffect(() => {
    // Fetch data for students based on language
    const fetchStudentNotices = async (userLanguage) => {
      try {
        const headers = { "Content-Type": "application/json" };
        const response = await axios.post(`${baseApiURL()}/notice/getNotice`, { type: userLanguage }, { headers });
        
        if (response.data.success) {
          setNotice(response.data.notices);  // Set notices based on language type
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Failed to fetch notices");
      }
    };
  
    // Fetch all notices for admin and faculty
    const fetchAllNotices = async () => {
      try {
        const headers = { "Content-Type": "application/json" };
        const response = await axios.post(`${baseApiURL()}/notice/getAllNotices`, {}, { headers });
        
        if (response.data.success) {
          setNotice(response.data.notices);  // Set all notices
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Failed to fetch notices");
      }
    };
  
    // Fetch student details and then fetch their language-specific notices
    const fetchStudentDetails = async () => {
      try {
        const enrollmentNo = router.state.loginid; // Assuming you get userId from router.state.loginid
    
        const studentResponse = await axios.post(`${baseApiURL()}/student/details/getDetails`, { enrollmentNo });
        const studentData = studentResponse.data;
    
        if (studentData.success && studentData.user && studentData.user.length > 0) {
          const studentLanguage = studentData.user[0].language || "english"; // Default to English if no language is set
    
          fetchStudentNotices(studentLanguage);  // Fetch notices based on student language
        } else {
          toast.error("Student details not found");
        }
      } catch (error) {
        toast.error("Failed to fetch student details");
      }
    };
    
  
    // Determine which endpoint to call based on the current route
    if (router.pathname === "/student") {
      // Fetch notices filtered by student language
      fetchStudentDetails();
    } else if (router.pathname === "/faculty" || router.pathname === "/admin") {
      // Fetch all notices for admin or faculty
      fetchAllNotices();
    }
  }, [router.pathname]);
  

  const addNoticeHandler = (e) => {
    e.preventDefault();
    toast.loading("Adding Notice");
  
    const headers = {
      "Content-Type": "application/json",
    };
  
    // Construct the payload using 'language' as 'type'
    const noticeData = {
      title: data.title,
      description: data.description,
      language: data.language,
      link: data.link,
    };
  
    axios
      .post(`${baseApiURL()}/notice/addNotice`, noticeData, { headers })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setNotice([...notice, response.data.notice]);
          setOpen(false);
          setData({ title: "", description: "", language: "", link: ""});
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        console.error("Error adding notice:", error.response?.data || error);
        toast.error(error.response?.data?.message || "Failed to add notice");
      });
  };
  // Function to delete a notice
  const deleteNoticeHandler = (id) => {
    toast.loading("Deleting Notice");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .delete(`${baseApiURL()}/notice/deleteNotice/${id}`, { headers: headers })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setNotice(notice.filter((item) => item._id !== id));
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error("Failed to delete notice");
      });
  };

  // Function to update a notice
  const updateNoticeHandler = (e) => {
    e.preventDefault();
    toast.loading("Updating Notice");
    const headers = { "Content-Type": "application/json" };
  
    axios
      .post(
        `${baseApiURL()}/notice/updateNotice/${id}`,
        { ...data, type: data.language }, // Ensure `type` is converted to lowercase
        { headers: headers }
      )
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setNotice(
            notice.map((item) =>
              item._id === id ? { ...item, ...data } : item
            )
          );
          setOpen(false);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error("Failed to update notice");
      });
  };
  

  // Function to handle opening/closing notice form
  const toggleNoticeForm = () => {
    setOpen(!open);
    setEdit(false);
    setData({ title: "", description: "", language: "", link: "" });
  };

  // Function to set data for edit mode
  const setEditMode = (index) => {
    setEdit(true);
    setOpen(true);
    const { title, description, language, link, _id } = notice[index];
    setData({ title, description, language, link });
    setId(_id);
  };

  return (
    <div className="w-[85%] mx-auto flex justify-center items-start flex-col my-10">
      <div className="relative flex justify-between items-center w-full">
        <Heading title="Notices" />
        {(router.pathname === "/faculty" || router.pathname === "/admin") && (
          <button
            className="absolute right-2 flex justify-center items-center border-2 border-red-500 px-3 py-2 rounded text-red-500"
            onClick={toggleNoticeForm}
          >
            {open ? (
              <>
                <BiArrowBack className="text-red-500" /> Close
              </>
            ) : (
              <>
                Add Content
                <IoAddOutline className="text-red-500 text-xl ml-2" />
              </>
            )}
          </button>
        )}
      </div>
      {!open && (
        <div className="mt-8 w-full">
          {notice.map((item, index) => (
            <div
              key={item._id}
              className="border-blue-500 border-2 w-full rounded-md shadow-sm py-4 px-6 mb-4 relative"
            >
              {(router.pathname === "/faculty" || router.pathname === "/admin") && (
                <div className="absolute flex justify-center items-center right-4 bottom-3">
                  <span className="text-sm bg-blue-500 px-4 py-1 text-white rounded-full">
                    {item.type}
                  </span>
                  <span
                    className="text-2xl group-hover:text-blue-500 ml-2 cursor-pointer hover:text-red-500"
                    onClick={() => deleteNoticeHandler(item._id)}
                  >
                    <MdDeleteOutline />
                  </span>
                  <span
                    className="text-2xl group-hover:text-blue-500 ml-2 cursor-pointer hover:text-blue-500"
                    onClick={() => setEditMode(index)}
                  >
                    <MdEditNote />
                  </span>
                </div>
              )}
              <p
                className={`text-xl font-medium flex justify-start items-center ${
                  item.link && "cursor-pointer"
                } group`}
                onClick={() => item.link && window.open(item.link)}
              >
                {item.title}
                {item.link && (
                  <span className="text-2xl group-hover:text-blue-500 ml-1">
                    <IoMdLink />
                  </span>
                )}
              </p>
              <p className="text-base font-normal mt-1">{item.description}</p>
              <p className="text-sm absolute top-4 right-4 flex justify-center items-center">
                <span className="text-base mr-1">
                  <HiOutlineCalendar />
                </span>
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))}

        </div>
      )}
      {open && (
        <form className="mt-8 w-full">
          <div className="w-[40%] mt-2">
            <label htmlFor="title">Content Title</label>
            <input
              type="text"
              id="title"
              className="bg-blue-50 py-2 px-4 w-full mt-1"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>
          <div className="w-[40%] mt-4">
            <label htmlFor="description">Content Description</label>
            <textarea
              id="description"
              cols="30"
              rows="4"
              className="bg-blue-50 py-2 px-4 w-full mt-1 resize-none"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className="w-[40%] mt-4">
            <label htmlFor="link">Content Link (If any)</label>
            <input
              type="text"
              id="link"
              value={data.link}
              className="bg-blue-50 py-2 px-4 w-full mt-1"
              onChange={(e) => setData({ ...data, link: e.target.value })}
            />
          </div>
          <div className="w-[40%] mt-4">
            <label htmlFor="language">Select Language</label>
            <select
              id="language"
              className="bg-blue-50 py-2 px-4 w-full mt-1"
              value={data.language}
              onChange={(e) => setData({ ...data, language: e.target.value })}
            >
              <option value="">Select Language</option>
              {branches.map((branch) => (
                <option key={branch._id} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
          {edit ? (
            <button
              onClick={updateNoticeHandler}
              className="bg-blue-500 text-white mt-6 px-6 rounded text-lg py-2 hover:bg-blue-600"
            >
              Update Notice
            </button>
          ) : (
            <button
              onClick={addNoticeHandler}
              className="bg-blue-500 text-white mt-6 px-6 rounded text-lg py-2 hover:bg-blue-600"
            >
              Add Notice
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default Notice;
