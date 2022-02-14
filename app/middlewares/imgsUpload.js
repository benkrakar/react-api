import multer from "multer";
import sharp from "sharp";
import AppException from "../exceptions/AppException.js";

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppException("Please upload only images", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const image = (name) => upload.single(`${name}_image`);
const images = (name) => upload.fields([{ name: `${name}_images` }]);

async function resize(req, res, next) {
  if (Object.keys(req.files).length === 0) return next();

  const foldername = Object.keys(req.files)[0].split("_")[0];
  const Field = Object.keys(req.files)[0];
  req.body[Field] = [];

  await Promise.all(
    req.files[Field].map(async (file, i) => {
      const filename = `${foldername}-${req.params.id}-${Date.now()}-${
        i + 1
      }.jpeg`;

      await sharp(req.files[Field][i].buffer)
        //TODO:change Resize 👋👋
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/${foldername}/${filename}`);
      req.body[Field].push(filename);
    })
  );

  next();
}

export default { image, images, resize };
