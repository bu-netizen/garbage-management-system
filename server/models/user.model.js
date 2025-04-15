const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true,RegExp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    password: { type: String, required: true }
});

// Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
    // only hash if password is modified or new
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        return next(err);
    }
});
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("users", userSchema);
