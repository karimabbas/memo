import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import styles from './styles';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import CardMedia from '@mui/material/CardMedia';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
  const classes = styles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('UserProfile'));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const Loves = () => {
    if (post.Loves.length > 0) {
      return post.Loves.find((love) => love === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.Loves.length > 2 ? `You and ${post.Loves.length - 1} others` : `${post.Loves.length} love${post.Loves.length > 1 ? 's' : ''}`}</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.Loves.length} {post.Loves.length === 1 ? 'Love' : 'Loves'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Love</>;
  };

  return (

    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.overlay}>
        <Typography color="silver" fontStyle="italic" variant="h7">{post.name}</Typography>
        <Typography fontWeight='bold' fontStyle="oblique" color="blanchedalmond" variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>

      {(user?.result?._id === post?.creator || user?.result?.googleId === post?.creator ) && (

      <div className={classes.overlay2}>
        <Button style={{ color: 'gray' }} size="small"
          onClick={() => setCurrentId(post._id)}
        ><EditIcon fontSize="medium" /></Button>
      </div>
      )}

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>

      <Typography className={classes.title} gutterBottom variant="h5" component="h2"><strong>{post.title}</strong></Typography>

      <CardContent>
        <Typography variant="body2" color="black" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>

        <Button size="small" color="error" disabled={!user?.result} onClick={() => dispatch(likePost(post._id, 'LoveCount'))} >
          <Loves />
        </Button>

        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id, 'likeCount'))}>
          <Likes />
        </Button>

        {(user?.result?._id === post?.creator || user?.result?.googleId === post?.creator) && (
          <Button size="small" color="error" onClick={() => dispatch(deletePost(post._id))} >
            <DeleteIcon fontSize="small" /> Delete
          </Button>)}

      </CardActions>
    </Card>
  )
}

export default Post