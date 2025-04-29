const express = require('express');
const session = require("express-session");

const PORT = process.env.PORT || 3000;
const app = express();

const node_session_secret = '1fa055c2-7bcc-4b30-8167-ab9012beab92';

app.use(session({
    secret: node_session_secret,
    saveUninitialized: false,
    resave: true
}))

app.get("/changeStyle", function(req, res) {
    req.session.color = req.query.color;
    req.session.bgcolor = req.query.bgcolor;

    res.redirect("/");
})

app.get("/", function(req, res) {
    const action = req.query.action;
    if (!req.session.counter) {
        req.session.counter = 0;
    }
    if (!req.session.color) {
        req.session.color = 'black';
    }
    if (!req.session.bgcolor) {
        req.session.bgcolor = 'white';
    }
    if (action == 'up') {
        req.session.counter++;
        
    } else if (action == 'down') {
        req.session.counter--;
    }

    res.send(`<div style='color: ${req.session.color}; background-color: ${req.session.bgcolor}'><button onclick="window.location.href='/?action=up'">Up</button> ${req.session.counter} <button onclick="window.location.href='/?action=down'">Down</button></div>`);
})

app.listen(
    PORT, 
    () => { console.log(`Server is running on http://locathost:${PORT}`);
});