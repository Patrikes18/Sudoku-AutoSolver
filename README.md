# Sudoku Autosolver

A web application for entering and solving Sudoku boards. The project has a React and TypeScript frontend and a FastAPI backend with support for rectangular Sudoku boxes, such as the standard 3 x 3 layout and 2 x 3 layouts.

## Features

- Interactive Sudoku grid with configurable box width and height.
- Validation of board dimensions, value ranges, and duplicate values.
- Backtracking solver that selects the empty cell with the fewest candidates first.
- Slovak and English interface and API error messages.
- Docker Compose setup for running the frontend and backend together.

## Requirements

For Docker-based use:

- Docker Desktop with Docker Compose

For local development:

- Python 3.13 or newer
- Node.js and npm

## Configuration

Copy the example environment file when setting up a new checkout:

```bash
copy .env.example .env
```

The available variables are:

| Variable | Default | Description |
| --- | --- | --- |
| `REACT_APP_API_URL` | `http://localhost:8000` | Backend URL used by frontend requests. |
| `BACKEND_PORT` | `8000` | Host port mapped to the backend container. |
| `FRONTEND_PORT` | `3000` | Host port mapped to the frontend container. |

## Run With Docker Compose

From the repository root:

```bash
docker compose up --build
```

Then open [http://localhost:3000](http://localhost:3000).

The services are:

- Frontend: Nginx serving the production React build.
- Backend: Uvicorn serving the FastAPI application.

### Solve a Board

```http
POST /solve
Content-Type: application/json
```

Request:

```json
{
  "lang": "en",
  "widthCell": 3,
  "heightCell": 3,
  "matrix": [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ]
}
```

`0` represents an empty cell. The board side length is calculated as `widthCell * heightCell`, so the matrix must contain exactly that many rows and columns. The API rejects invalid values, duplicate values in rows, columns, or boxes, and boards that have no solution.

Successful response:

```json
{
  "matrix": [
    [5, 3, 4, 6, 7, 8, 9, 1, 2]
  ]
}
```

The response example is abbreviated; the actual response contains the complete solved matrix.