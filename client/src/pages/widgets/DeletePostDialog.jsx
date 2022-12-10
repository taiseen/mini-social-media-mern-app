import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'redux/features/postSlice';
import { toast } from 'react-toastify';
import { userPostDelete } from 'api';


const DeletePostDialog = ({ postDeleteModalOpen, setPostDeleteModalOpen, postId }) => {

    const dispatch = useDispatch();
    const posts = useSelector(state => state.post?.posts);

    
    // * 🟥🟥🟥 Delete request...
    const handlePostDelete = async () => {
        try {
            // * 🟥🟥🟥 backend api call for DELETE request...
            const { status, data } = await userPostDelete(postId);

            if (status === 200) {
                // * update ui by removing this deleted post...
                const updatedPost = posts.filter(post => post._id !== postId)
                dispatch(setPosts({ posts: updatedPost }));
            }
            // display a notification...
            toast.success(data.message + "❗", { autoClose: 2000 });
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Dialog
            open={postDeleteModalOpen}
            // onClose={() => setPostDeleteModalOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Are you sure, you want to delete this post?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    By deleting this post you never get back this post again...
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setPostDeleteModalOpen(false)}
                    sx={{
                        color: 'green',
                        "&:hover": {
                            color: 'white',
                            backgroundColor: 'green',
                        },
                    }}
                >
                    Disagree
                </Button>
                <Button
                    onClick={handlePostDelete} autoFocus
                    sx={{
                        color: 'red',
                        "&:hover": {
                            color: 'white',
                            backgroundColor: 'red',
                        },
                    }}
                >
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeletePostDialog