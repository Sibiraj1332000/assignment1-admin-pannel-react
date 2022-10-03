import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AddBook from '../components/AddBook/AddBook'
import PermanentDrawerLeft from '../components/Drawer/Drawer'
import Login from '../components/LoginComponent/Login'
import TakenBooks from '../components/TakenBooks/TakenBooks'
import { UploadFile } from '../components/UploadFile/UploadFile'
import Users from '../components/Users/Users'
import ReturnedBooks from '../ReturnedBooks/ReturnedBooks'


export const Routes = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path={'/'}>
                        <Login></Login>
                    </Route>
                    <Route path={'/admin'}>
                        <div style={{ display: 'flux' }}>
                            <div >
                                <PermanentDrawerLeft></PermanentDrawerLeft>
                            </div>
                            <div style={{ marginLeft: '240px' }}>
                                <Route exact path={'/admin/users'}>
                                    <Users></Users>
                                </Route>
                                <Route exact path={'/admin/users/taken_books'}>
                                    <TakenBooks></TakenBooks>
                                </Route>
                                <Route exact path={'/admin/users/reurned_books'}>
                                    <ReturnedBooks></ReturnedBooks>
                                </Route>
                                <Route exact path={'/admin/add-book'}>
                                    <AddBook></AddBook>
                                    {/* <UploadFile></UploadFile> */}
                                </Route>

                            </div>
                        </div>
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    )
}
