from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from solver import solve
from sudokuMatrix import SudokuRequest


app = FastAPI(title="Sudoku Autosolver API")

# Allows the Create React App development server to call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/solve")
def receive_sudoku(payload: SudokuRequest) -> dict[str, object]:
    """Receive and validate the two cell dimensions and Sudoku matrix."""
    sudoku = solve(payload.matrix, payload.widthCell, payload.heightCell)

    if sudoku is None:
        detail = (
            "Riešenie sa nenašlo"
            if payload.lang == "sk"
            else "Solution not found"
        )
        raise HTTPException(status_code=422, detail=detail)

    return {"matrix": sudoku}
