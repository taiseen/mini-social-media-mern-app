import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined, DeleteOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "redux/features/postSlice";
import { toast } from 'react-toastify';
import { userPostDelete } from "hook";
import { useState } from "react";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";


const PostWidget = ({
    name,
    likes,
    postId,
    comments,
    location,
    postUserId,
    description,
    picturePath,
    userPicturePath,
}) => {

    const { palette } = useTheme();
    const dispatch = useDispatch();

    const token = useSelector(state => state.auth.token);
    const loggedInUserId = useSelector(state => state.auth.user._id);
    const posts = useSelector(state => state.post?.posts);


    const [isComments, setIsComments] = useState(false);

    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const main = palette.neutral.main;
    // const primary = palette.primary.main;

    try {
        // postLike
        // dispatch(setPosts({ post: updatedPost }));
    } catch (error) {
        console.log(error);
    }

    const patchLike = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        const updatedPost = await response.json();
        dispatch(setPosts({ post: updatedPost }));
    };

    // 🟥🟥🟥 Delete request...
    const handlePostDelete = async () => {
        try {
            const { status, data } = await userPostDelete(postId);

            if (status === 200) {
                // update ui by removing this deleted post...
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
        <WidgetWrapper m="2rem 0">
            <Friend
                name={name}
                subtitle={location}
                postUserId={postUserId}
                userPicturePath={userPicturePath}
            />
            <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>
            {
                picturePath && (
                    <img
                        width="100%"
                        height="auto"
                        alt="post"
                        style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                        src={`${process.env.REACT_APP_SERVER_URL}/assets/${picturePath}`}
                    />
                )
            }
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">

                    {/* 🧡🧡🧡 like button */}
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {
                                isLiked
                                    ? <FavoriteOutlined sx={{ color: 'orange' }} />
                                    : <FavoriteBorderOutlined />
                            }
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    {/* 📩📩📩 comment button */}
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>

                    {
                        // ⛔⛔⛔ delete button
                        loggedInUserId === postUserId &&
                        <FlexBetween gap="0.3rem">
                            <IconButton onClick={handlePostDelete}
                                sx={{
                                    "&:hover": {
                                        color: 'red',
                                        cursor: "pointer",
                                    },
                                }}>
                                <DeleteOutlined />
                            </IconButton>
                        </FlexBetween>
                    }
                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>

            {
                isComments && (
                    <Box mt="0.5rem">
                        {
                            comments?.map((comment, i) => (
                                <Box key={`${name}-${i}`}>
                                    <Divider />
                                    <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                        {comment}
                                    </Typography>
                                </Box>
                            ))
                        }
                        <Divider />
                    </Box>
                )
            }
        </WidgetWrapper>
    );
};

export default PostWidget;