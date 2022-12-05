import { useDispatch, useSelector } from "react-redux";
import { useGetPost, useGetPosts } from '../../hook';
import { setPosts } from "redux/features/postSlice";
import { useEffect } from "react";
import PostWidget from "./PostWidget";


const PostsWidget = ({ userId, isProfile = false }) => {

    const dispatch = useDispatch();

    const { data: allPost } = useGetPost();
    const { data: userFriendsPosts } = useGetPosts(userId);

    const posts = useSelector(state => state.post.posts);

    useEffect(() => {
        isProfile
            ? dispatch(setPosts({ posts: userFriendsPosts }))
            : dispatch(setPosts({ posts: allPost }))
    }, [allPost, userFriendsPosts, dispatch, isProfile]);

    return (
        <>
            {posts?.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    );
};

export default PostsWidget;