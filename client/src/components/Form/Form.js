import { Button, Paper, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import styles from "./styles"
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost, createPost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const classes = styles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('UserProfile'));

  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  });

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    });
  }

  const post = useSelector((state) => (currentId ? state.postsStore.find((p) => p._id === currentId) : null));
  // console.log(currentId)
  //   console.log(post)

  useEffect(() => {
    if (post) {
      setPostData(post)
    }

  }, [post]);

  const handlepostData = (e) => {

    setPostData({ ...postData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  }

  
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }
  

  return (

    <Paper className={classes.Paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
        <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} Memory</Typography>
        <TextField className={classes.TextField} name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={handlepostData} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={handlepostData} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={((e) => setPostData({ ...postData, tags: e.target.value.split(',') }))} />

        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>

        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form

