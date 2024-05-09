const { handleUpload } = require('@vercel/blob/client') ;
const express = require('express')
const app = express()

const uploadimageonvercel = app.post('/uploadimageonvercel',  async (req, res) => {
  try {
    //  const jsonResponse = await handleUpload({
    //   body:req.body,
    //   req,
    //   onBeforeGenerateToken: async (pathname /*, clientPayload */) => {
        
    //     return {
    //       allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'],
    //     };
    //   },
    //   onUploadCompleted: async ({ blob, tokenPayload }) => {
 
    //     console.log('blob upload completed', blob);
 
    //     try {
    //       // await db.update({ avatar: blob.url, userId });
    //     } catch (error) {
    //       throw new Error('Could not update user');
    //     }
    //   },
    // });
 
    return req.status(200).send(req.body);
  } catch (error) {
    res.status(200).send({CODE:400 ,message:'No file uploaded'});
  }

 

})

module.exports = uploadimageonvercel
