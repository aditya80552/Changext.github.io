<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $uploadDir = "uploads/";
    $format = $_POST["format"];
    
    if (isset($_FILES["file"]) && $_FILES["file"]["error"] === UPLOAD_ERR_OK) {
        $tmpName = $_FILES["file"]["tmp_name"];
        $convertedFileName = "converted." . $format;
        
        // Simulated conversion (replace with actual conversion logic)
        if ($format === "pdf") {
            // PDF conversion (placeholder)
            copy($tmpName, $uploadDir . $convertedFileName);
        } elseif ($format === "jpg") {
            // JPG conversion (placeholder)
            copy($tmpName, $uploadDir . $convertedFileName);
        } elseif ($format === "doc") {
            // DOC conversion (placeholder)
            copy($tmpName, $uploadDir . $convertedFileName);
        } else {
            // Handle other formats as needed
            // You can show an error message or handle other formats here
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
