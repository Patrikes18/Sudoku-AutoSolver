import { Language, translations } from "../i18n";

type InputDimensionsProps = {
    widthCell: number;
    heightCell: number;
    onWidthChange: (value: number) => void;
    onHeightChange: (value: number) => void;
    language: Language;
};


export default function InputDimensions({
    widthCell,
    heightCell,
    onWidthChange,
    onHeightChange,
    language,
}: InputDimensionsProps){
    const text = translations[language];

    return (
        <div className="flex justify-center">
            <div className="flex grid grid-cols-2 gap-y-3 p-10 ">
                <label>
                    {text.cellHeight}
                </label>
                <input
                    type="number"
                    value={heightCell}
                    onChange={(e) => onHeightChange(Number(e.target.value))}
                    className="border border-gray-500 rounded px-2 py-1 text-black"
                    min={0}
                />
                <label>
                    {text.cellWidth}
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
