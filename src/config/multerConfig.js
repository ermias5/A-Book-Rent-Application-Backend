import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, "uploads/");
  //   },
  // destination: function (req, file, cb) {
  //   cb(null, "./public/uploads/");
  // },
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { filesize: 10 * 1024 * 1024 },
});

export default upload;
