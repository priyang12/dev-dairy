"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorld2 = (req, res) => {
    let message = req.query.message || req.body.message || "Hello World!";
    res.status(200).send(message);
};
