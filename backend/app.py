from flask import Flask, request, jsonify, render_template
import pickle, os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_DIR = os.path.join(BASE_DIR, "..", "frontend", "templates")
STATIC_DIR = os.path.join(BASE_DIR, "..", "frontend", "static")

app = Flask(
    __name__,
    template_folder=TEMPLATE_DIR,
    static_folder=STATIC_DIR
)

model = pickle.load(open(os.path.join(BASE_DIR, "model", "model.pkl"), "rb"))
vectorizer = pickle.load(open(os.path.join(BASE_DIR, "model", "vectorizer.pkl"), "rb"))

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("text", "")
    if not text.strip():
        return jsonify({"error": "Text cannot be empty"}), 400

    X = vectorizer.transform([text])
    proba = model.predict_proba(X)[0][1]

    label = "Human-written" if proba < 0.5 else "AI-generated"

    if proba >= 0.85:
        decision = "🚨 Highly likely AI-generated"
    elif proba >= 0.6:
        decision = "⚠️ Needs Review"
    else:
        decision = "✅ Likely Human-written"

    return jsonify({
        "label": label,
        "confidence": round(float(proba), 3),
        "decision": decision
    })

if __name__ == "__main__":
    app.run(debug=True)