import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, "uploads/");
  //   },
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  //   destination: "./public/uploads/",
  filename: function (req, file, cb) {
    const uniqeSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqeSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).single("bookCoverImage");

export default upload;
