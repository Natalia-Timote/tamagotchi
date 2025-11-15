import './reset.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './src/pages/Home/Home';
import Layout from './src/pages/Layout/Layout';
import Game from './src/pages/Game/Game';
import StudygotchiProvider from './src/Context/StudygotchiContext';


function App() {
  return (
    <StudygotchiProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/studygotchi' element={<Game />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StudygotchiProvider>
  )
}

export default App
