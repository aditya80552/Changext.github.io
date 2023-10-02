// Add event listener to the submit button
document.querySelector('form button').addEventListener('click', function() {
  // Get the file and format from the form
// Add event listener to the social media sharing buttons
document.querySelector('.facebook-share').addEventListener('click', function() {
  // Share the converted file on Facebook
});

document.querySelector('.twitter-share').addEventListener('click', function() {
  // Share the converted file on Twitter
});

document.querySelector('.linkedin-share').addEventListener('click', function() {
  // Share the converted file on LinkedIn
});

  const file = document.querySelector('#file-input').files[0];
  const format = document.querySelector('#format-select').value;

  // Start the conversion process
  convertFile(file, format);
});

// Convert the file to the desired format
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
    }
  };
}
