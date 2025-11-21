import '../../../reset.css';
import '../../../App.css';
import './Game.css';
import Button from '../../components/Button/index.tsx';
import StatusBar from '../../components/StatusBar/index.tsx';
import { useEffect, useState } from 'react';
import type IPetStatus from "../../interfaces/IPetStatus.tsx";
import type IPetLevel from '../../interfaces/IPetLevel.tsx';
import UpdatePetLevel from '../../components/UpdatePetLevel/index.tsx';
import UpdatePetCareerLevel from '../../components/UpdatePetCareerLevel/index.tsx';
import Modal from '../../components/Modal/index.tsx';
import { useStudygotchi } from '../../Context/StudygotchiContext.tsx';
import CalendarStudy from '../../components/CalendarStudy/index.tsx';

export default function Game() {
    const { characterName, characterSelect } = useStudygotchi();

    const initialPet = {
        name: characterName,
        study: 0,
        rest: 0,
        happiness: 100
    }

    const initialLevel = {
        careerLevel: "Estagiário",
        level: 1
    }

    const [petLevel, setPetLevel] = useState<IPetLevel>(initialLevel);
    const [petStatus, setPetStatus] = useState<IPetStatus>(initialPet);
    const [isStudying, setIsStudying] = useState(false);
    const [isOnPause, setIsOnPause] = useState(false);
    const [isHavingFun, setIsHavingFun] = useState(true);
    const [image, setImage] = useState(`/${characterSelect}-images/${characterSelect}-very-happy.png`);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [studyingDays, setStudyingDays] = useState<string[]>([]);

    useEffect(() => {
        if (petStatus.study === 100) {
            setPetLevel(prevPetLevel => UpdatePetLevel(prevPetLevel));
            setIsModalOpen(true);
        }
    }, [petStatus.study])

    useEffect(() => {
        setPetLevel(prevPetLevel => UpdatePetCareerLevel(prevPetLevel));
    }, [petLevel.level])

    useEffect(() => {
        if (isStudying) {
            const startTime = Date.now();
            const initialStudy = petStatus.study;
            const totalDuration = 10 * 1000;

            const interval = setInterval(() => {
                const elapsedTime = Date.now() - startTime;
                const progress = Math.min(elapsedTime / totalDuration);
                const newStudy = initialStudy + progress * (100 - initialStudy);

                setPetStatus(prevPetStatus => ({
                    ...prevPetStatus,
                    study: Math.min(newStudy, 100),
                    happiness: prevPetStatus.happiness > 0 ? prevPetStatus.happiness - 10 : 0
                }))

                if (progress >= 1) {
                    const date = new Date();
                    date.setHours(0, 0, 0, 0);
                    const studyingDate = date.toISOString().split('T')[0];
                    if (studyingDays.includes(studyingDate)) {
                        return;
                    } else {
                        setStudyingDays(prev => [...prev, studyingDate]);
                    }

                    clearInterval(interval);
                    setIsStudying(false);
                    setImage(`/${characterSelect}-images/${characterSelect}-happy.png`)
                }

            }, 1000)
            return () => clearInterval(interval);
        }
    }, [isStudying])

    useEffect(() => {
        if (isHavingFun === false) {
            const startTime = Date.now();
            const initialTime = petStatus.happiness;
            const totalDuration = 5 * 1000;

            const interval = setInterval(() => {
                const elapsedTime = Date.now() - startTime;
                const progress = Math.min(elapsedTime / totalDuration);
                const happyTime = initialTime + progress * (100 - initialTime);

                setPetStatus(prevPetStatus => ({
                    ...prevPetStatus,
                    happiness: Math.min(happyTime, 100)
                }))

                if (progress >= 1) {
                    clearInterval(interval);
                    setIsHavingFun(true);
                    setImage(`/${characterSelect}-images/${characterSelect}-very-happy.png`)
                }
            }, 1000)
            return () => clearInterval(interval);
        }
    }, [isHavingFun])

    useEffect(() => {
        setIsStudying(prev => !prev)

        if (isOnPause === true) {
            setPetStatus(prevPetStatus => ({
                ...prevPetStatus,
                rest: 100
            }))
        } else {
            setPetStatus(prevPetStatus => ({
                ...prevPetStatus,
                rest: 0
            }))
        }
    }, [isOnPause])

    return (
        <section className='game'>
            <h1>StudyGotchi</h1>
            <section className='pet-infos'>
                <img className='pet-image' src={image} alt={characterSelect} />
                <h2>{petStatus.name}</h2>
                <h3>{petLevel.careerLevel} - {petLevel.level}</h3>
            </section>
            <section className="pet-status">
                <div className="pet-status-item">
                    <p>Estudo diário:</p>
                    <StatusBar statusVisual={{ width: `${petStatus.study}%` }} />
                </div>
                <div className="pet-status-item">
                    <p>Descanso:</p>
                    <StatusBar statusVisual={{ width: `${petStatus.rest}%` }} />
                </div>
                <div className="pet-status-item">
                    <p>Diversão:</p>
                    <StatusBar statusVisual={{ width: `${petStatus.happiness}%` }} />
                </div>
            </section>

            <section className="buttons-controls">
                <Button control={() => {
                    if (petStatus.happiness >= 100) {
                        setPetStatus(prevPetStatus => ({ ...prevPetStatus, study: 0 }))
                        setIsStudying(true)
                        setImage(`/${characterSelect}-images/${characterSelect}-studying.png`)
                    }
                }}>
                    Estudar
                </Button>
                <Button control={() => {
                    setIsOnPause(prev => !prev)
                    if (isOnPause === false) {
                        setImage(`/${characterSelect}-images/${characterSelect}-rest.png`)
                    } else {
                        setImage(`/${characterSelect}-images/${characterSelect}-studying.png`)
                    }
                }}>
                    Descansar
                </Button>
                <Button control={() => {
                    if (petStatus.happiness < 100 && isStudying === false) {
                        setIsHavingFun(false);
                        setImage(`/${characterSelect}-images/${characterSelect}-fun.png`)
                    }
                }}>
                    Diversão
                </Button>
            </section>
            <section className='calendar-container'>
                <CalendarStudy studyingDays={studyingDays}></CalendarStudy>
            </section>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <img className='modal-image' src="/level-up.jpg" alt="Console com a mensagem de level up. Em volta há confetes em comemoração." />
                <h2>Parabéns!</h2>
                <p>Você subiu para o nível {petLevel.level}!</p>
                <p>Carreira: {petLevel.careerLevel}</p>
            </Modal>
        </section>
    )
}
