const express = require("express");
const multer = require("multer");
const fs = require("fs");
 
//initiate app

export default class FileUpload{
    async uploadImage (req){
        console.log(req.file);
        console.log("Image uploaded successfully");
    }

    async rename (){
        try {
            fs.rename("./images/1630932144478--sampleImage.png", "./images/lion.png", () => {
              console.log("file renamed");
            });
        } catch (error) {
            console.log("file doesn't exist");
        }
    }

    async delete (){
        try {
            fs.unlinkSync("./images/lion.png");
            console.log("file deleted");
        } catch (error) {
            console.log("file doesn't exist");
        }
    }
}
