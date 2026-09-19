# 🧠 Mental Health Score Predictor

An end-to-end Machine Learning web application that predicts a student's **mental health score** using lifestyle, academic, social-media usage, sleep, physical activity, and perceived stress-related factors.

The project combines:

- Machine Learning
- Data preprocessing
- Scikit-learn
- FastAPI
- Pydantic
- HTML
- CSS
- JavaScript
- REST API
- Cloud deployment

The application provides an interactive web interface where users enter their information and receive a machine-learning-based predicted mental health score.

---

# 🚀 Live Demo

## 👉 [Open Mental Health Score Predictor](https://mental-health-score-predictor-2-762q.onrender.com/)

The application is deployed on **Render** and is available online.

### 🔗 Live Application

https://mental-health-score-predictor-2-762q.onrender.com/

---

# 📌 Project Overview

Mental health can be influenced by multiple lifestyle, academic, behavioral, and social factors.

This project uses a Machine Learning model to analyze factors such as:

- Age
- Gender
- Country
- Academic level
- Social-media platform usage
- Purpose of social-media usage
- Average daily usage hours
- Daily device/app unlocks
- Study hours
- Physical activity
- Sleep duration
- Perceived stress level

The trained Machine Learning model processes these inputs and generates a predicted mental health score.

The prediction is then displayed on an interactive web interface.

---

# 🎯 Objective

The main objective of this project is to build a complete **Machine Learning deployment pipeline** rather than only training a model inside a Jupyter Notebook.

The project demonstrates the complete workflow:

```text
Dataset
   ↓
Data Cleaning
   ↓
Exploratory Data Analysis
   ↓
Feature Engineering
   ↓
Data Preprocessing
   ↓
Model Training
   ↓
Hyperparameter Tuning
   ↓
Model Evaluation
   ↓
Model Serialization
   ↓
FastAPI Backend
   ↓
Web Frontend
   ↓
Cloud Deployment
   ↓
Real-Time Prediction
```

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────────┐
                    │        USER              │
                    │                          │
                    │  Enters lifestyle data   │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │       FRONTEND           │
                    │                          │
                    │  HTML + CSS + JavaScript │
                    └────────────┬─────────────┘
                                 │
                                 │ JSON Request
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │      FASTAPI SERVER      │
                    │                          │
                    │     POST /predict       │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │     PYDANTIC MODEL       │
                    │                          │
                    │   Input Validation       │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │    DATA PREPROCESSING    │
                    │                          │
                    │ • Country Grouping       │
                    │ • Scaling                │
                    │ • Encoding               │
                    │ • Transformation         │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │     ML PIPELINE          │
                    │                          │
                    │ Random Forest Regressor  │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │    PREDICTED SCORE       │
                    │                          │
                    │      e.g. 5.12 / 10      │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │       FRONTEND            │
                    │                          │
                    │ Displays score & signal  │
                    └──────────────────────────┘
```

---

# 🌐 How the Website Works

The website follows a simple client-server architecture.

## Step 1 — User Opens the Website

The user opens the deployed application:

```text
https://mental-health-score-predictor-2-762q.onrender.com/
```

The frontend displays an interactive form.

The user provides information related to:

- Personal details
- Academic information
- Social-media usage
- Lifestyle
- Sleep
- Physical activity
- Stress

---

# 📝 Step 2 — User Enters Information

The frontend collects the following information.

### Personal Information

```text
Age
Gender
Country
```

### Academic Information

```text
Academic Level
Study Hours
```

### Social Media Information

```text
Most Used Platform
Purpose of Use
Average Daily Usage Hours
Daily Unlocks
```

### Lifestyle Information

```text
Physical Activity Hours
Sleep Hours Per Night
```

### Stress Information

```text
Stress Level
```

---

# 🔄 Step 3 — JavaScript Collects the Data

The frontend is implemented using JavaScript.

When the user clicks:

```text
Read my signal
```

JavaScript collects the values from the form.

The data is converted into the structure expected by the FastAPI backend.

Example:

```json
{
  "Age": 20,
  "Gender": "Male",
  "Country": "India",
  "Academic_Level": "Undergraduate",
  "Most_Used_Platform": "Instagram",
  "Purpose_Of_Use": "Entertainment",
  "Avg_Daily_Usage_Hours": 4.5,
  "Daily_Unlocks": 35,
  "Study_Hours": 4,
  "Physical_Activity_Hours": 2,
  "Sleep_Hours_Per_Night": 6,
  "Stress_Level": "High"
}
```

---

# 📡 Step 4 — JavaScript Sends a POST Request

The frontend sends the data to the FastAPI backend using the browser's Fetch API.

The request is sent to:

```text
POST /predict
```

Live API endpoint:

```text
https://mental-health-score-predictor-2-762q.onrender.com/predict
```

The request uses JSON:

```javascript
fetch(API_URL, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
});
```

---

# 🐍 Step 5 — FastAPI Receives the Request

The backend is built using **FastAPI**.

The main backend file is:

```text
main.py
```

FastAPI receives the request through:

```text
POST /predict
```

The backend uses Pydantic models to validate the incoming data.

---

# 🛡️ Step 6 — Input Validation

The backend validates the submitted information before sending it to the ML model.

For example:

```text
Age
10 – 100
```

Numerical fields such as:

```text
Average Daily Usage Hours
Study Hours
Physical Activity Hours
Sleep Hours
```

are restricted to reasonable ranges.

Categorical fields are also validated.

For example:

```text
Academic Level
├── Undergraduate
├── Graduate
└── High School
```

Stress level:

```text
Low
Medium
High
Very High
```

This prevents invalid input from being directly passed into the Machine Learning pipeline.

---

# 🌍 Step 7 — Country Grouping

The original dataset contains multiple countries.

To keep the model's categorical representation manageable, frequently represented countries are retained while other countries are grouped into:

```text
Other
```

The supported grouped countries include:

```text
Other
India
USA
Canada
Australia
UK
Germany
Mexico
Turkey
France
```

If the submitted country is not part of this list, it is mapped to:

```text
Other
```

This grouped feature is then passed into the Machine Learning pipeline.

---

# 🧹 Step 8 — Data Preparation

After validation, FastAPI creates a Pandas DataFrame containing the submitted information.

The structure contains:

```text
Age
Gender
Country
Academic_Level
Most_Used_Platform
Purpose_Of_Use
Avg_Daily_Usage_Hours
Daily_Unlocks
Study_Hours
Physical_Activity_Hours
Sleep_Hours_Per_Night
Stress_Level
Grouped_Country
```

The DataFrame is then passed to the trained Machine Learning pipeline.

---

# ⚙️ Step 9 — Machine Learning Preprocessing

The model uses different preprocessing techniques for different feature types.

## Numerical Features

Numerical features include:

```text
Age
Avg_Daily_Usage_Hours
Daily_Unlocks
Physical_Activity_Hours
Sleep_Hours_Per_Night
```

These features are processed using numerical preprocessing and scaling.

---

## Study Hours Transformation

`Study_Hours` is treated as a skewed numerical feature.

A logarithmic transformation is applied:

```text
log1p()
```

followed by scaling.

Conceptually:

```text
Study Hours
     ↓
log1p transformation
     ↓
StandardScaler
     ↓
Transformed Feature
```

---

# 🔢 Step 10 — Ordinal Encoding

Stress level has an inherent order.

Therefore, it is treated as an ordinal feature.

The encoding order is:

```text
Low
  ↓
Medium
  ↓
High
  ↓
Very High
```

This allows the model to preserve the ordered nature of the stress levels.

---

# 🏷️ Step 11 — One-Hot Encoding

Nominal categorical features do not have a natural numerical order.

These include:

```text
Gender
Academic_Level
Most_Used_Platform
Purpose_Of_Use
Grouped_Country
```

These features are transformed using:

```text
OneHotEncoder
```

with unknown categories handled safely.

---

# 🌲 Step 12 — Random Forest Regression

After preprocessing, the transformed features are passed to the trained:

```text
RandomForestRegressor
```

The Random Forest model combines predictions from multiple decision trees to generate the final regression output.

The model is stored as:

```text
Mental_Health_Model.pkl
```

The backend loads this model using:

```python
joblib.load()
```

---

# 🎛️ Step 13 — Hyperparameter Tuning

During model development, hyperparameters were tuned using:

```text
RandomizedSearchCV
```

The search included parameters such as:

```text
n_estimators
max_depth
min_samples_split
min_samples_leaf
```

The search used cross-validation to compare different parameter combinations.

---

# 📊 Step 14 — Model Prediction

Once the processed data reaches the trained Random Forest model, the model generates a numerical prediction.

For example:

```text
5.12
```

The backend rounds the result before returning it to the frontend.

---

# 📤 Step 15 — FastAPI Returns JSON

The API returns a JSON response similar to:

```json
{
  "predicted_mental_health_status": 5.12
}
```

The response is sent back to the browser.

---

# 🎨 Step 16 — Frontend Displays the Result

JavaScript receives the API response.

The predicted score is then displayed on the result panel.

For example:

```text
5.12 / 10
```

The interface also displays a corresponding signal/message based on the application's frontend logic.

The user can then select:

```text
Run another read
```

to return to the input form and perform another prediction.

---

# 🔁 Complete Prediction Flow

The complete process can be summarized as:

```text
User
 │
 ▼
Open Website
 │
 ▼
Enter Information
 │
 ▼
Click "Read my signal"
 │
 ▼
JavaScript Collects Form Data
 │
 ▼
Create JSON Payload
 │
 ▼
POST /predict
 │
 ▼
FastAPI
 │
 ▼
Pydantic Validation
 │
 ▼
Country Grouping
 │
 ▼
Pandas DataFrame
 │
 ▼
Preprocessing Pipeline
 │
 ├── Numerical Scaling
 ├── log1p Transformation
 ├── Ordinal Encoding
 └── One-Hot Encoding
 │
 ▼
Random Forest Regressor
 │
 ▼
Predicted Score
 │
 ▼
FastAPI JSON Response
 │
 ▼
JavaScript Receives Response
 │
 ▼
Result Display
 │
 ▼
User Sees Mental Health Score
```

---

# 🤖 Machine Learning Pipeline

The Machine Learning pipeline can be represented as:

```text
Raw Input
    │
    ▼
Feature Selection
    │
    ▼
┌──────────────────────────────────────┐
│        ColumnTransformer             │
│                                      │
│ Numerical Features                   │
│        ↓                             │
│ StandardScaler                       │
│                                      │
│ Study Hours                          │
│        ↓                             │
│ log1p + StandardScaler               │
│                                      │
│ Stress Level                         │
│        ↓                             │
│ OrdinalEncoder                       │
│                                      │
│ Nominal Categories                   │
│        ↓                             │
│ OneHotEncoder                        │
└──────────────────┬───────────────────┘
                   │
                   ▼
        Random Forest Regressor
                   │
                   ▼
          Mental Health Score
```

---

# 🧠 Machine Learning Features

The model uses the following feature groups.

## Numerical Features

```text
Age
Avg_Daily_Usage_Hours
Daily_Unlocks
Study_Hours
Physical_Activity_Hours
Sleep_Hours_Per_Night
```

## Ordinal Feature

```text
Stress_Level
```

## Categorical Features

```text
Gender
Academic_Level
Most_Used_Platform
Purpose_Of_Use
Grouped_Country
```

---

# 📊 Input Features

| Feature | Type | Description |
|---|---|---|
| Age | Numerical | Age of the student |
| Gender | Categorical | Gender category |
| Country | Categorical | Country of the student |
| Academic Level | Categorical | Current academic level |
| Most Used Platform | Categorical | Most frequently used social-media platform |
| Purpose of Use | Categorical | Main purpose of social-media usage |
| Daily Usage Hours | Numerical | Average daily social-media usage |
| Daily Unlocks | Numerical | Number of daily device/app unlocks |
| Study Hours | Numerical | Daily study duration |
| Physical Activity | Numerical | Daily physical activity duration |
| Sleep Hours | Numerical | Average sleep per night |
| Stress Level | Ordinal | Perceived stress level |

---

# 📱 Supported Social Media Platforms

The application supports:

```text
Facebook
LinkedIn
Instagram
Snapchat
Twitter
YouTube
TikTok
LINE
KakaoTalk
VKontakte
WhatsApp
WeChat
```

---

# 🎓 Supported Academic Levels

```text
Undergraduate
Graduate
High School
```

---

# 🎯 Supported Purposes of Use

```text
Networking
Education
Entertainment
News
```

---

# 🧠 Supported Stress Levels

```text
Low
Medium
High
Very High
```

---

# 🔌 API Documentation

## Base URL

```text
https://mental-health-score-predictor-2-762q.onrender.com
```

## Prediction Endpoint

```text
POST /predict
```

Full endpoint:

```text
https://mental-health-score-predictor-2-762q.onrender.com/predict
```

---

# 📥 API Request

Example request:

```json
{
  "Age": 20,
  "Gender": "Male",
  "Country": "India",
  "Academic_Level": "Undergraduate",
  "Most_Used_Platform": "Instagram",
  "Purpose_Of_Use": "Entertainment",
  "Avg_Daily_Usage_Hours": 4.5,
  "Daily_Unlocks": 35,
  "Study_Hours": 4,
  "Physical_Activity_Hours": 2,
  "Sleep_Hours_Per_Night": 6,
  "Stress_Level": "High"
}
```

---

# 📤 API Response

Example:

```json
{
  "predicted_mental_health_status": 5.12
}
```

The frontend receives this response and displays the predicted score to the user.

---

# 📚 API Documentation Interface

FastAPI automatically provides interactive API documentation.

When running locally:

### Swagger UI

```text
http://127.0.0.1:8000/docs
```

### ReDoc

```text
http://127.0.0.1:8000/redoc
```

The Swagger interface can be used to manually test the `/predict` endpoint by sending JSON requests.

---

# 🛠️ Technology Stack

## Frontend

```text
HTML5
CSS3
JavaScript
Fetch API
```

## Backend

```text
Python
FastAPI
Uvicorn
Pydantic
```

## Machine Learning

```text
Scikit-learn
Pandas
NumPy
Joblib
```

## Model

```text
Random Forest Regressor
```

## Development

```text
Jupyter Notebook
VS Code
Git
GitHub
```

## Deployment

```text
Render
```

---

# 📂 Project Structure

```text
Mental_Health_Score_Predictor/
│
├── index.html
│
├── style.css
│
├── script.js
│
├── main.py
│
├── Mental_Health_Model.pkl
│
├── Mental_Health_Score_Predictor.ipynb
│
├── Student Social Media And Mental Health Impact.csv
│
├── requirements.txt
│
├── .python-version
│
├── .gitignore
│
└── README.md
```

---

# 📄 File Description

| File | Purpose |
|---|---|
| `index.html` | Frontend structure and prediction form |
| `style.css` | Website styling and responsive UI |
| `script.js` | Form handling, API requests, validation, and result display |
| `main.py` | FastAPI backend |
| `Mental_Health_Model.pkl` | Trained Machine Learning model |
| `Mental_Health_Score_Predictor.ipynb` | Model development and experimentation |
| `Student Social Media And Mental Health Impact.csv` | Dataset |
| `requirements.txt` | Python dependencies |
| `.python-version` | Python runtime version |
| `.gitignore` | Files excluded from Git |
| `README.md` | Project documentation |

---

# 🖥️ Running the Project Locally

## 1. Clone the Repository

```bash
git clone https://github.com/Siddharth8445/Mental_Health_Score_Predictor.git
```

Move into the project:

```bash
cd Mental_Health_Score_Predictor
```

---

# 2. Create a Virtual Environment

Using Python:

```bash
python -m venv .venv
```

Activate the environment on Windows:

```powershell
.venv\Scripts\Activate.ps1
```

---

# 3. Install Dependencies

Using pip:

```bash
pip install -r requirements.txt
```

Or using `uv`:

```bash
uv pip install -r requirements.txt
```

---

# 4. Start the FastAPI Server

Run:

```bash
uvicorn main:app --reload
```

The backend will start at:

```text
http://127.0.0.1:8000
```

---

# 5. Open the Website

Open:

```text
http://127.0.0.1:8000
```

The frontend will load and communicate with the FastAPI backend.

---

# 6. Test the API

Open:

```text
http://127.0.0.1:8000/docs
```

Use the Swagger UI to test:

```text
POST /predict
```

---

# ☁️ Deployment

The application is deployed using **Render**.

The deployment consists of a Python FastAPI web service that serves the frontend and exposes the Machine Learning prediction endpoint.

### Deployment Flow

```text
GitHub Repository
       │
       ▼
     Render
       │
       ▼
Install Python Dependencies
       │
       ▼
Start Uvicorn
       │
       ▼
Load Mental_Health_Model.pkl
       │
       ▼
FastAPI Application
       │
       ├───────────────┐
       ▼               ▼
   Frontend        /predict
       │               │
       │               ▼
       │          ML Prediction
       │               │
       └───────◄───────┘
```

---

# 🚀 Production Application

### Live Website

👉 https://mental-health-score-predictor-2-762q.onrender.com/

### Prediction API

👉 https://mental-health-score-predictor-2-762q.onrender.com/predict

---

# 🔐 Input Validation

The API uses Pydantic models for request validation.

Examples of validation include:

```text
Age
10 – 100
```

```text
Average Daily Usage Hours
0 – 24
```

```text
Study Hours
0 – 24
```

```text
Physical Activity Hours
0 – 24
```

```text
Sleep Hours
0 – 24
```

Categorical values are also restricted to the supported categories.

This helps prevent malformed requests from reaching the Machine Learning model.

---

# 🌐 CORS

The FastAPI backend includes CORS middleware so that the frontend can communicate with the API when served from a different origin.

The application allows:

```text
GET
POST
```

and other required HTTP methods/headers for frontend communication.

---

# ⚡ Error Handling

The application handles several types of errors.

### Frontend Validation

Invalid or missing values are detected before sending the prediction request.

### Backend Validation

FastAPI/Pydantic validates incoming JSON data.

### API Errors

If the prediction request fails, the frontend displays an appropriate error state rather than displaying an invalid prediction.

### Unexpected API Response

The frontend verifies that the expected prediction value exists before displaying the result.

---

# 🔄 Prediction Example

Suppose a user enters:

```text
Age: 20
Gender: Male
Country: India

Academic Level:
Undergraduate

Platform:
Instagram

Purpose:
Entertainment

Daily Usage:
4.5 hours

Daily Unlocks:
35

Study:
4 hours

Physical Activity:
2 hours

Sleep:
6 hours

Stress:
High
```

The frontend converts the information into JSON.

```text
                USER INPUT
                    │
                    ▼
              JavaScript
                    │
                    ▼
              JSON Payload
                    │
                    ▼
            POST /predict
                    │
                    ▼
               FastAPI
                    │
                    ▼
          Pydantic Validation
                    │
                    ▼
          Feature Preparation
                    │
                    ▼
          ML Preprocessing
                    │
                    ▼
         Random Forest Model
                    │
                    ▼
             Prediction
                    │
                    ▼
                5.12
                    │
                    ▼
              Frontend
                    │
                    ▼
             5.12 / 10
```

---

# 📈 Model Development Workflow

The model development process followed:

```text
1. Dataset Collection
        ↓
2. Data Understanding
        ↓
3. Data Cleaning
        ↓
4. Exploratory Data Analysis
        ↓
5. Feature Selection
        ↓
6. Feature Engineering
        ↓
7. Preprocessing Pipeline
        ↓
8. Train/Test Split
        ↓
9. Random Forest Regression
        ↓
10. Hyperparameter Tuning
        ↓
11. Model Evaluation
        ↓
12. Model Serialization
        ↓
13. FastAPI Integration
        ↓
14. Deployment
```

---

# 🧪 Model Training

The Machine Learning model was developed using a Scikit-learn pipeline.

The preprocessing pipeline handles different types of features separately.

```text
Numerical Features
        ↓
StandardScaler

Study Hours
        ↓
log1p
        ↓
StandardScaler

Stress Level
        ↓
OrdinalEncoder

Nominal Categories
        ↓
OneHotEncoder

All Features
        ↓
RandomForestRegressor
```

---

# 🔍 Hyperparameter Optimization

RandomizedSearchCV was used for hyperparameter optimization.

Parameters explored included:

```text
n_estimators
max_depth
min_samples_split
min_samples_leaf
```

Example search space:

```text
n_estimators:
100
200
300

max_depth:
5
10
15

min_samples_split:
2
5
10

min_samples_leaf:
1
2
4
```

---

# 📊 Why a Pipeline Was Used

Using a single Machine Learning pipeline ensures that preprocessing and model prediction follow the same sequence.

Instead of manually transforming data before every prediction:

```text
Input
 ↓
Preprocessing
 ↓
Model
```

the trained pipeline performs the required transformations automatically.

This reduces the possibility of inconsistencies between training and inference.

---

# 🔬 Technologies Explained

## Python

Used as the primary programming language for:

- Machine Learning
- Data processing
- Backend development

---

## Pandas

Used for:

- Loading datasets
- Data cleaning
- DataFrame creation
- Preparing prediction inputs

---

## NumPy

Used for:

- Numerical operations
- Mathematical transformations
- Machine Learning preprocessing

---

## Scikit-learn

Used for:

- Preprocessing
- Pipeline construction
- Encoding
- Scaling
- Random Forest Regression
- Hyperparameter tuning

---

## Joblib

Used to save and load the trained Machine Learning model.

```python
joblib.load("Mental_Health_Model.pkl")
```

---

## FastAPI

FastAPI provides the backend REST API.

The main prediction endpoint is:

```text
POST /predict
```

---

## Pydantic

Pydantic is used to define and validate the API request schema.

---

## JavaScript

JavaScript handles:

- Form submission
- Input collection
- API communication
- JSON processing
- Result rendering
- Error handling
- UI interactions

---

## HTML & CSS

HTML provides the structure of the application.

CSS provides:

- Layout
- Colors
- Cards
- Buttons
- Responsive design
- Result visualization

---

# 📱 User Experience

The application is designed around a simple workflow:

```text
Open Website
      ↓
Enter Information
      ↓
Read My Signal
      ↓
Wait for Prediction
      ↓
View Score
      ↓
Run Another Read
```

The user does not need to understand Machine Learning or interact directly with the API.

---

# 🧩 Key Features

### 🧠 ML Prediction

Uses a trained Random Forest regression model.

### ⚡ Real-Time API

The frontend communicates with FastAPI using HTTP requests.

### 🛡️ Validation

Input values are validated using Pydantic.

### 🌍 Country Handling

Unknown countries are grouped into `Other`.

### 📊 Multiple Feature Types

The pipeline handles:

- Numerical features
- Ordinal features
- Nominal categorical features

### 🌐 Cloud Deployment

The application is available online through Render.

### 📱 Interactive UI

Users can enter information and receive results without interacting with the backend directly.

---

# 📌 Project Highlights

This project demonstrates practical knowledge of:

```text
Machine Learning
        +
Data Preprocessing
        +
Feature Engineering
        +
Scikit-learn Pipelines
        +
Random Forest Regression
        +
Hyperparameter Tuning
        +
FastAPI
        +
REST APIs
        +
Pydantic
        +
Frontend Development
        +
API Integration
        +
Cloud Deployment
```

---

# 🚧 Future Improvements

Possible future improvements include:

- [ ] Add SHAP-based explainability
- [ ] Add prediction history
- [ ] Add interactive analytics dashboard
- [ ] Add user authentication
- [ ] Store prediction records
- [ ] Add database integration
- [ ] Add model comparison
- [ ] Add confidence/uncertainty information
- [ ] Improve mobile UI
- [ ] Add automated model retraining
- [ ] Add API authentication
- [ ] Add rate limiting
- [ ] Add monitoring and logging
- [ ] Add unit and integration tests

---

# ⚠️ Important Disclaimer

This project is intended **only for educational and informational purposes**.

The prediction generated by this application is produced by a Machine Learning model based on the input features provided by the user.

It should **not** be considered:

- A medical diagnosis
- A clinical assessment
- Professional mental-health advice
- A substitute for a qualified healthcare professional

If someone is experiencing mental-health difficulties or needs professional support, they should consult an appropriately qualified healthcare or mental-health professional.

---

# 👨‍💻 Author

## Siddharth Kumar

B.Tech — Computer Science & Engineering  
J.S.S. Academy of Technical Education, Noida

### GitHub

https://github.com/Siddharth8445

### Project Repository

https://github.com/Siddharth8445/Mental_Health_Score_Predictor

---

# ⭐ Project Links

| Resource | Link |
|---|---|
| 🚀 Live Application | https://mental-health-score-predictor-2-762q.onrender.com/ |
| 💻 GitHub Repository | https://github.com/Siddharth8445/Mental_Health_Score_Predictor |
| 🔌 Prediction API | https://mental-health-score-predictor-2-762q.onrender.com/predict |

---

# 📊 Project Status

```text
Frontend                ✅ Complete
Backend                 ✅ Complete
Machine Learning Model  ✅ Complete
Data Preprocessing      ✅ Complete
FastAPI API             ✅ Complete
Frontend/API Integration✅ Complete
Cloud Deployment        ✅ Complete
Live Application        ✅ Available
Documentation           ✅ Complete
```

---

# ⭐ If You Like This Project

If you found this project interesting or useful, consider giving the repository a ⭐ on GitHub.

---

## 🚀 Try It Now

### 👉 [Open the Mental Health Score Predictor](https://mental-health-score-predictor-2-762q.onrender.com/)

Enter your information, click **Read my signal**, and the application will send your data through the complete Machine Learning prediction pipeline and display the resulting score.     └──────────────────────────────┘
