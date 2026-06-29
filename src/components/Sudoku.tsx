import { useEffect, useState} from "react";

type SudokuProps = {
    widthCell: number;
    heightCell: number;
};

export default function Sudoku({
    widthCell,
    heightCell,
}: SudokuProps) {
    const width = widthCell * 3
    const height = heightCell * 3

    const [matrix, setMatrix] = useState<number[][]>([]);
    useEffect(() => {
        setMatrix(prev =>
            Array.from({ length: height }, (_, row) =>
                Array.from({ length: width }, (_, col) =>
                    prev[row]?.[col] ?? 0
                )
            )
        );
    }, [width, height]);

    const dimensions = (widthCell * heightCell)
    const digits = (""+dimensions).length

    return (
        <div
            className="grid gap-0 border-2 border-black w-fit"
            style={{
                gridTemplateColumns: `repeat(${width}, 3rem)`,
                gridTemplateRows: `repeat(${height}, 3rem)`,
            }}
        >
            {matrix.map((row, rowIndex) => 
                row.map((value, colIndex) => (
                    <input
                        key={`${rowIndex}-${colIndex}`}
                        value={value === 0 ? "" : value}
                        type="text"
                        maxLength={digits}
                        onChange={(e) => {
                            const newMatrix = matrix.map(r => [...r]);

                            const val = Number(e.target.value);
                            newMatrix[rowIndex][colIndex] = Number.isNaN(val) ? 0 : val;

                            setMatrix(newMatrix);
                        }}
                        className={`
                        w-12 h-12
                        text-center text-xl
                        border
                        border-gray-400
                        focus:outline-none focus:bg-blue-100

                        ${colIndex % widthCell === 0 ? "border-l-2 border-l-black" : ""}
                        ${rowIndex % heightCell === 0 ? "border-t-2 border-t-black" : ""}
                        ${colIndex === width - 1 ? "border-r-2 border-r-black" : ""}
                        ${rowIndex === height - 1 ? "border-b-2 border-b-black" : ""}
                        `}
                    />
                ))
            )}
        </div>
    );
}