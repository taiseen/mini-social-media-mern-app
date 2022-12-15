import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined, DeleteOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "redux/features/postSlice";
import { useState } from "react";
import { postLike } from "api";
import WidgetWrapper from "components/WidgetWrapper";
import DeletePostDialog from "./DeletePostDialog";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";


const SinglePost = ({
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

    const loggedInUserId = useSelector(state => state.auth.user._id);

    const [postDeleteModalOpen, setPostDeleteModalOpen] = useState(false);

    const [isComments, setIsComments] = useState(false);

    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    const main = palette.neutral.main;


    // 🟨🟨🟨 PATCH Request...
    const likeUserPost = async () => {
        try {
            // 🟨🟨🟨 backend api call for PATCH Request...
            const { data } = await postLike(postId, loggedInUserId);
            dispatch(setPost({ post: data }));
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <WidgetWrapper m="2rem 0">
            
            <Friend
                name={name}
                subtitle={location}
                postUserId={postUserId}
                userPicturePath={userPicturePath}
            />

            {/* User writing post description */}
            <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>

            {
                // if user upload any picture for post...
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
                        <IconButton onClick={likeUserPost}>
                            {
                                isLiked
                                    ? <FavoriteOutlined sx={{ color: 'red' }} />
                                    : <FavoriteBorderOutlined sx={{ color: 'orange' }} />
                            }
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    {/* 📩📩📩 comment button */}
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined sx={{ color: 'lightblue' }} />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>

                    {
                        // ⛔⛔⛔ delete button
                        loggedInUserId === postUserId &&
                        <FlexBetween gap="0.3rem">
                            <IconButton onClick={() => setPostDeleteModalOpen(true)}
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

            {
                // ❌ post delete confirmation modal... ❌
                postDeleteModalOpen &&
                <DeletePostDialog
                    postId={postId}
                    postDeleteModalOpen={postDeleteModalOpen}
                    setPostDeleteModalOpen={setPostDeleteModalOpen}
                />
            }
        </WidgetWrapper>
    );
};

export default SinglePost;