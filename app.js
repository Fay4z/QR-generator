const express = require("express");
const qrcode = require("qrcode");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");


const app = express();
dotenv.config();


app.set("view engine", "ejs");
    
app.listen(3000);

app.use(express.static("public"));
app.use(express.static("public/img"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));





app.get("/", (req, res) => {

    // const urls = [
    //     {title: "hkdfknwe", site: "hkdfknwe"},
    //     {title: "kjhdsfklsd", site: "kjhdsfklsd"}
    // ]

    res.render("home", {title : "Home"});
})

app.get("/qr/create", (req, res) => {
    res.render("gen-qr", {title: "Generate QR"})
})


app.post("/qr", (req, res) => {
    const { title ,site } = req.body;

    qrcode.toDataURL(site, (err , src) => {
        console.log(src);
        res.render("all-qr", {title: "QR" , src, site, title})
    })
})

app.use((req, res) => {
    res.send("404, no page found");;
})