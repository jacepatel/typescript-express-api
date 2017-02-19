"use strict";
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    createdAt: Date,
    updatedAt: Date,
    email: String,
    firstName: String,
    lastName: String
});
exports.userSchema.pre("save", function (next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    this.updatedAt = new Date();
    next();
});
