import { createContext, useContext, useState, type ReactNode } from "react";
import type IStudygotchiContext from "../interfaces/IStudygotchiContext";


const StudygotchiContext = createContext<IStudygotchiContext | null>(null);

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
    const context = useContext(StudygotchiContext);

    if(!context) {
        throw new Error("useStudygotchi deve ser usado dentro de StudygotchiProvider")
    } else{
        return context;
    }
}
