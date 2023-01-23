// import { Container, CardTitle, CardBody, CardSubtitle, CardText, Button, Card } from "reactstrap";
import { React, useEffect, useState } from "react";
import { Container, AppBar, Grow, Grid, Typography } from "@mui/material"
import styles from "./styles";
import images from "./images/lol.png";
import Form from "./components/Form/Form";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import Posts from "./components/posts/Posts";

function App() {
  const classes = styles();
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getPosts())

  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          <span className={classes.heading} >Memories</span>
          <img className={classes.image} src={images} alt="icon" height="60" align="left" />

        </Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>

  );
}

export default App;
