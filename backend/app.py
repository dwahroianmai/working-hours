import os
import requests
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

db_uri = os.getenv("DB_URI")
app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
db = SQLAlchemy(app)

CORS(app, supports_credentials=True)


# db
class Work(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    hours = db.Column(db.Integer, nullable=False)
    job = db.Column(db.String(30), nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    def __init__(self, hours, job, date):
        self.hours = hours
        self.job = job
        self.date = date


@app.after_request
def add_cors_headers(response):
    response.headers.add("Access-Control-Allow-Origin", "https://denezhki.onrender.com")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type")
    response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response


@app.route("/data", methods=["POST"])
def data():
    time = request.json["time"]
    hours = request.json["hours"]
    job = request.json["job"]

    info = Work(date=time, hours=hours, job=job)
    db.session.add(info)
    db.session.commit()
    return {"sent": "okay"}


@app.route("/all")
def money():
    rohlik_money = 0
    rohlik = db.session.query(Work).filter(Work.job == "rohlik")
    for row in rohlik:
        rohlik_money += 153 * row.hours
    populo_money = 0
    populo = db.session.query(Work).filter(Work.job == "populo")
    for row in populo:
        populo_money += 144.5 * row.hours
    rohlik_p_money = 0
    rohlik_p = db.session.query(Work).filter(Work.job == "rohlik-p")
    for row in rohlik_p:
        rohlik_p_money += 170 * row.hours
    all = rohlik_money + populo_money + rohlik_p_money
    return {"money": all}


@app.route("/rubles", methods=["POST"])
def rubles():
    try:
        api_key = os.getenv("API_KEY")
    except:
        return "API key was not set."

    try:
        sum = request.json["sum"]
        response = requests.get(
            f"https://api.apilayer.com/currency_data/convert?to=RUB&from=CZK&amount={sum}",
            headers={"apikey": api_key},
        )

        api_data = response.json()
        rub = int(api_data["result"])
        return {"rub": rub}
    except Exception as e:
        return {"error": f"Something went wrong, /rubles, {e}"}


@app.route("/password", methods=["POST"])
def password():
    sent_password = request.json["password"]
    password = os.getenv("PASSWORD")

    if sent_password == password:
        return {"confirmed": True}
    return {"confirmed": False, "error": "Вы - не Дарина"}


if __name__ == "__main__":
    app.run()
