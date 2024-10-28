import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Inicio from './components/Inicio';
import Vista from './components/views';
import 'bootstrap/dist/css/bootstrap.min.css';
import PerfilHerramienta from './components/PerfilHerramienta';
import ModificarHerramientas from './components/ModificarHerramientas';
import SubirHerramienta from './components/SubirHerramientas';
import Categorias from './components/Categorias';
import SubirConsumibles from './components/SubirConsumibles';
import PerfilConsumible from './components/PerfilConsumible';
import ModificarConsumible from './components/ModificarConsumible';
import PerfilHerramientaBaja from './components/PerfilHerrmientaBaja';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/ver' element={<Vista/>} />
                <Route path='/perfil_herramienta/:id' element={<PerfilHerramienta />} />
                <Route path='/perfil_herramienta_baja/:id' element={<PerfilHerramientaBaja />} />
                <Route path='/modificar_herramienta/:id' element={<ModificarHerramientas />} />
                <Route path='/subir_herramientas' element={<SubirHerramienta />} />
                <Route path='/gestion_categorias' element={<Categorias />} />
                <Route path='/subir_consumibles' element={<SubirConsumibles />} />
                <Route path= '/perfil_consumible/:id' element={<PerfilConsumible />} />
                <Route path= '/modificar_consumible/:id' element={<ModificarConsumible/>}/>
            </Routes>
        </BrowserRouter>
    );
}