/**
 * Created by AyushK on 18/09/20.
 */
import * as ValidationManger from "../middleware/validation";
import TestModule from "../app/modules/testModule";
import {stringConstants} from "../app/common/constants";
import FileUpload from "../app/modules/fileUpload/blManager";

const multer = require("multer");
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./images");
    },
    filename: (req, res, cb) => {
      cb(null, Date.now() + "--" + "sampleImage.png");
    },
  });
  
  const upload = multer({ storage: fileStorageEngine });
  

module.exports = (app) => {
    app.get('/', (req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));

    /**
     * route definition
     */
    app.get("/test-route", ValidationManger.validateUserLogin, new TestModule().testRoute);
    app.post("/image-upload",upload.single("image"), new FileUpload().uploadImage);
    app.put("/rename",new FileUpload().rename);
    app.delete("/delete",new FileUpload().delete);
};
