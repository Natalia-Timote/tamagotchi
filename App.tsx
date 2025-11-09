import './reset.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
// import Home from './src/pages/Home';
import Layout from './src/pages/Layout';
import Game from './src/pages/game';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* <Route index element={<Home />} /> */}
          <Route index element={<Game />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
