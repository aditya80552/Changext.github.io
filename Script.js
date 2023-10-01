document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-input");
    const uploadButton = document.getElementById("upload-button");
    const outputFormatSelect = document.getElementById("output-format");
    const convertButton = document.getElementById("convert-button");
    const resultMessage = document.getElementById("result-message");
    const downloadLink = document.getElementById("download-link");

    let uploadedFile = null;

    uploadButton.addEventListener("click", function () {
        fileInput.click();
    });

    fileInput.addEventListener("change", function () {
        uploadedFile = fileInput.files[0];
    });

    convertButton.addEventListener("click", function () {
        const selectedFormat = outputFormatSelect.value;

        if (uploadedFile) {
            // Create a FormData object to send data to the PHP script
            const formData = new FormData();
            formData.append("file", uploadedFile);
            formData.append("format", selectedFormat);

            // Send a POST request to the PHP script for conversion
            fetch("convert.php", {
                method: "POST",
                body: formData,
            })
            .then(response => response.blob())
            .then(blob => {
                // Handle the converted file
                const objectURL = URL.createObjectURL(blob);
                downloadLink.href = objectURL;
                downloadLink.style.display = "block";

                // Display a success message
                resultMessage.textContent = "File converted successfully!";
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
