# 🤖 AI vs Human Text Detection System

A Machine Learning system that classifies whether a given text is **AI-generated** or **Human-written**, with an intelligent confidence-based decision layer.

---

## 📦 Dataset

| Property | Detail |
|---|---|
| **File** | `ai_vs_human_text.csv` |
| **Total Samples** | 1000 |
| **Classes** | AI-generated (507) · Human-written (493) |
| **Balance** | ~50/50 — balanced dataset |
| **Features Used** | `text` column (raw text) |
| **Label Column** | `label` (AI-generated / Human-written) |

---

## 🔧 Preprocessing Steps

1. **Lowercase** — normalize all text to lowercase
2. **Remove URLs** — strip `http://`, `www.` patterns
3. **Remove HTML tags** — clean any embedded HTML
4. **Remove punctuation** — strip all punctuation characters
5. **Remove digits** — remove numeric characters
6. **Remove extra whitespace** — collapse multiple spaces to single

---

## 🧠 Models Trained

| Model | Vectorizer | Notes |
|---|---|---|
| **Logistic Regression** | TF-IDF (bigrams) | Primary model — well-calibrated probabilities |
| **Multinomial Naive Bayes** | CountVectorizer (bigrams) | Classic NLP baseline |
| **Linear SVM (Calibrated)** | TF-IDF (bigrams) | Strong high-dim classifier |

**Vectorization:** TF-IDF with unigrams + bigrams, 10,000 features, English stopwords removed, log normalization enabled.

---

## 🎯 Intelligent Decision Layer

| Confidence Score | Decision | Meaning |
|---|---|---|
| ≥ 0.80 | ✅ **Acceptable (High Certainty)** | Model is very confident — result is reliable |
| 0.60 – 0.79 | ❓ **Needs Review (Moderate Certainty)** | Borderline — recommend human verification |
| < 0.60 | ⚠️ **Likely AI-generated / Uncertain** | Very low confidence — treat with suspicion |

### Threshold Justification
- **0.80** cutoff ensures only high-quality, confident predictions are marked "Acceptable"
- **0.60** is the minimum threshold for any binary classification — below this is near-random
- Logistic Regression produces naturally well-calibrated probabilities, making thresholds meaningful

---

## 📊 Sample Output

```
==================================================================
🔎 TEXT DETECTION RESULT
==================================================================
📄 Text:        Artificial intelligence refers to the simulation of...
🎯 Prediction:  AI-generated
📊 Confidence:  91.30%
✅ Decision:    Acceptable (High Certainty)
💬 Explanation: Model is highly confident (91.3%) this is AI-generated.
==================================================================
```

---

## 🚀 How to Run

### Requirements
```bash
pip install scikit-learn pandas numpy matplotlib
```

### Run the Notebook
```bash
jupyter notebook AI_vs_Human_Text_Detection.ipynb
```

### Quick Test (Python)
```python
result = predict_text("Your text here")
display_result(result)
```

---

## 📁 File Structure

```
AI_Human_Detector_Project/
│
├── backend/
│   ├── app.py                 # Flask backend placeholder
│   ├── model/
│   │     ├── model.pkl        # Placeholder for your trained model
│   │     └── vectorizer.pkl   # Placeholder for your vectorizer
│   ├── templates/
│   │     └── index.html       # Placeholder HTML
│   └── static/
│        ├── style.css         # Placeholder CSS
│        └── script.js         # Placeholder JS
│
├── model_training/
│   └── train_model.ipynb      # Placeholder notebook
│
└── README.md                  # Full single-page README
```

---

## ⚠️ Rules Followed

- ❌ No external AI APIs (OpenAI, etc.)
- ❌ No pre-built AI detection tools
- ❌ No copied Kaggle notebooks
- ✅ Pure scikit-learn ML pipeline
- ✅ Runs 100% offline / without internet
