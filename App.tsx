import './reset.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './src/pages/Home/Home';
import Layout from './src/pages/Layout/Layout';
import Game from './src/pages/Game/Game';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/studygotchi' element={<Game />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
