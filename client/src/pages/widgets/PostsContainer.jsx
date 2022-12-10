import { useGetAllPost, useGetUserPosts } from '../../api';
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "redux/features/postSlice";
import { useEffect } from "react";
import SinglePost from "./SinglePost";


const PostsContainer = ({ userId, isProfile = false }) => {

    const dispatch = useDispatch();

    const { data: allPost } = useGetAllPost();              // 🟩🟩🟩 GET Request...
    const { data: userPosts } = useGetUserPosts(userId);    // 🟩🟩🟩 GET Request...

    const posts = useSelector(state => state.post?.posts);

    useEffect(() => {
        isProfile
            ? dispatch(setPosts({ posts: userPosts }))
            : dispatch(setPosts({ posts: allPost }))
    }, [allPost, userPosts, dispatch, isProfile]);

    return (
        <>
            {
                posts
                    ?.slice(0)
                    ?.reverse()
                    ?.map(
                        ({
                            _id,
                            likes,
                            userId,
                            comments,
                            lastName,
                            location,
                            firstName,
                            description,
                            picturePath,
                            userPicturePath,
                        }) => (
                            <SinglePost
                                key={_id}
                                postId={_id}
                                likes={likes}
                                comments={comments}
                                postUserId={userId}
                                location={location}
                                description={description}
                                picturePath={picturePath}
                                userPicturePath={userPicturePath}
                                name={`${firstName} ${lastName}`}
                            />
                        )
                    )
            }
        </>
    );
};

export default PostsContainer;