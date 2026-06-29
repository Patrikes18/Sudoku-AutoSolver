import Sudoku from "./Sudoku";
import InputDimensions from './InputDimensions';
import { useState } from "react";

export default function Form() {
    const handleSubmit = (e: any) => {

    }

    const [widthCell, setWidthCell] = useState(3);
    const [heightCell, setHeightCell] = useState(3);
    return (
        <form onSubmit={handleSubmit}>
            <InputDimensions widthCell={widthCell} heightCell={heightCell} onWidthChange={setWidthCell} onHeightChange={setHeightCell}/>
            <div className='flex justify-center'>
                <Sudoku widthCell={widthCell} heightCell={heightCell}/>
            </div>
            <button type="submit">Odoslať</button>
        </form>
    );
}