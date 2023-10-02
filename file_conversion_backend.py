from flask import Flask, request, send_file
import wkhtmltopdf

app = Flask(__name__)

# File conversion logic

def convert_file(file, format):
  """Converts a file to the desired format using wkhtmltopdf.

  Args:
    file: The file to be converted.
    format: The desired format of the converted file.

  Returns:
    The converted file.
  """

  # Create a PDF object
  pdf = wkhtmltopdf.new_pdf()

  # Add the file to the PDF object
  pdf.add_page(wkhtmltopdf.from_file(file))

  # Save the PDF object to a temporary file
  temp_file = pdf.output('pdf')

  # Return the temporary file
  return temp_file

# Backend routes

@app.route('/convert', methods=['POST'])
def convert():
  """Converts a file to the desired format and downloads it.

  Args:
    file: The file to be converted.
    format: The desired format of the converted file.

  Returns:
    The converted file.
  """

  # Get the file and format from the request
  file = request.files['file']
  format = request.form['format']

  # Convert the file
  converted_file = convert_file(file, format)

  # Download the converted file
  send_file(converted_file, as_attachment=True)

if __name__ == '__main__':
  app.run(debug=True)

