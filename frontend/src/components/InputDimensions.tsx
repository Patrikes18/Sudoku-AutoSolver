type InputDimensionsProps = {
    widthCell: number;
    heightCell: number;
    onWidthChange: (value: number) => void;
    onHeightChange: (value: number) => void;
};


export default function InputDimensions({
    widthCell,
    heightCell,
    onWidthChange,
    onHeightChange,
}: InputDimensionsProps){
    return (
        <div className="flex justify-center">
            <div className="flex w-1/2 grid grid-cols-2 gap-y-3 p-10 ">
                <label>
                    Výška bunky: 
                </label>
                <input
                    type="number"
                    value={heightCell}
                    onChange={(e) => onHeightChange(Number(e.target.value))}
                    className="border border-gray-500 rounded px-2 py-1 text-black"
                    min={0}
                />
                <label>
                    Šírka bunky: 
                </label>
                <input
                    type="number"
                    value={widthCell}
                    onChange={(e) => onWidthChange(Number(e.target.value))}
                    className="border border-gray-500 rounded px-2 py-1 text-black"
                    min={0}
                />
            </div>
        </div>
    );
}