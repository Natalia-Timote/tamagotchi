import "./Home.css";
import Button from "../../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useStudygotchi } from "../../Context/StudygotchiContext";
import Modal from "../../components/Modal";

export default function Home() {
    const { characterName, setCharacterName, characterSelect, setCharacterSelect } = useStudygotchi();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const characters = ["duck", "capybara", "dog", "cat"];
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    const image = (character: string, hoverIndex: boolean) => {
        return `./${character}-images/${character}-${hoverIndex ? "very-happy" : "happy"}.png`;
    }

    return (
        <section className="home">
            <h1>StudyGotchi</h1>
            <Button
                control={() => {
                    setIsModalOpen(true);
                }}
            >Como jogar
            </Button>
            <form onSubmit={event => event.preventDefault()}>
                <label className="character-name" htmlFor="name">
                    <p>Nome do personagem:</p>
                    <input
                        required
                        type="text"
                        name="Nome do personagem"
                        id="name"
                        onChange={event => setCharacterName(event.target.value)}
                    />
                </label>
                <div className="character-select">
                    <p>Escolha o seu personagem:</p>
                    <div className="characters">
                        {characters.map((character: string, index: number) => (
                            <Button
                                key={character}
                                control={() => {
                                    if (!characterName.trim()) {
                                        setError("Por favor, preencha o nome do personagem!")
                                        return
                                    } else {
                                        setError("");
                                        setCharacterSelect(character);
                                        navigate("/studygotchi");
                                    }
                                }}
                                hover={() => { setHoverIndex(index) }}
                                hoverOff={() => { setHoverIndex(null) }}
                            >
                                <img src={image(character, hoverIndex === index)} alt={character} />
                            </Button>
                        ))}
                    </div>
                </div>
            </form>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Bem-vindo ao StudyGotchi, seu companheiro de estudos!</h2> 
                <p>Antes de começar a estudar, o StudyGotchi te convida para um momento especial de lazer de 15 minutos. Esse tempo serve para deixar você e seu personagem relaxados e prontos para aprender, trazendo leveza para a sua rotina.</p> 
                <p>Com a energia renovada, você poderá iniciar uma sessão de estudo de 1 hora. O tempo será monitorado e seu progresso ficará registrado, tornando cada avanço motivo de orgulho tanto para você quanto para o seu StudyGotchi.</p> 
                <p>Lembre-se: você pode pausar quando quiser. Sempre que voltar dos momentos de lazer, seu personagem estará feliz em acompanhar você em mais uma jornada de aprendizado!</p> 
                <p>Estude com dedicação, curta suas pausas e cuide do seu StudyGotchi. Ele está sempre aqui torcendo pelo seu sucesso!</p>
             </Modal>
        </section>
    )
}