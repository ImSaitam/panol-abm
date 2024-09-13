import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Inicio from './components/Inicio';
import Vista from './components/views';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/ver' element={<Vista/>} />
            </Routes>
        </BrowserRouter>
    );
}