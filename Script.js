document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-input");
    const uploadButton = document.getElementById("upload-button");
    const outputFormatSelect = document.getElementById("output-format");
    const convertButton = document.getElementById("convert-button");
    const resultMessage = document.getElementById("result-message");

    let uploadedFile = null;

    uploadButton.addEventListener("click", function () {
        fileInput.click();
    });

    fileInput.addEventListener("change", function () {
        uploadedFile = fileInput.files[0];
        if (uploadedFile) {
            resultMessage.textContent = `Selected file: ${uploadedFile.name}`;
        } else {
            resultMessage.textContent = "No file selected.";
        }
    });

    convertButton.addEventListener("click", function () {
        const selectedFormat = outputFormatSelect.value;

        if (uploadedFile) {
            const formData = new FormData();
            formData.append("file", uploadedFile);
            formData.append("format", selectedFormat);

            fetch("convert.php", {
                method: "POST",
                body: formData,
            })
            .then(response => {
                // Handle the response as needed
                if (response.ok) {
                    // Trigger the download by navigating to convert.php
                    window.location.href = "convert.php";
                    resultMessage.textContent = "File converted successfully!";
                } else {
                    resultMessage.textContent = "Error converting file.";
                }
            })
            .catch(error => {
                console.error("Error:", error);
                resultMessage.textContent = "Error converting file.";
            });
        } else {
            resultMessage.textContent = "Please select a file first.";
        }
    });
});
