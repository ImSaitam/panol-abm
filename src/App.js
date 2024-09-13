import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Inicio from './components/Inicio';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Inicio />} />
            </Routes>
        </BrowserRouter>
    );
}