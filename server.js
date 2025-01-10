const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files

app.set("view engine", "ejs"); //dynamic html

let submissions = [];

app.get("/", (req, res) => {
  res.render("index");
});
// server side validation
app.post("/thankyou", (req, res) => {
  const { name, email, phone, gender, nationality, comments } = req.body;

  const errors = [];
  if (!name || !email || !phone || !gender || !nationality) {
    errors.push("All required fields must be filled!");
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.push("Invalid email format!");
  }
  if (!/^\d{10}$/.test(phone)) {
    errors.push("Phone number must be 10 digits!");
  }
  if (errors.length > 0) {
    res.status(400).send(`
            <h1>Error</h1>
            <p style="color: rgb(250, 58, 58);">
                ${errors.join("<br>")}
            </p>
            <a href="/">Back to the form</a>
        `);
    return;
  }

  // Store validated data in array
  submissions.push({
    name,
    email,
    phone,
    gender,
    nationality,
    comments: comments || "No comments",
  });
  // submit page
  res.send(`
        <style>
            h1 { color: #007bff; }
        </style>
         <h1>Thank You!</h1>
         <p>Name: ${name}</p>
         <p>Email: ${email}</p>
         <p>Phone Number: ${phone}</p>
         <p>Gender: ${gender}</p>
         <p>Nationality: ${nationality}</p>
         <p>Comments: ${comments || "No comments"}</p>
         <br>
         <a href="/">Back to the form</a>
         <br>
         <a href="/submissions">View All Submissions</a>
     `);
});
// temporary data values stored and shown
app.get("/submissions", (req, res) => {
  res.send(`
        <style>
            h1 { color: #007bff; }
            li { padding: 5px 0; }
        </style>
        <h1>All Submissions</h1>
        <ul>
            ${submissions
              .map(
                (submission) => `
                <li>
                    <strong>${submission.name}</strong>, ${submission.email}, ${submission.phone},
                    ${submission.gender}, ${submission.nationality}, Comments: ${submission.comments}
                </li>
            `
              )
              .join("")}
        </ul>
        <a href="/">Back to the form</a>
    `);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
