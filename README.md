# 🧠 Mental Health Score Predictor

An end-to-end Machine Learning application that predicts a student's **Mental Health Score** based on academic, social-media usage, lifestyle, and stress-related factors.

The project combines a **Machine Learning model**, **FastAPI backend**, and **web-based frontend** to provide predictions through an easy-to-use interface.

> ⚠️ **Disclaimer:** This project is intended for educational and demonstration purposes only. The predicted score is not a medical diagnosis or a substitute for professional mental-health assessment.

---

## 🚀 Project Overview

Students' mental well-being can be influenced by several factors such as:

- Daily social media usage
- Number of phone unlocks
- Study hours
- Physical activity
- Sleep duration
- Stress level
- Academic level
- Social media platform usage
- Purpose of social media usage
- Demographic information

This project uses these features to predict a **Mental Health Score** using a machine learning regression model.

The trained model is integrated with a **FastAPI REST API**, allowing the frontend application to send student information and receive a predicted score.

---

## ✨ Features

- 🤖 Machine Learning based mental health score prediction
- 🌲 Random Forest Regression model
- 🔄 Complete data preprocessing pipeline
- 📊 Numerical and categorical feature handling
- 🔤 Ordinal encoding for stress levels
- 🏷️ One-hot encoding for categorical variables
- ⚡ FastAPI REST API
- 🌐 Web-based frontend
- ✅ Input validation using Pydantic
- 🔗 CORS-enabled API
- 📦 Saved trained model using Joblib
- 📓 Jupyter Notebook containing the ML workflow

---

## 🛠️ Tech Stack

### Machine Learning

- Python
- Pandas
- NumPy
- Scikit-learn
- Joblib
- Jupyter Notebook

### Backend

- FastAPI
- Uvicorn
- Pydantic

### Frontend

- HTML
- CSS
- JavaScript

### Tools

- Git
- GitHub
- VS Code

---

## 📂 Project Structure

```text
Mental_health_prediction_model/
│
├── 📓 Mental_Health_Score_Predictor.ipynb
│       └── Data analysis, preprocessing, model training
│
├── 🤖 Mental_Health_Model.pkl
│       └── Trained machine learning model
│
├── 🐍 main.py
│       └── FastAPI backend and prediction endpoint
│
├── 📊 Student Social Media And Mental Health Impact.csv
│       └── Dataset used for model development
│
├── 🌐 index.html
│       └── Frontend interface
│
├── 🎨 style.css
│       └── Frontend styling
│
├── ⚙️ script.js
│       └── Frontend API integration
│
├── 📄 ML Project.html
│       └── Project/web page
│
├── 📦 requirements.txt
│       └── Python dependencies
│
├── 🚫 .gitignore
│
└── 📖 README.md
