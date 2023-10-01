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

        if ($format === "pdf") {
            // Convert to PDF (example: for images)
            if (move_uploaded_file($tmpName, $uploadDir . $convertedFileName)) {
                echo json_encode(["success" => true, "filename" => "uploads/" . $convertedFileName]);
            } else {
                echo json_encode(["success" => false]);
            }
        } elseif ($format === "jpg") {
            // Convert to JPG (example: for images)
            if (move_uploaded_file($tmpName, $uploadDir . $convertedFileName)) {
                echo json_encode(["success" => true, "filename" => "uploads/" . $convertedFileName]);
            } else {
                echo json_encode(["success" => false]);
            }
        } elseif ($format === "doc") {
            // Convert to DOC (example: for text-based files)
            // Replace this with your actual conversion logic
            // For example, use a library like Pandoc to convert text-based files to DOC
            // exec("pandoc -o " . $uploadDir . $convertedFileName . " " . $tmpName);
            // Here, we use a placeholder since actual conversion code will depend on your tools and libraries.
            // If you have a specific library or tool in mind for DOC conversion, replace the placeholder here.
            // If not, you'll need to research and implement the conversion logic.
            echo json_encode(["success" => false]);
        } else {
            echo json_encode(["success" => false]);
        }
    } else {
        echo json_encode(["success" => false]);
    }
} else {
    echo json_encode(["success" => false]);
}
?>
