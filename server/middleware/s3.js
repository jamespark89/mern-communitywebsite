const fs = require("fs")
const S3 = require("aws-sdk/clients/s3")

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_N

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
  s3ForcePathStyle: true
})
//uploas a file to s3
async function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }
  return await s3.upload(uploadParams).promise()
}

//downloads a file from s3
async function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }
  try {
    const request = s3.getObject(downloadParams)
    const readStream = request
      .createReadStream()
      .on("error", (error) => {
        console.log(
          "Couldn't retrieve images",
          error.message
        )
      })
      .on("end", () => {
        request.abort()
      })
    return readStream
  } catch (e) {
    console.log(e.message)
  }
}

//delte a file from S3
async function deleteFile(fileKey) {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileKey
  }

  return await s3.deleteObject(deleteParams).promise()
}

module.exports = { uploadFile, getFileStream, deleteFile }
