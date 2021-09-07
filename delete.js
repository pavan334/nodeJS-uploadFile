const express = require("express");
const multer = require("multer");
const fs = require("fs");
 
//initiate app
const app = express();
 
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, res, cb) => {
    cb(null, Date.now() + "--" + "sampleImage.png");
  },
});
 
const upload = multer({ storage: fileStorageEngine });
 
app.post("/single", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("Image uploaded successfully");
});
 
//To rename the file
app.put("/rename", (req, res) => {
  try {
    fs.rename("./images/1626926104880--sampleImage.png", "tree.png", () => {
      console.log("file renamed");
    });
  } catch (error) {
    res.send("file doesn't exist");
  }
});
 
//To delete existing file
app.delete("/delete", (req, res) => {
  try {
    fs.unlinkSync("./tree.png");
    res.send("file deleted");
  } catch (error) {
    res.send("file doesn't exist");
  }
});
