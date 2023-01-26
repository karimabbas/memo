import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './styles'
import images from "../../images/lol.png";
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import jwt_decode from "jwt-decode";

const Navbar = () => {

    const classes = styles();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('UserProfile')));
    const navigate = useNavigate();
    const location = useLocation();

    const Logout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
        setUser(null);
    }

    useEffect(() => {
            setUser(JSON.parse(localStorage.getItem('UserProfile')));   
    }, [location])


    // useEffect(() => {
    //     const token = user?.token;

    //     if (token) {
    //         const decodedToken = jwt_decode(token);

    //         if (decodedToken.exp * 1000 < new Date().getTime()) Logout();
    //     }

    //     setUser(JSON.parse(localStorage.getItem('UserProfile')));
    // }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={images} alt="icon" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} onClick={Logout} color="secondary">Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>

                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar