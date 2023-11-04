const db = require("../../models");
const multer = require("multer");
const sendMessageToKafka = require("../../clients/kafka/kafkaClient");
const { KAFKA_UPLOAD_FILE_TOPIC } = require("../../constants");
const processAndUploadFile = require("../../config/multer");

const uploadFile = async (req, res, err) => {
  console.log(req.body,'-----body------')
    processAndUploadFile(req, res, async (err) => {
      try{
        if (err instanceof multer.MulterError) {
          throw new Error("An error occurred while processing the file.");
        } 
        else {
          console.log(
            req.file,
            req.body,
            req.storagePath,
            "-------------message---------------"
          );
          const resp = await db.sequelize.transaction(async(t)=>{
          const storedFiles = await db.File.findAll({
            where: {
              path: req.storagePath,
            },
          },{transaction: t});
          console.log(storedFiles, "storedfile");
          if (storedFiles.length > 0) {
            throw new Error("file already exists")
          } 
          else {
            const permissions = JSON.parse(req.body.permissions);
              const file = await db.File.create(
                {
                  filename: req.file.originalname,
                  path: req.storagePath,
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
            }
          })
          console.log(resp, "res");
          return res.status(200).json({ message: "file uploaded successfully" });
          }
      }
      catch (err) {
        res.status(500).json({ err: err.message });
      }
    })
  }
    // sendMessageToKafka(KAFKA_UPLOAD_FILE_TOPIC, {
    //   partitionKey: req.user.id,
    //   data: {
    //     fileDetails: req.file,
    //     storagePath: req.storagePath,
    //     uploadPath: req.userUploadPath,
    //   },
    // });

module.exports = {
  uploadFile,
};
