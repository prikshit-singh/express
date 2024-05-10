const { handleUpload } = require('@vercel/blob/client') ;
const express = require('express')
const app = express()

const uploadimageonvercel = app.post('/uploadimageonvercel',  async (req, res) => {
  try {
     const { callbackUrl, multipart, pathname } = req.body.payload;
const updatedPathname = pathname ? `/${pathname}` : '/uploads/';
    // Check if multipart is true and handle accordingly
    // const options = multipart
    //   ? { body: req.body, req }
    //   : { file: req.body, req };

    const file = req.body

    console.log('file123',file)
    const newFile = {
      type: file.type,
      payload: {
          pathname: 'uploads/Screenshot_2.png',
          callbackUrl: 'https://admin.gitgurus.com/uploadimageonvercel',
          clientPayload: null,
          multipart: true
               }
             }
     console.log('newFile123',newFile)

    const jsonResponse = await handleUpload({
      file:newFile,
      req,
      token: process.env.BLOB_READ_WRITE_TOKEN, // Pass token option
     
      onBeforeGenerateToken: async (pathname ) => {
        return {
          pathname: updatedPathname,
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'],
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('blob upload completed', blob);
        // Here you can perform actions with the uploaded blob, such as storing its URL in a database
        // Example: await db.update({ avatar: blob.url, userId });
      },
    });

    // Send response with JSON containing information about the uploaded image
    res.status(200).json(jsonResponse);
  } catch (error) {
     return res.status(200).send(req.body);
    // res.status(200).send({CODE:400 ,message:'No file uploaded'});
  }

 

})

module.exports = uploadimageonvercel
