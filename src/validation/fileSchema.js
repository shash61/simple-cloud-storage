const fileUploadSchema = {
    parent_folder_path:{
        // notEmpty:{
        //     errorMessage: 'parent folder id is required',
        //     bail: true
        // },
    },
    permissions:{
        notEmpty:{
            errorMessage:'permissions are required',
            bail:true
        },
        // isArray:{
        //     errorMessage: "permissions must be an array",
        //     bail : true,
        // }
    }
}

module.exports = {
    fileUploadSchema
}