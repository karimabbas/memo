import { Grid, Grow } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect,useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'
import Form from '../Form/Form'
import Posts from '../posts/Posts'

const Home = () => {

    // const classes = styles();
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
  
    useEffect(() => {
  
      dispatch(getPosts())
  
    }, [currentId, dispatch]);

  return (
    <Grow in>
    <Container>
      <Grid container justify="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={7}>
          <Posts  setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
      </Grid>
    </Container>
  </Grow>
  )
}

export default Home