$(document).ready(function() {
    $("button").click(function() {
        alert("Yeah")
        var formData = new FormData();
        formData.append("file", $('#file')[0].files[0])

        var credentials = {
            accessKeyId: 'AKIAIJOHCIPOFIYWFJ4A',
            secretAccessKey: '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'
        };
        AWS.config.update(credentials);
        AWS.config.region = 'us-east-2';

        // create bucket instance
        var bucket = new AWS.S3({ params: { Bucket: 'hng4' } });

        var file = $('#file').files[0];
        if (file) {
            filename = Date.now() + file.name;
            var params = { Key: filename, ContentType: file.type, Body: file, 'Access-Control-Allow-Credentials': '*' };
            bucket.upload(params, function(err, data) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(data);
                    awsTranscribe(filename);
                }
            });
        }

        googleTranscribe();
    }, false);
});

function awsTranscribe(filename) {
    var transcribeservice = new AWS.TranscribeService();
    transcribeservice.createVocabulary(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
    });
    var params = {
        LanguageCode: en - US | es - US,
        /* required */
        Media: { /* required */
            MediaFileUri: filename
        },
        MediaFormat: mp3 | mp4 | wav | flac,
        /* required */
        TranscriptionJobName: 'internship1',
        /* required */
        MediaSampleRateHertz: 0,
        Settings: {
            MaxSpeakerLabels: 0,
            ShowSpeakerLabels: true || false,
            VocabularyName: 'STRING_VALUE'
        }
    };
    transcribeservice.startTranscriptionJob(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
    });


}

function googleTranscribe() {

}