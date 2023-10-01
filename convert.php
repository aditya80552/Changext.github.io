<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $uploadDir = "uploads/";
    $format = $_POST["format"];

    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    if (isset($_FILES["file"]) && $_FILES["file"]["error"] === UPLOAD_ERR_OK) {
        $tmpName = $_FILES["file"]["tmp_name"];
        $convertedFileName = uniqid() . "." . $format;
        $convertedFilePath = $uploadDir . $convertedFileName;

        if ($format === "pdf") {
            // Convert to PDF (example: for images)
            if (move_uploaded_file($tmpName, $convertedFilePath)) {
                header("Content-Type: application/octet-stream");
                header("Content-Disposition: attachment; filename=\"$convertedFileName\"");
                readfile($convertedFilePath);
                exit();
            }
        } elseif ($format === "jpg") {
            // Convert to JPG (example: for images)
            if (move_uploaded_file($tmpName, $convertedFilePath)) {
                header("Content-Type: application/octet-stream");
                header("Content-Disposition: attachment; filename=\"$convertedFileName\"");
                readfile($convertedFilePath);
                exit();
            }
        } elseif ($format === "doc") {
            // Convert to DOC (example: for text-based files)
            // Replace this with your actual conversion logic
            // For example, use a library like Pandoc to convert text-based files to DOC
            // exec("pandoc -o " . $convertedFilePath . " " . $tmpName);
            // Here, we use a placeholder since actual conversion code will depend on your tools and libraries.
            // If you have a specific library or tool in mind for DOC conversion, replace the placeholder here.
            // If not, you'll need to research and implement the conversion logic.
        }

        // If the conversion failed or the format is not supported
        echo json_encode(["success" => false]);
    } else {
        echo json_encode(["success" => false]);
    }
} else {
    echo json_encode(["success" => false]);
}
?>
