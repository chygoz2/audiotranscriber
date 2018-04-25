<?php
header('Access-Control-Allow-Origin: *'); 
require './credentials.php';
require 'vendor/autoload.php';
if(isset($_GET["filename"])){
    
    $filename = $_GET["filename"];
    $sharedConfig = [
        'region'  => 'us-east-2',
        'version' => 'latest',
        'credentials' => [
            'key'    => $credentials["key"],
            'secret' => $credentials["secret"],
        ],
    ];
    $ext = substr($filename, strrpos($filename, ".")+1, 3);
    
    $sdk = new Aws\Sdk($sharedConfig);
    $transcribeName = "HNG" .(new \DateTime())->format('YmdHis');
    
    $client = $sdk->createTranscribeService();

    $params = [
        'LanguageCode'=> "en-US",
        'Media' => [
            'MediaFileUri'=> $filename
        ],
        'MediaFormat'=> $ext,
        'TranscriptionJobName'=> $transcribeName

    ];

    $result = $client->startTranscriptionJob($params);
  
        sleep(10);
        getJob($client, $transcribeName);
     
    
}

function getJob($client, $transcribeName){
   
  $result =  $client->getTranscriptionJob([ 'TranscriptionJobName' => $transcribeName]);
  //$result = json_decode($result);
 // print_r($result);
      if($result["TranscriptionJob"]["TranscriptionJobStatus"] != 'IN_PROGRESS'){
        $arrContextOptions=array(
            "ssl"=>array(
                "verify_peer"=>false,
                "verify_peer_name"=>false,
            ),
        );
        $response = file_get_contents($result["TranscriptionJob"]["Transcript"]["TranscriptFileUri"], false, stream_context_create($arrContextOptions));
        //print_r($response);
        $response = json_decode($response, true);
       // print_r($response);
        echo $response["results"]["transcripts"][0]["transcript"];
      }else{
          sleep(10);
          getJob($client, $transcribeName);
      }
}
?>