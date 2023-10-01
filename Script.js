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
                // Assuming you have a Blob or File object (e.g., after a successful fetch)
const fileBlob = ...; // Replace with your actual Blob or File object

// Create a temporary URL for the file
const temporaryUrl = URL.createObjectURL(fileBlob);

// Now, you can use the temporary URL as needed
// For example, to display an image in an <img> element
const imgElement = document.getElementById("image");
imgElement.src = temporaryUrl;

// To create a download link for the file
const downloadLink = document.getElementById("download-link");
downloadLink.href = temporaryUrl;
downloadLink.download = "filename.ext"; // Specify the desired filename
                // Create a temporary URL for the blob
                const url = window.URL.createObjectURL(blob);
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
