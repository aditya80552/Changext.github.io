// JavaScript code

function convertFile(file, format) {
  // Make a POST request to the backend server to convert the file
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/convert');
  xhr.setRequestHeader('Content-Type', 'multipart/form-data');

  // Create a FormData object
  const formData = new FormData();
  formData.append('file', file);
  formData.append('format', format);

  // Set the request body
  xhr.send(formData);

  // Once the conversion is complete, download the converted file
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Download the converted file
      const convertedFile = xhr.response;
      const blob = new Blob([convertedFile], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'converted.pdf';
      link.click();
    } else {
      // Handle error
      console.log('Error converting file:', xhr.statusText);
    } };
}
