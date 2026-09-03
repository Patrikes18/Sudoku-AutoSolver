import Sudoku from "./Sudoku";
import InputDimensions from './InputDimensions';
import { useState } from "react";
import { Language, translations } from "../i18n";

interface FormProps {
    language: Language;
}

export default function Form({ language }: FormProps) {
    const text = translations[language];
    const [matrix, setMatrix] = useState<number[][]>([]);
    const [changedCells, setChangedCells] = useState<Set<string>>(new Set());
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:8000/solve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    widthCell,
                    heightCell,
                    matrix,
                    lang: language,
                }),
            });

            const result: {
                matrix?: number[][];
                detail?: string | { msg: string }[];
            } =
                await response.json();

            if (!response.ok) {
                const messages = Array.isArray(result.detail)
                    ? result.detail
                        .map((item) => item.msg.replace(/^Value error,\s*/i, ""))
                        .join(" ")
                    : result.detail;
                throw new Error(
                    messages || `${text.requestFailed} (${response.status})`
                );
            }

            const solvedMatrix = result.matrix ?? [];
            const solvedChangedCells = new Set<string>();

            solvedMatrix.forEach((row, rowIndex) => {
                row.forEach((value, colIndex) => {
                    if (value !== matrix[rowIndex]?.[colIndex]) {
                        solvedChangedCells.add(`${rowIndex}-${colIndex}`);
                    }
                });
            });

            setMatrix(solvedMatrix);
            setChangedCells(solvedChangedCells);
        } catch (requestError) {
            setError(
                requestError instanceof Error
                    ? requestError.message
                    : text.unableToSolve
            );
        }
    }

    const [widthCell, setWidthCell] = useState(3);
    const [heightCell, setHeightCell] = useState(3);

    const handleReset = () => {
        const side = widthCell * heightCell;
        setMatrix(Array.from({ length: side }, () => Array(side).fill(0)));
        setChangedCells(new Set());
        setError("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
            <InputDimensions
                widthCell={widthCell}
                heightCell={heightCell}
                onWidthChange={setWidthCell}
                onHeightChange={setHeightCell}
                language={language}
            />
            <div className='flex justify-center'>
                <Sudoku
                    widthCell={widthCell}
                    heightCell={heightCell}
                    matrix={matrix}
                    setMatrix={setMatrix}
                    changedCells={changedCells}
                    setChangedCells={setChangedCells}
                />
            </div>
            {error && <p className="mt-4 text-center text-red-600">{error}</p>}
            <div className='mt-auto flex justify-center gap-x-8 pt-6 mb-5'>
                <button
                    type="button"
                    onClick={handleReset}
                    className="flex p-1 ml-3 bg-gray-300 border-4 border-black border-gray-400 rounded-md"
                >
                    {text.reset}
                </button>
                <button type="submit" className="flex p-1 bg-sky-400 border-4 border-black border-sky-300 rounded-md">{text.submit}</button>
            </div>
        </form>
    );
}
