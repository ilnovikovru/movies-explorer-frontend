import { Navigate } from "react-router"

const ProtectedRoute = ({ component: Component, ...props }) => {
    return props.loggedIn
    ? <Component {...props} / >
    : <Navigate to='/' replace />
};

export default ProtectedRoute;