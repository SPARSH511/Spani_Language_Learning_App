const express = require("express");
const router = express.Router();
const Notice = require("../models/Other/Notice");


router.post("/getNotice", async (req, res) => {
  try {
    const { type } = req.body;
    
    const notices = await Notice.find({ type: type });

    if (notices.length > 0) {
      res.json({ success: true, message: "Notices Retrieved Successfully", notices });
    } else {
      res.status(404).json({ success: false, message: "No Notices Available for this language!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/getAllNotices", async (req, res) => {
  try {
    const notices = await Notice.find(); // Fetch all notices without filtering by type
    
    if (notices.length > 0) {
      res.json({ success: true, message: "All Notices Retrieved Successfully", notices });
    } else {
      res.status(404).json({ success: false, message: "No Notices Available!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/addNotice", async (req, res) => {
  const { link, description, title, language } = req.body;
  try {
    console.log("Received notice data:", { link, description, title, type: language });
    
    let notice = await Notice.findOne({ link, description, title, type: language });
    if (notice) {
      return res.status(400).json({ success: false, message: "Notice Already Exists!" });
    }
    
    notice = await Notice.create({ link, description, title, type: language });
    console.log("Created notice:", notice);
    
    res.json({ success: true, message: "Notice Added Successfully", notice });
  } catch (error) {
    console.error("Error in addNotice:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
});

router.post("/updateNotice/:id", async (req, res) => {
  const { link, description, title, language } = req.body;
  try {
    let notice = await Notice.findByIdAndUpdate(req.params.id, {
      link,
      description,
      title,
      type : language
    }, { new: true }); // Return the updated notice
    
    if (!notice) {
      return res.status(400).json({ success: false, message: "No Notice Available!" });
    }
    res.json({
      success: true,
      message: "Notice Updated Successfully",
      notice
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


router.delete("/deleteNotice/:id", async (req, res) => {
  try {
    let notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) {
      return res
        .status(400)
        .json({ success: false, message: "No Notice Available!" });
    }
    res.json({
      success: true,
      message: "Notice Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;

// router.post("/getNotice", async (req, res) => {
//   try {
//     let notice = await Notice.find(req.body);
//     if (notice) {
//       res.json({ success: true, message: "Notice Get Successfully", notice });
//     } else {
//       res.status(404).json({ success: false, message: "No Notice Available!" });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// });
