import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from '../components/LoginComponent/Login'
import HomePage from '../pages/HomePage/HomePage'


export const Routes = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path={'/'}>
                        <Login></Login>
                    </Route>
                    <Route path={'/home'}>
                        <HomePage></HomePage>
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    )
}
