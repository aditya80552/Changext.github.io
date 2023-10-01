<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $uploadDir = "uploads/";
    $format = $_POST["format"];
    
    if (isset($_FILES["file"]) && $_FILES["file"]["error"] === UPLOAD_ERR_OK) {
        $tmpName = $_FILES["file"]["tmp_name"];
        $convertedFileName = uniqid() . "." . $format;
        
        if (move_uploaded_file($tmpName, $uploadDir . $convertedFileName)) {
            if ($format === "pdf") {
                // Convert to PDF (using Imagick library for image to PDF)
                if (extension_loaded('imagick')) {
                    $image = new Imagick($uploadDir . $convertedFileName);
                    $image->setImageFormat("pdf");
                    $image->writeImage($uploadDir . $convertedFileName);
                } else {
                    echo json_encode(["success" => false]);
                    exit();
                }
            } elseif ($format === "jpg") {
                // Convert to JPG (using GD library for PNG to JPG)
                if (exif_imagetype($uploadDir . $convertedFileName) === IMAGETYPE_PNG) {
                    $image = imagecreatefrompng($uploadDir . $convertedFileName);
                    imagejpeg($image, $uploadDir . $convertedFileName, 100);
                    imagedestroy($image);
                } else {
                    echo json_encode(["success" => false]);
                    exit();
                }
            } elseif ($format === "doc") {
                // Convert to DOC (using Pandoc for text-based files to DOC)
                exec("pandoc -o " . $uploadDir . $convertedFileName . " " . $uploadDir . $convertedFileName);
            } else {
                echo json_encode(["success" => false]);
                exit();
            }

            echo json_encode(["success" => true, "filename" => $convertedFileName]);
            exit();
        } else {
            echo json_encode(["success" => false]);
            exit();
        }
    } else {
        echo json_encode(["success" => false]);
    }
}
?>
