<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $uploadDir = "uploads/";
    $format = $_POST["format"];
    
    if (isset($_FILES["file"]) && $_FILES["file"]["error"] === UPLOAD_ERR_OK) {
        $tmpName = $_FILES["file"]["tmp_name"];
        $fileName = basename($_FILES["file"]["name"]);
        $convertedFileName = "converted." . $format;
        
        // Check the selected format and perform the appropriate conversion
        if ($format === "jpg") {
            // Convert to JPG (example: for images)
            $image = imagecreatefrompng($tmpName);
            imagejpeg($image, $uploadDir . $convertedFileName, 100);
            imagedestroy($image);
        } elseif ($format === "pdf") {
            // Convert to PDF (example: for images)
            exec("convert $tmpName $uploadDir$convertedFileName");
        } else {
            // Handle other formats here (e.g., Word to PDF, PNG to JPG, etc.)
            // You need to implement logic for each supported format
            // Example: 
            // if ($format === "doc") {
            //     // Convert to PDF or another suitable format
            //     // ...
            // }
        }

        // Set the response header for downloading the converted file
        header("Content-Type: application/octet-stream");
        header("Content-Disposition: attachment; filename=\"$convertedFileName\"");
        readfile($uploadDir . $convertedFileName);
        exit();
    } else {
        echo "Error uploading file.";
    }
}
?>
