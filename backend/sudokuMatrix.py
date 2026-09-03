from typing import Annotated, Literal

from pydantic import BaseModel, Field, model_validator


Cell = Annotated[int, Field(ge=0)]

MESSAGES = {
    "en": {
        "rows": "Sudoku must contain exactly {side} rows",
        "row_values": "Sudoku row {index} must contain exactly {side} values",
        "row_duplicates": "Sudoku row {index} contains duplicates",
        "value_range": "Sudoku values must be between 0 and {side}",
        "column_duplicates": "Sudoku column {index} contains duplicates",
        "box_duplicates": "Sudoku box ({row}, {column}) contains duplicates",
    },
    "sk": {
        "rows": "Sudoku musí obsahovať presne {side} riadkov",
        "row_values": "Riadok sudoku {index} musí obsahovať presne {side} hodnôt",
        "row_duplicates": "Riadok sudoku {index} obsahuje duplicitné hodnoty",
        "value_range": "Hodnoty sudoku musia byť od 0 do {side}",
        "column_duplicates": "Stĺpec sudoku {index} obsahuje duplicitné hodnoty",
        "box_duplicates": "Blok sudoku ({row}, {column}) obsahuje duplicitné hodnoty",
    },
}

class SudokuRequest(BaseModel):
    """Payload sent by the Sudoku form."""

    lang: Literal["sk", "en"] = "en"
    widthCell: int = Field(gt=0)
    heightCell: int = Field(gt=0)
    matrix: list[list[Cell]]

    @model_validator(mode="after")
    def validate_matrix(self) -> "SudokuRequest":
        side = self.widthCell * self.heightCell
        messages = MESSAGES[self.lang]

        def fail(key: str, **values: int) -> None:
            message = messages[key].format(**values)
            raise ValueError(message)

        if len(self.matrix) != side:
            fail("rows", side=side)

        for row_index, row in enumerate(self.matrix):
            if len(row) != side:
                fail("row_values", index=row_index, side=side)

            values = [value for value in row if value != 0]
            if len(values) != len(set(values)):
                fail("row_duplicates", index=row_index+1)

            for value in row:
                if value > side:
                    fail("value_range", side=side)

        for col_index in range(side):
            values = [
                self.matrix[row_index][col_index]
                for row_index in range(side)
                if self.matrix[row_index][col_index] != 0
            ]
            if len(values) != len(set(values)):
                fail("column_duplicates", index=col_index+1)

        for box_row in range(0, side, self.heightCell):
            for box_col in range(0, side, self.widthCell):
                values = [
                    self.matrix[row_index][col_index]
                    for row_index in range(box_row, box_row + self.heightCell)
                    for col_index in range(box_col, box_col + self.widthCell)
                    if self.matrix[row_index][col_index] != 0
                ]
                if len(values) != len(set(values)):
                    fail("box_duplicates", row=box_row, column=box_col)

        return self
