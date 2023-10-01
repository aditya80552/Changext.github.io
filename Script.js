document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-input");
    const uploadButton = document.getElementById("upload-button");
    const outputFormatSelect = document.getElementById("output-format");
    const convertButton = document.getElementById("convert-button");
    const resultMessage = document.getElementById("result-message");
    const downloadLink = document.getElementById("download-link");
    const socialMediaSharing = document.getElementById("social-media-sharing");

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
            // Simulated file conversion (replace with actual conversion logic)
            // For example, for PDF to image conversion:
             resultMessage.textContent = "File converted successfully!";

            // Set the download link and show it
            downloadLink.href = "#"; // Replace with the actual download link
            downloadLink.style.display = "block";

            // Show social media sharing buttons
            socialMediaSharing.style.display = "block";
        } else {
            resultMessage.textContent = "Please select a file first.";
        }
    });

    // Social media sharing functions
    const shareOnFacebook = () => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
    };

    const shareOnTwitter = () => {
        const text = encodeURIComponent("Check out this converted file!");
        const url = encodeURIComponent(window.location.href);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
    };

    // Add event listeners for sharing buttons
    const shareFacebookButton = document.getElementById("share-facebook");
    const shareTwitterButton = document.getElementById("share-twitter");

    shareFacebookButton.addEventListener("click", shareOnFacebook);
    shareTwitterButton.addEventListener("click", shareOnTwitter);
});
