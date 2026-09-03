import { useEffect} from "react";

interface SudokuProps {
    widthCell: number;
    heightCell: number;
    matrix: number[][];
    setMatrix: React.Dispatch<React.SetStateAction<number[][]>>;
    changedCells: Set<string>;
    setChangedCells: React.Dispatch<React.SetStateAction<Set<string>>>;
};

export default function Sudoku({
    widthCell,
    heightCell,
    matrix,
    setMatrix,
    changedCells,
    setChangedCells,
}: SudokuProps) {
    const width = widthCell * heightCell
    const height = heightCell * widthCell

    useEffect(() => {
        setMatrix(prev =>
            Array.from({ length: height }, (_, row) =>
                Array.from(
                    { length: width },
                    (_, col) => prev[row]?.[col] ?? 0
                )
            )
        );
    }, [width, height, setMatrix]);

    const dimensions = widthCell * heightCell

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
                        type="number"
                        onFocus={(e) => {
                            if (value !== 0) {
                                e.currentTarget.select();
                            }
                        }}
                        onClick={(e) => {
                            if (value !== 0) {
                                e.currentTarget.select();
                            }
                        }}
                        onChange={(e) => {
                            const newMatrix = matrix.map(r => [...r]);

                            const val = e.target.value === "" ? 0 : Number(e.target.value);

                            if (!Number.isInteger(val) || val < 0 || val > dimensions) {
                                return;
                            }

                            newMatrix[rowIndex][colIndex] = val;

                            setMatrix(newMatrix);
                            setChangedCells(prev => {
                                const next = new Set(prev);
                                next.delete(`${rowIndex}-${colIndex}`);
                                return next;
                            });
                        }}
                        className={`
                        sudoku-cell
                        w-12 h-12
                        text-center text-xl
                        border
                        border-gray-400
                        focus:outline-none focus:bg-blue-100
                        ${changedCells.has(`${rowIndex}-${colIndex}`) ? "bg-green-200" : ""}

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
