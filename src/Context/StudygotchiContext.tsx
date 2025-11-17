import { createContext, useContext, useState, type ReactNode } from "react";

interface StudygotchiContextType {
    characterName: string,
    setCharacterName: React.Dispatch<React.SetStateAction<string>>,
    characterSelect: string,
    setCharacterSelect: React.Dispatch<React.SetStateAction<string>>
}

const StudygotchiContext = createContext<StudygotchiContextType | null>(null);

export default function StudygotchiProvider({ children }: { children: ReactNode }) {
    const [characterName, setCharacterName] = useState("");
    const [characterSelect, setCharacterSelect] = useState("");

    return (
        <StudygotchiContext.Provider value={{ characterName, setCharacterName, characterSelect, setCharacterSelect }}>
            {children}
        </StudygotchiContext.Provider>
    )
}

export function useStudygotchi() {
    return useContext(StudygotchiContext);
}
