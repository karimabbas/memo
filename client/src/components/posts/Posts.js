import { CircularProgress, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({setCurrentId}) => {
    const classes = useStyles();
    const posts = useSelector((state) => state.postsStore);
    console.log(posts)
    return (
        { posts } ?
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6} md={6}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid> : <CircularProgress />
    );
};

export default Posts;