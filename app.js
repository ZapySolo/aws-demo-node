var AWS = require("aws-sdk");
var uuid = require('uuid');

var fs = require('fs');

process.env.AWS_ACCESS_KEY_ID = "AKIAJMZ5XFXLCFJFGDEQ";
process.env.AWS_SECRET_ACCESS_KEY = "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";

//This will check if the credentials are provided or not
AWS.config.getCredentials(function(err) {
    if (err) {
        console.error(err.stack);
        // Porblem occured while loading the credentials
        // Try setting the credentials in the environmental variables
        // process.env.AWS_ACCESS_KEY_ID = <ACCESS_KEY>
        // process.env.AWS_SECRET_ACCESS_KEY = <SECRET_KEY>
    }
    else {
      console.log("Access key:", AWS.config.credentials.accessKeyId);
    }
});
console.log("Region: ", AWS.config.region);

function getAWSBucketLists() {
    //AWS.config.update({region: 'REGION'});
    s3 = new AWS.S3({apiVersion: '2006-03-01'});
    s3.listBuckets(function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.Buckets);
        return data.Buckets;
    }
    });
    return [];
}

function uploadFileToAWS(){
    s3 = new AWS.S3({apiVersion: '2006-03-01'});

    var uploadParams = {Bucket: "task-demo-1", Key: '', Body: ''};

    //getting file by path name
    var filePath = "./assets/VIDEO_LIVE_LECTURE.png";
    var fileStream = fs.createReadStream(filePath);
    fileStream.on('error', function(err) {
        console.log('File Error', err);
    });

    uploadParams.Key = "VIDEO_LIVE_LECTURE_1.png";
    uploadParams.Body = fileStream; // adding file to uploadParams
    //var path = require('path');
    //uploadParams.Key = path.basename(file);

    s3.upload (uploadParams, function (err, data) {
        //calling upload function
        if (err) {
            console.log("Error", err);
        } if (data) {
            console.log("Upload Success", data.Location);
        }
    });

}

uploadFileToAWS();
















// function CreateBucket(bucketName = 'node-sdk-sample-' + uuid.v4()){
//     var keyName = 'hello_world.txt';
//     var bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();
//     // Handle promise fulfilled/rejected states
//     bucketPromise.then(
//         function(data) {
//             // Create params for putObject call
//             var objectParams = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
//             // Create object upload promise
//             var uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
//             uploadPromise.then(
//                 function(data) {
//                 console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
//                 });
//         }
//     ).catch(
//     function(err) {
//       console.error(err, err.stack);
//   });
// }