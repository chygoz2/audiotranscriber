<?php
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $json_str = file_get_contents('php://input');
        $json_obj = json_decode($json_str);
        $base64String = $json_obj->audio->content;
        $fileExtension = $json_obj->audio->extension;
        $targetPath = "uploads/".time().".".$fileExtension;

        $content = base64_decode($base64String);
        $file = fopen($targetPath, 'w');    
        fwrite($file, $content);
        fclose($file);

        echo json_encode(
            array(
                'status' => 'success',
                'file' => $_SERVER['SERVER_ADDR'].'/'.$targetPath
            )
        );
    }
?>