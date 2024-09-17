import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Inicio from './components/Inicio';
import Vista from './components/views';
import 'bootstrap/dist/css/bootstrap.min.css';
import Perfil from './components/Perfil';
import ModificarHerramientas from './components/ModificarHerramientas';
import SubirHerramienta from './components/SubirHerramientas';
import Categorias from './components/Categorias';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/ver' element={<Vista/>} />
                <Route path='/perfil' element={<Perfil />} />
                <Route path='/modificar' element={<ModificarHerramientas />} />
                <Route path='/subir' element={<SubirHerramienta />} />
                <Route path='/categoria' element={<Categorias />} />
            </Routes>
        </BrowserRouter>
    );
}