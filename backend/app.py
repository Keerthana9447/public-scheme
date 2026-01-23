from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from .rag_pipeline import RAGPipeline

app = FastAPI(title="Public Scheme Navigator")
rag = RAGPipeline()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/eligibility")
def check_eligibility(
    age: int = Query(...),
    income: int = Query(...),
    gender: str = Query(None),
    occupation: str = Query(None),
    disability: bool = Query(False)
):
    schemes = rag.load_schemes()
    eligible = []
    for scheme in schemes:
        if age >= scheme.get("min_age", 0) and age <= scheme.get("max_age", 200):
            if income <= scheme.get("income_limit", 999999):
                eligible.append(scheme["name"])

    if eligible:
        return {
            "message": "✅ You are eligible for the following services:",
            "eligible_schemes": eligible
        }
    return {
        "message": "❌ You are not eligible for any services.",
        "eligible_schemes": []
    }

# --- Document Guidance ---
@app.get("/guidance")
def get_guidance(scheme: str = Query(...)):
    guidance_map = {
        "Scholarship for Students": [
            "Birth certificate",
            "School ID card",
            "Income certificate",
            "Previous year marksheet"
        ],
        "Senior Citizen Pension": [
            "Age proof (Aadhaar/PAN)",
            "Income certificate",
            "Bank account details",
            "Residential proof"
        ],
        "Healthcare Subsidy": [
            "Income certificate",
            "Medical records",
            "Aadhaar card",
            "Bank account details"
        ],
        "Disability Support Scheme": [
            "Disability certificate",
            "Income certificate",
            "Aadhaar card",
            "Bank account details"
        ]
    }
    return {"scheme": scheme, "documents": guidance_map.get(scheme, ["No guidance available"])}


# --- Chatbot (simple RAG-like response) ---
@app.get("/chat")
def chat(query: str, age: int = None, income: int = None):
    eligible = []
    if age and income:
        if 10 <= age <= 25 and income <= 200000:
            eligible.append("Scholarship for Students")
        if income <= 150000:
            eligible.append("Healthcare Subsidy")

    if eligible:
        return {"response": f"Based on your age {age} and income {income}, you are eligible for: {', '.join(eligible)}."}
    return {"response": f"I found schemes related to your query '{query}'. Please provide age and income for eligibility check."}
