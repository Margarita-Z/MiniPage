import { Route, Navigate } from "react-router-dom";
import {connect} from "react-redux";

const BasicRoute = ({children, authenticates, ...rest}) => {
    return (
        <Route
        {...rest}
        render={
            ({location}) => !authenticates ? (children) : (
                <Navigate
                to={{
                    pathname: '/dashboard',
                    state: {from: location}
                }} 
                />
            )
        }
        />
    )
}

const mapStateToProps = ({session}) => ({
    authenticates: session.authenticates
})
export default connect({mapStateToProps})(BasicRoute);