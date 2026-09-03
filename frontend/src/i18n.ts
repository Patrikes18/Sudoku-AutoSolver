export type Language = "sk" | "en";

export const translations = {
    sk: {
        title: "Automatický riešiteľ sudoku",
        language: "Jazyk",
        cellHeight: "Výška bunky:",
        cellWidth: "Šírka bunky:",
        reset: "Vynulovať sudoku",
        submit: "Odoslať",
        requestFailed: "Požiadavku sa nepodarilo spracovať",
        unableToSolve: "Sudoku sa nepodarilo vyriešiť",
    },
    en: {
        title: "Sudoku Autosolver",
        language: "Language",
        cellHeight: "Cell height:",
        cellWidth: "Cell width:",
        reset: "Reset Sudoku",
        submit: "Send",
        requestFailed: "The request could not be processed",
        unableToSolve: "Unable to solve Sudoku",
    },
} as const;
