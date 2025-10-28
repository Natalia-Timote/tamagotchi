import './reset.css'
import './App.css'
import { restPet, happyPet } from './src/components/Controls/index.tsx'
import Button from './src/components/Button/index.tsx'
import StatusBar from './src/components/StatusBar/index.tsx'
import { useEffect, useState } from 'react'
import type IPetStatus from "./src/interfaces/IPetStatus.tsx";
import UpdatePetStatus from './src/components/UpdatePetStatus/index.tsx'
import type IPetLevel from './src/interfaces/IPetLevel.tsx'
import UpdatePetLevel from './src/components/UpdatePetLevel/index.tsx'
import UpdatePetCareerLevel from './src/components/UpdatePetCareerLevel/index.tsx'

function App() {
  const initialPet = {
    name: "Marvel",
    study: 0,
    rest: 60,
    happiness: 70
  }

  const initialLevel = {
    careerLevel: "Estagiário",
    level: 1
  }

  const [petLevel, setPetLevel] = useState<IPetLevel>(initialLevel);
  const [petStatus, setPetStatus] = useState<IPetStatus>(initialPet);
  const [isStudying, setIsStudying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPetStatus(UpdatePetStatus);
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (petStatus.study === 100) {
      setPetLevel(prevPetLevel => UpdatePetLevel(prevPetLevel));
    }
  }, [petStatus.study])

  useEffect(() => {
    setPetLevel(prevPetLevel => UpdatePetCareerLevel(prevPetLevel));
  }, [petLevel.level])

  useEffect(() => {
    if (isStudying) {
      const startTime = Date.now();
      const initialStudy = petStatus.study;
      const totalDuration = 3600 * 1000;

      const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / totalDuration);
        const newStudy = initialStudy + progress * (100 - initialStudy);

        setPetStatus(prevPetStatus => ({
          ...prevPetStatus,
          study: newStudy < 100 ? newStudy : 0
        }))

        if (progress >= 1) {
          clearInterval(interval);
          setIsStudying(false);
        }

      }, 1000)
      return () => clearInterval(interval);
    }
  }, [isStudying])

  return (
    <main>
      <img className='duck' src="/public/duck.png" alt="Patinho" />
      <section className='pet-infos'>
        <h1>{petStatus.name}</h1>
        <h2>{petLevel.careerLevel} - {petLevel.level}</h2>
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
          <p>Felicidade:</p>
          <StatusBar statusVisual={{ width: `${petStatus.happiness}%` }} />
        </div>
      </section>

      <section className="buttons-controls">
        <Button control={() => setIsStudying(true)}>
          Estudar
        </Button>
        <Button control={() => setPetStatus(restPet)}>
          Descansar
        </Button>
        <Button control={() => setPetStatus(happyPet)}>
          Divertir
        </Button>
      </section>
    </main>
  )
}

export default App
