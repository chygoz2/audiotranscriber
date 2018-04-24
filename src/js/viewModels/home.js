/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your home ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery'],
    function(oj, ko, $) {

        function HomeViewModel() {
            var self = this;
            // Below are a set of the ViewModel methods invoked by the oj-module component.
            // Please reference the oj-module jsDoc for additional information.

            /**
             * Optional ViewModel method invoked after the View is inserted into the
             * document DOM.  The application can put logic that requires the DOM being
             * attached here. 
             * This method might be called multiple times - after the View is created 
             * and inserted into the DOM and after the View is reconnected 
             * after being disconnected.
             */
            self.connected = function() {

                //bind the ui events on connecting the home module
                self.bindEvents();
            };

            /**
             * Optional ViewModel method invoked after the View is disconnected from the DOM.
             */
            self.disconnected = function() {
                // Implement if needed
            };

            /**
             * Optional ViewModel method invoked after transition to the new View is complete.
             * That includes any possible animation between the old and the new View.
             */
            self.transitionCompleted = function() {
                // Implement if needed
            };

            /**
             * Bind the UI events @Team Google @Team AWS use this to bind your functios for upload and transcription
             * you have jquery available for AJAX request --Best of luck
             */
            self.bindEvents = function() {


                //sample binding
                let $upload = $('#upload');
                let $file = $('#file');


            }

            self.upload = function() {
                $file = $('#file')
                console.log($file[0].files[0])
                var formData = new FormData();
                formData.append("file", $file[0].files[0])

                var credentials = {
                    accessKeyId: 'AKIAJU3WLQLK2C4MIDLA',
                    secretAccessKey: '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'
                };
                AWS.config.update(credentials);
                AWS.config.region = 'us-east-2';

                // create bucket instance
                var bucket = new AWS.S3({

                    params: { Bucket: 'hng4' }
                });

                var file = $file[0].files[0]
                if (file) {
                    filename = Date.now() + file.name;
                    var params = { Key: filename, ContentType: file.type, Body: file };
                    bucket.upload(params, function(err, data) {
                        if (err) {
                            console.log(err)
                        } else {
                            // console.log(data);
                            awsTranscribe(data.Location);
                            googleTranscribe(data.Location);
                        }
                    });
                }





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
            }
        }

        /*
         * Returns a constructor for the ViewModel so that the ViewModel is constructed
         * each time the view is displayed.  Return an instance of the ViewModel if
         * only one instance of the ViewModel is needed.
         */
        return new HomeViewModel();
    }
);