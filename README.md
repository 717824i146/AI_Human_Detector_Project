Project Overview

Detects whether a text is AI-generated or Human-written using machine learning.

Confidence-based predictions
Interactive Flask web app
TF-IDF vectorization, Logistic Regression & Naive Bayes

Folder Structure
AI_Human_Detector_Project
├── backend
│   ├── app.py
│   ├── model
│   │     ├── model.pkl
│   │     └── vectorizer.pkl
│   ├── templates/index.html
│   └── static/{style.css, script.js}
└── model_training/train_model.ipynb

Features
Preprocessing: lowercase, punctuation removal
Models: Logistic Regression (primary), Naive Bayes (validation)
Confidence-based rules:
✅ High certainty (≥80%)
❓ Needs review (60–79%)
⚠️ Likely AI-generated (<60%)

Frontend: dark theme, animations, interactive analyze button
Installation & Usage
git clone https://github.com/717824i146/AI_Human_Detector_Project.git
cd AI_Human_Detector_Project/backend
python -m venv .venv
.venv\Scripts\activate    # Windows
pip install -r requirements.txt
python app.py

Open in browser: http://127.0.0.1:5000/

Dataset
File: ai_vs_human_text.csv
Columns: text, label
Preprocessing: duplicates removed, lowercase, punctuation removed
TF-IDF vectorization (unigrams + bigrams)

Model Training
Split: 75% train / 25% test

Models trained: Logistic Regression & Naive Bayes
Evaluated using accuracy, precision, recall, F1-score
Logistic Regression used in production

Example Inputs
AI-generated:

“The algorithm optimizes weights using stochastic gradient descent.”

Human-written:

“I went for a walk today and saw the beautiful sunrise.”

Frontend Output Example:

Prediction: Human-written
Confidence: 92%
Decision: ✅ High certainty

Video Demo
Covers dataset, preprocessing, model training, live prediction
Duration: 3–5 minutes
Team members narrate and demonstrate all steps
