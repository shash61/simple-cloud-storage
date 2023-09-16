const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../../models");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file, "file", req.body);
    const userDirectoryName = req.user.id; // Replace with your user identifier logic
    let userUploadPath = "";
    console.log(req.body.parent_folder_id);
    if (req.body.parent_folder_id.length) {
      // const parentFolderPath =
      userUploadPath = path.join("uploads", `${parentFolderPath}`);
    } else {
      userUploadPath = path.join("uploads", `/usr/${userDirectoryName}`);
      req.storedPath = userUploadPath;
    }

    // Create the destination directory if it doesn't exist
    fs.mkdirSync(userUploadPath, { recursive: true });
    cb(null, userUploadPath);
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("test");

const uploadFile = (req, res, err) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        res.status(500).json({ err: "some err in uploading file" });
      } else if (err) {
        res.status(500).json({ err: err.message });
      } else {
        console.log(req.file, "filee");
        const storedFiles = await db.File.findAll({
          where: {
            path: req.file.path,
          },
        });
        console.log(storedFiles, "storedfile");
        if (storedFiles.length>0) {
          return res.status(403).json({ err: "file already exists" });
        } else {
          const permissions = JSON.parse(req.body.permissions);
          const res = await db.sequelize.transaction(async (t) => {
            console.log(
              req.file.originalname,
              req.file.path,
              req.user.id,
              req.body.parent_folder_id,
              "params"
            );
            const file = await db.File.create(
              {
                filename: req.file.originalname,
                path: req.file.path,
                owner_id: req.user.id,
                parent_folder_id: req.body.parent_folder_id,
              },
              { transaction: t }
            );
            const fileMetaData = await db.MetaData.create(
              {
                description: req.body.description,
                content_type: req.file.mimetype,
                size: req.file.size,
                file_id: file.id,
              },
              { transaction: t }
            );
            const version = await db.Version.create(
              {
                version: 1,
                file_id: file.id,
              },
              { transaction: t }
            );
            for (p of permissions) {
              const permission = await db.Permissions.findOne(
                { where: { permission_type: p } },
                { transaction: t }
              );
              const userfilepermission =
                await db.UserFilePermissionMapping.create(
                  {
                    user_id: req.user.id,
                    file_id: file.id,
                    permission_id: permission.id,
                  },
                  { transaction: t }
                );
            }
            return file;
          });
          console.log(res, "res");
          res.status(200).json({message: "file uploaded successfully"})
        }
      }
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  uploadFile,
};
