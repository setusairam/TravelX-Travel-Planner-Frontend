from flask import Flask, render_template, request, redirect, url_for, session, flash
import sqlite3
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = "your_secret_key"
UPLOAD_FOLDER = "static/images/"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Database initialization
def init_db():
    with sqlite3.connect("database.db") as conn:
        cursor = conn.cursor()
        cursor.execute('''CREATE TABLE IF NOT EXISTS users (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            first_name TEXT,
                            last_name TEXT,
                            username TEXT UNIQUE,
                            email TEXT UNIQUE,
                            password TEXT,
                            profile_pic TEXT DEFAULT 'default.png'
                        )''')
        conn.commit()

init_db()

# Home Route
@app.route("/")
def home():
    return render_template("index.html", username=session.get("username"))

# Register Route
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        first_name = request.form["FirstName"]
        last_name = request.form["LastName"]
        username = request.form["registerName"]
        email = request.form["registerEmail"]
        password = request.form["registerPassword"]
        profile_pic = "default.png"

        with sqlite3.connect("database.db") as conn:
            cursor = conn.cursor()
            try:
                cursor.execute("INSERT INTO users (first_name, last_name, username, email, password, profile_pic) VALUES (?, ?, ?, ?, ?, ?)", 
                               (first_name, last_name, username, email, password, profile_pic))
                conn.commit()
                flash("Registration Successful! Please log in.", "success")
                return redirect(url_for("login"))
            except sqlite3.IntegrityError:
                flash("Username or Email already exists!", "danger")

    return render_template("register.html")

# Login Route
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["loginUsername"]
        password = request.form["loginPassword"]

        with sqlite3.connect("database.db") as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
            user = cursor.fetchone()

        if user:
            session["username"] = user[3]
            session["profile_pic"] = user[6]
            return redirect(url_for("home"))
        else:
            flash("Invalid credentials! Try again.", "danger")

    return render_template("login.html")

# Profile Route
@app.route("/profile", methods=["GET", "POST"])
def profile():
    if "username" not in session:
        return redirect(url_for("login"))

    if request.method == "POST":
        file = request.files["profile_pic"]
        if file:
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            file.save(filepath)

            with sqlite3.connect("database.db") as conn:
                cursor = conn.cursor()
                cursor.execute("UPDATE users SET profile_pic=? WHERE username=?", (filename, session["username"]))
                conn.commit()

            session["profile_pic"] = filename
            flash("Profile picture updated!", "success")

    return render_template("profile.html", username=session["username"], profile_pic=session["profile_pic"])

# Logout Route
@app.route("/logout")
def logout():
    session.pop("username", None)
    session.pop("profile_pic", None)
    return redirect(url_for("home"))

# Route for Travel Planner Page
@app.route("/plan")
def plan():
    return render_template("plan.html")

# Route for Destinations Page
@app.route("/destinations")
def destinations():
    return render_template("destinations.html")

if __name__ == "__main__":
    app.run(debug=True)
