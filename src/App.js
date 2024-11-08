import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Inicio from './ABM/components/Inicio';
import Vista from './ABM/components/views';
import 'bootstrap/dist/css/bootstrap.min.css';
import PerfilHerramienta from './ABM/components/PerfilHerramienta';
import ModificarHerramientas from './ABM/components/ModificarHerramientas';
import SubirHerramienta from './ABM/components/SubirHerramientas';
import Categorias from './ABM/components/Categorias';
import SubirConsumibles from './ABM/components/SubirConsumibles';
import PerfilConsumible from './ABM/components/PerfilConsumible';
import ModificarConsumible from './ABM/components/ModificarConsumible';
import PerfilHerramientaBaja from './ABM/components/PerfilHerrmientaBaja';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/abm/' element={<Inicio />} />
                <Route path='/abm/ver' element={<Vista/>} />
                <Route path='/abm/perfil_herramienta/:id' element={<PerfilHerramienta />} />
                <Route path='/abm/perfil_herramienta_baja/:id' element={<PerfilHerramientaBaja />} />
                <Route path='/abm/modificar_herramienta/:id' element={<ModificarHerramientas />} />
                <Route path='/abm/subir_herramientas' element={<SubirHerramienta />} />
                <Route path='/abm/gestion_categorias' element={<Categorias />} />
                <Route path='/abm/subir_consumibles' element={<SubirConsumibles />} />
                <Route path= '/abm/perfil_consumible/:id' element={<PerfilConsumible />} />
                <Route path= '/abm/modificar_consumible/:id' element={<ModificarConsumible/>}/>
            </Routes>
        </BrowserRouter>
    );
}