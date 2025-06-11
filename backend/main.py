from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class NoteRequest(BaseModel):
    note: str

class MockResponse(BaseModel):
    nodes: list
    edges: list

@app.post('/analyze', response_model=MockResponse)
async def analyze(req: NoteRequest):
    return MockResponse(
        nodes=[
            {"id": "d1", "type": "diagnosis", "label": "Hypertension"},
            {"id": "d2", "type": "diagnosis", "label": "Diabetes"},
            {"id": "a1", "type": "action", "label": "Order labs"},
        ],
        edges=[
            {"id": "e1", "source": "d1", "target": "a1"},
            {"id": "e2", "source": "d2", "target": "a1"},
        ],
    )
