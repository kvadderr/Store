const router = require("express").Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});  

const fileFilter = (req, file, cb) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
        cb(null, true);
    } else{
        cb(null, false);

    }

};

let upload = multer({ storage: storage, fileFilter: fileFilter,});


const {
  createPost,
  getPosts,
  getPostsByUserId,
  getFavPost,
  createComments,
  getCommentsById,
  updatePosts
} = require("./post.controller");
router.get("/", getPosts);
router.put("/update", upload.single("Image"), updatePosts);
router.post("/", upload.single("Image"), createPost);
router.post("/comment", upload.single("Image"), createComments);
router.get("/comment/:id", getCommentsById);
router.get("/id/:id", getPostsByUserId);
router.get("/id_user/:id", getFavPost);
module.exports = router;