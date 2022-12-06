import { useGetAllPost, useGetUserPosts } from '../../hook';
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "redux/features/postSlice";
import { useEffect } from "react";
import PostWidget from "./PostWidget";


const PostsContainerWidget = ({ userId, isProfile = false }) => {

    const dispatch = useDispatch();

    const { data: allPost } = useGetAllPost();              // * backend api call for GET request...
    const { data: userPosts } = useGetUserPosts(userId);    // * backend api call for GET request...

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
                            <PostWidget
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

export default PostsContainerWidget;