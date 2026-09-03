import { useEffect, useState } from "react";
import Form from "./components/Form";
import { Language, translations } from "./i18n";

function App() {
    const [language, setLanguage] = useState<Language>("sk");
    const text = translations[language];

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    return (
        <div className="flex min-h-screen flex-col">
            <div
                className="flex justify-center content-center min-h-screen bg-cover bg-center"
                style={{ backgroundImage: "url('/background.jpg')" }}
            >
                <div className='flex flex-col bg-white mx-40 px-5 py-6 my-5'>
                    <header className='flex items-center justify-between gap-8 text-black'>
                        <h1 className="text-2xl font-bold">{text.title}</h1>
                        <div className="flex items-center gap-2" aria-label={text.language}>
                            {(["sk", "en"] as Language[]).map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => setLanguage(option)}
                                    aria-pressed={language === option}
                                    className={`rounded px-2 py-1 text-sm font-semibold ${
                                        language === option
                                            ? "bg-sky-500 text-white"
                                            : "bg-gray-200 text-gray-700"
                                    }`}
                                >
                                    {option.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </header>
                    <div className="flex flex-1">
                        <Form language={language} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
