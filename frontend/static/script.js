async function analyzeText() {
    const text = document.getElementById("inputText").value;
    if (!text.trim()) { 
        alert("Enter some text!"); 
        return; 
    }

    // Show loader
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("resultBox").classList.add("hidden");
    document.getElementById("confidenceContainer").classList.add("hidden");

    try {
        const response = await fetch("/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });

        const data = await response.json();
        document.getElementById("loader").classList.add("hidden");

        // Show results
        document.getElementById("resultBox").classList.remove("hidden");
        document.getElementById("confidenceContainer").classList.remove("hidden");

        // Set text with proper HTML formatting
        document.getElementById("label").innerHTML = `📝 Prediction: <b>${data.label}</b>`;
        document.getElementById("confidence").innerHTML = `📊 Confidence: <b>${(data.confidence*100).toFixed(1)}%</b>`;
        document.getElementById("decision").innerHTML = `🤖 Decision: <b>${data.decision}</b>`;

        // Animate confidence bar
        const bar = document.getElementById("confidenceBar");
        const percent = data.confidence * 100;
        bar.style.width = percent + "%";

        // Set color based on probability thresholds
        if (percent >= 85) {
            bar.style.background = "#ff4d4d"; // High AI confidence → red
        } else if (percent >= 60) {
            bar.style.background = "#ffcc00"; // Moderate → yellow
        } else {
            bar.style.background = "#00ff7f"; // Likely human → green
        }

    } catch (err) {
        document.getElementById("loader").classList.add("hidden");
        alert("Error contacting backend.");
        console.error(err);
    }
}