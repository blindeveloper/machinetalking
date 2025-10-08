from fastapi import FastAPI
from mangum import Mangum
from pydantic import BaseModel

app = FastAPI()

class PredictRequest(BaseModel):
    input: str

@app.post("/lang_chain/predict")
def predict(request: PredictRequest):
    return {"output": f"You sent: {request.input}"}

handler = Mangum(app)