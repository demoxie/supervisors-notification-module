import {Route, Routes} from "react-router-dom";
import NotificationForm from "../component/NotificationForm.tsx";

export const AppRoutes = () => {
    return (<Routes>
        <Route path="/" element={<NotificationForm/>}/>
    </Routes>)
}
