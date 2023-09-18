const { validationResult } = require("express-validator");
const upload = require("../../config/multer");
const db = require("../../models");
const multer = require("multer");



const uploadFile = (req, res, err) => {
  const errors = validationResult(req)
  // if(!errors.isEmpty()){
  //   return res.status(400).json({ errors: errors.array() });
  // }
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
          console.log(
            req.file.originalname,
            req.file.path,
            req.user.id,
            req.body.parent_folder_id,
            "params"
          );
          const resp = await db.sequelize.transaction(async (t) => {
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
          console.log(resp, "res");
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
