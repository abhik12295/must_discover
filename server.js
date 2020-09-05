
// const http = require("http");
// const path = require("path");
// const fs = require("fs");

// const server = http.createServer((req, res) => {

//   // Build file path
//   let filePath = path.join(
//     __dirname,
//     "public",
//     req.url === "/" ? "index.html" : req.url
//   );

//   // Extension of file
//   let extname = path.extname(filePath);

//   // Initial content type
//   let contentType = "text/html";

//   // Check ext and set content type
//   switch (extname) {
//     case ".js":
//       contentType = "text/javascript";
//       break;
//     case ".css":
//       contentType = "text/css";
//       break;
//     case ".json":
//       contentType = "application/json";
//       break;
//     case ".png":
//       contentType = "image/png";
//       break;
//     case ".jpg":
//       contentType = "image/jpg";
//       break;
//   }

//   // Check if contentType is text/html but no .html file extension
//   if (contentType == "text/html" && extname == "") filePath += ".html";

//   // log the filePath
//   //console.log(filePath);

//   // Read File
//   fs.readFile(filePath, (err, content) => {
//     if (err) {
//       if (err.code == "ENOENT") {
//         // Page not found
//         fs.readFile(
//           path.join(__dirname, "public", "404.html"),
//           (err, content) => {
//             res.writeHead(404, { "Content-Type": "text/html" });
//             res.end(content, "utf8");
//           }
//         );
//       } else {
//         //  Some server error
//         res.writeHead(500);
//         res.end(`Server Error: ${err.code}`);
//       }
//     } else {
//       // Success
//       res.writeHead(200, { "Content-Type": contentType });
//       res.end(content, "utf8");
//     }
//   });
// });

// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));





const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();



app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
// app.use('/js', express.static(__dirname + 'public/js'))
// app.use('/img', express.static(__dirname + 'public/images'))



//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

// Routes

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));


