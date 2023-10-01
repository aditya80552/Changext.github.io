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
            .then(response => response.blob())
            .then(blob => {
                downloadLink.href = url;
downloadLink.download = `converted.${selectedFormat}`;
downloadLink.style.display = "block";
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
