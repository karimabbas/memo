import React, { useEffect, useState } from 'react'
import { Avatar, Button, Container, Grid, Icon, Paper, Typography } from '@mui/material'
import styles from "./styles";
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
// import { GoogleLogin } from '@react-oauth/google';
import { gapi } from "gapi-script";
import { createBrowserHistory } from '@remix-run/router';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

const Auth = () => {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: "681518767098-ho2t7a8edltss2se9242o0nf5vmijmvd.apps.googleusercontent.com",
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

  const classes = styles();

  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form),navigate('/'));
      
    }
    else {
      dispatch(signin(form),navigate('/'));
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (credentialResponse) => {
    console.log(credentialResponse);
    const result = credentialResponse.profileObj;
    const token = credentialResponse.tokenId;

    try {
      dispatch({
        type: "AUTH",
        data: { result, token }
      });
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  };

  const googleError = (error) => {
    alert("Google Sing in unsuccessfull,Please Try Again");
    console.log(error)
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5" color="red" fontWeight="bold" >{isSignup ? 'Sign up' : 'Sign in'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          
          <GoogleLogin
            clientId="681518767098-ho2t7a8edltss2se9242o0nf5vmijmvd.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth