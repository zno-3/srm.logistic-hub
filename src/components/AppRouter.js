
import {Routes, Route} from 'react-router-dom';
import { authRoutes } from "../routes";

const AppRouter = () => {
    return(
        <Routes>
            {authRoutes.map( ({path, element}) =>
                <Route key={path} path={path} element={element}/>
            )}
        </Routes>
    );
};
export default AppRouter;