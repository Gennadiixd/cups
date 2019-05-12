const IncomingForm = require("formidable").IncomingForm;

module.exports = function upload(req, res) {
  var form = new IncomingForm({
    uploadDir: './upload' , 
    keepExtensions: true
  });

  form.on("file", (field, file) => {
    console.log(file.path)
    console.log(file.name)
    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path
  });
  form.on("end", () => {
    res.json();
  });
  form.parse(req);
};
