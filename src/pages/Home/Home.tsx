import "./Home.css";
import Button from "../../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Home() {
    const navigate = useNavigate();
    const characters = ["duck", "capybara", "dog", "cat"];
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    const image = (character: string, hoverIndex: boolean) => {
        return `./${character}-images/${character}-${hoverIndex ? "very-happy" : "happy"}.png`;
    }

    return (
        <section className="home">
            <h1>StudyGotchi</h1>
            <label className="character-name" htmlFor="name">
                <p>Nome do personagem:</p>
                <input type="text" name="Nome do personagem" id="name" />
            </label>
            <div className="character-select">
                <p>Escolha o seu personagem:</p>
                <div className="characters">
                    {characters.map((character: string, index: number) => (
                        <Button
                            key={character}
                            control={() => { navigate("/studygotchi") }}
                            hover={() => { setHoverIndex(index) }}
                            hoverOff={() => { setHoverIndex(null) }}
                        >
                            <img src={image(character, hoverIndex === index)} alt={character} />
                        </Button>
                    ))}
                </div>
            </div>
        </section>
    )
}