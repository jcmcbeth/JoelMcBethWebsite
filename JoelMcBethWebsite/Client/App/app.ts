﻿import * as $ from "jquery";
import * as sammy from "sammy"

var app = Sammy();

app.get('#/', context => {
    context.log("index page");
});

$(() => {
    app.run();
});