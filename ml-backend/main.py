from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List
from PIL import Image
import numpy as np
import cv2
import io
from pyzbar.pyzbar import decode
from geopy.distance import geodesic
from sklearn.cluster import KMeans
from sentence_transformers import SentenceTransformer, util
import torch
# import tensorflow as tf
# from tensorflow.keras.applications.mobilenet_v2 import preprocess_input, decode_predictions
# from tensorflow.keras.preprocessing import image as keras_image

app = FastAPI()

# Load models at startup (placeholders for demo)
sbert_model = SentenceTransformer('all-MiniLM-L6-v2')  # For education rec
# pill_model = tf.keras.applications.MobileNetV2(weights='imagenet')  # Uncomment when using real model
# transformer_model = ... # Load BioBERT/ClinicalBERT for /diagnose

# Allow CORS for local dev and Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy medicine database
medicines = {
    "1234567890": {"name": "Paracetamol", "status": "authentic"},
    "0987654321": {"name": "Amoxicillin", "status": "counterfeit"},
}

# Dummy clinics with lat/lon
clinics = [
    {"id": 1, "name": "Nairobi Health Center", "lat": -1.2921, "lon": 36.8219, "address": "123 Kenyatta Ave, Nairobi"},
    {"id": 2, "name": "Kisumu Medical Clinic", "lat": -0.0917, "lon": 34.7680, "address": "456 Lake Rd, Kisumu"},
    {"id": 3, "name": "Mombasa Hospital", "lat": -4.0435, "lon": 39.6682, "address": "789 Moi Ave, Mombasa"},
]

class LocationRequest(BaseModel):
    lat: float
    lon: float

@app.post("/scan-barcode/")
async def scan_barcode(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        img_np = np.array(image)
        barcodes = decode(img_np)
        if not barcodes:
            return JSONResponse({"success": False, "error": "No barcode found."}, status_code=404)
        barcode = barcodes[0]
        barcode_data = barcode.data.decode("utf-8")
        medicine = medicines.get(barcode_data)
        return {
            "success": True,
            "barcode": barcode_data,
            "medicine": medicine if medicine else None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict-pill/")
async def predict_pill(file: UploadFile = File(...)):
    # Placeholder logic for pill recognition
    # TODO: Replace with real MobileNetV2 or custom pill classifier
    try:
        contents = await file.read()
        # image = keras_image.load_img(io.BytesIO(contents), target_size=(224,224))
        # x = keras_image.img_to_array(image)
        # x = np.expand_dims(x, axis=0)
        # x = preprocess_input(x)
        # preds = pill_model.predict(x)
        # decoded = decode_predictions(preds, top=1)[0][0][1]
        # For now, return dummy result
        return {"success": True, "pill": "paracetamol (dummy)", "confidence": 0.95}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/nearby-clinics/")
async def nearby_clinics(loc: LocationRequest):
    user_loc = (loc.lat, loc.lon)
    clinics_with_distance = []
    for clinic in clinics:
        dist = geodesic(user_loc, (clinic["lat"], clinic["lon"])).km
        clinics_with_distance.append({**clinic, "distance_km": dist})
    clinics_sorted = sorted(clinics_with_distance, key=lambda x: x["distance_km"])
    # Dummy KMeans clustering for now
    X = np.array([[c["lat"], c["lon"]] for c in clinics])
    kmeans = KMeans(n_clusters=min(2, len(clinics)), random_state=0).fit(X)
    cluster_labels = kmeans.predict([[loc.lat, loc.lon]])
    recommended = [c for c, label in zip(clinics_sorted, kmeans.labels_) if label == cluster_labels[0]]
    return {"clinics": clinics_sorted, "recommended": recommended}

class DiagnosisRequest(BaseModel):
    symptoms: str

@app.post("/diagnose/")
async def diagnose(data: DiagnosisRequest):
    # Placeholder logic for diagnosis
    # TODO: Replace with real BioBERT/ClinicalBERT inference
    symptoms = data.symptoms.lower()
    if "fever" in symptoms and "cough" in symptoms:
        return {"diagnosis": "Possible flu or COVID-19 (dummy)", "confidence": 0.8}
    elif "headache" in symptoms:
        return {"diagnosis": "Possible migraine (dummy)", "confidence": 0.7}
    else:
        return {"diagnosis": "Consult a healthcare professional (dummy)", "confidence": 0.5}

@app.get("/")
def root():
    return {"message": "ML Backend is running"}

class EducationRequest(BaseModel):
    query: str

# Dummy articles
articles = [
    {"id": 1, "title": "Preventing Malaria", "content": "Use mosquito nets and repellents."},
    {"id": 2, "title": "Healthy Eating", "content": "Eat a balanced diet with fruits and vegetables."},
    {"id": 3, "title": "Managing Diabetes", "content": "Monitor blood sugar and stay active."},
]
article_embeddings = sbert_model.encode([a["content"] for a in articles], convert_to_tensor=True)

@app.post("/recommend-education/")
async def recommend_education(data: EducationRequest):
    query_embedding = sbert_model.encode(data.query, convert_to_tensor=True)
    cos_scores = util.pytorch_cos_sim(query_embedding, article_embeddings)[0]
    top_idx = int(torch.argmax(cos_scores))
    rec_article = articles[top_idx]
    return {"recommended": rec_article, "score": float(cos_scores[top_idx])}
