import joblib
import pandas as pd

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field
from typing import Literal


# Load trained model
model = joblib.load("Mental_Health_Model.pkl")

app = FastAPI()


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


top_countries = [
    "Other",
    "India",
    "USA",
    "Canada",
    "Australia",
    "UK",
    "Germany",
    "Mexico",
    "Turkey",
    "France"
]


# -----------------------------
# Input data model
# -----------------------------

class StudentData(BaseModel):
    Age: int = Field(..., ge=10, le=100)

    Gender: Literal[
        "Male",
        "Female",
        "Other"
    ]

    Country: str

    Academic_Level: Literal[
        "Undergraduate",
        "Graduate",
        "High School"
    ]

    Most_Used_Platform: Literal[
        "Facebook",
        "LinkedIn",
        "Instagram",
        "Snapchat",
        "Twitter",
        "YouTube",
        "TikTok",
        "LINE",
        "KakaoTalk",
        "VKontakte",
        "WhatsApp",
        "WeChat"
    ]

    Purpose_Of_Use: Literal[
        "Networking",
        "Education",
        "Entertainment",
        "News"
    ]

    Avg_Daily_Usage_Hours: float = Field(..., ge=0, le=24)

    Daily_Unlocks: int = Field(..., ge=0)

    Study_Hours: float = Field(..., ge=0, le=24)

    Physical_Activity_Hours: float = Field(..., ge=0, le=24)

    Sleep_Hours_Per_Night: float = Field(..., ge=0, le=24)

    Stress_Level: Literal[
        "Medium",
        "Low",
        "Very High",
        "High"
    ]


# -----------------------------
# Response model
# -----------------------------

class PredictionResponse(BaseModel):
    predicted_mental_health_status: float


# -----------------------------
# Frontend
# -----------------------------

@app.get("/")
def home():
    return FileResponse("index.html")


@app.get("/style.css")
def style():
    return FileResponse(
        "style.css",
        media_type="text/css"
    )


@app.get("/script.js")
def script():
    return FileResponse(
        "script.js",
        media_type="application/javascript"
    )


# -----------------------------
# Prediction API
# -----------------------------

@app.post("/predict", response_model=PredictionResponse)
def predict(data: StudentData):

    country_group = (
        data.Country
        if data.Country in top_countries
        else "Other"
    )

    input_row = pd.DataFrame([{
        "Age": data.Age,
        "Gender": data.Gender,
        "Country": data.Country,
        "Academic_Level": data.Academic_Level,
        "Most_Used_Platform": data.Most_Used_Platform,
        "Purpose_Of_Use": data.Purpose_Of_Use,
        "Avg_Daily_Usage_Hours": data.Avg_Daily_Usage_Hours,
        "Daily_Unlocks": data.Daily_Unlocks,
        "Study_Hours": data.Study_Hours,
        "Physical_Activity_Hours": data.Physical_Activity_Hours,
        "Sleep_Hours_Per_Night": data.Sleep_Hours_Per_Night,
        "Stress_Level": data.Stress_Level,
        "Grouped_Country": country_group
    }])

    prediction = model.predict(input_row)[0]

    return PredictionResponse(
        predicted_mental_health_status=round(
            float(prediction),
            2
        )
    )