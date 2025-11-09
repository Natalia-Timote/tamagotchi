import './reset.css';
import './App.css';
import Button from './src/components/Button/index.tsx';
import StatusBar from './src/components/StatusBar/index.tsx';
import { useEffect, useState } from 'react';
import type IPetStatus from "./src/interfaces/IPetStatus.tsx";
import type IPetLevel from './src/interfaces/IPetLevel.tsx';
import UpdatePetLevel from './src/components/UpdatePetLevel/index.tsx';
import UpdatePetCareerLevel from './src/components/UpdatePetCareerLevel/index.tsx';
import { FaCode } from "react-icons/fa";
import { SiGithub, SiLinkedin } from "react-icons/si";
import Modal from './src/components/Modal/index.tsx';

function App() {
  const initialPet = {
    name: "Marvel",
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
  const [duckImage, setDuckImage] = useState("/duck-images/duck-very-happy.png");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          clearInterval(interval);
          setIsStudying(false);
          setDuckImage("/duck-images/duck-happy.png")
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
          setDuckImage("/duck-images/duck-very-happy.png")
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
    <body>
      <main>
        <h1>StudyGotchi</h1>
        <section className='pet-infos'>
          <img className='duck' src={duckImage} alt="Patinho" />
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
              setDuckImage("/duck-images/duck-studying.png")
            }
          }}>
            Estudar
          </Button>
          <Button control={() => {
            setIsOnPause(prev => !prev)
            if (isOnPause === false) {
              setDuckImage("/duck-images/duck-rest.png")
            } else {
              setDuckImage("/duck-images/duck-studying.png")
            }
          }}>
            Descansar
          </Button>
          <Button control={() => {
            if (petStatus.happiness < 100 && isStudying === false) {
              setIsHavingFun(false);
              setDuckImage("/duck-images/duck-fun.png")
            }
          }}>
            Diversão
          </Button>
        </section>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <img className='modal-image' src="/level-up.jpg" alt="Console com a mensagem de level up. Em volta há confetes em comemoração." />
          <h2>Parabéns!</h2>
          <p>Você subiu para o nível {petLevel.level}!</p>
          <p>Você é um {petLevel.careerLevel}.</p>
        </Modal>
      </main >
      <footer>
        <p>Desenvolvido por Natalia Mirian Timote</p>
        <p className="footer-infos">Siga minha jornada, conheça mais sobre minha trajetória no LinkedIn ou confira meus projetos no GitHub!</p>
        <div>
          <a href="https://www.linkedin.com/in/nataliamiriantimote" target='_blank'><SiLinkedin /></a>
          <a href="https://www.github.com/Natalia-Timote" target='_blank'><SiGithub /></a>
        </div>
        <p className="footer-infos">Quer ver como tudo isso foi feito? Acesse o código completo deste projeto no GitHub!</p>
        <a href="https://github.com/Natalia-Timote/tamagotchi" target='_blank'><FaCode /></a>
      </footer>
    </body>
  )
}

export default App
