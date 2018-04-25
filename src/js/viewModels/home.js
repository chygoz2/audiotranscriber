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
             * Bind the UI events @Team Goo
             * gle @Team AWS use this to bind your functios for upload and transcription
             * you have jquery available for AJAX request --Best of luck
             */
            self.bindEvents = function() {


                $('#upload_file').on('click', function() {
                        $('#file').click();
                });
                
                $('input[type=file]').change(function (e) {
                    $('#processing').fadeIn('slow');
                    self.upload();
                });

                //sample binding
                let $upload = $('#upload');
                let $file = $('#file');
                let $amazon = $('#amazonTranscribed');
                self.dummyValue = ko.observable("<h3>Transcript will appear here shorlty...<h3>");
                self.amazonValue = ko.observable("");                
                self.googleValue = ko.observable("")


            }

            self.upload = function(event, data, bindingContext) {
                $file = $('#file')

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
                            console.log(data);
                            awsTranscribe(data.Location);
                            googleTranscribe(data.Location);
                        }
                    });
                }





                function awsTranscribe(filename) {
                    $amazon = $('#amazonTranscribed');
                    url = "http://dragonglass.hng.fun/aws.php?filename=";
                    // var url = "/aws.php?filename=";
                    urlTo = url + filename;
                    fetch(urlTo)
                        .then(response => {
                            return response.text();
                        })
                        .then(response => {
                            console.log(response);
                            $('#processing').hide();
                            $('.complete-notice').fadeIn('slow');
                            //empty dummy value and add true result
                            self.dummyValue('');
                            self.amazonValue(response);
                        })
                   
                }

                function googleTranscribe(filename) {

                }

                function getFileExt(filename) {
                    return filename.split('.').pop();
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