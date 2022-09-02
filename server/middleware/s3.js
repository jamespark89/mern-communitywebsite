const fs = require("fs")
const S3 = require("aws-sdk/clients/s3")

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
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
    const data = await s3
      .getObject(downloadParams)
      .createReadStream()
    return data
  } catch (e) {
    throw new Error(
      `Could not retrieve file from S3: ${e.message}`
    )
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
