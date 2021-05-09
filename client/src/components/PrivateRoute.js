
import React from "react"
import {
    Redirect,
    Route
  } from "react-router-dom"

function PrivateRoute({component, authed, ...rest}) {
    const MyComponent = component
    return (
        <Route
        {...rest}
        render={(props) => authed === true
            ? <MyComponent {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    )
}

export default PrivateRoute