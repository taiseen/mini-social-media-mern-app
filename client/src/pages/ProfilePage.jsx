import { FriendList, NewPostCreate, PostsContainer, UserInfo } from "./widgets";
import { Box, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetUser } from "hook";
import Navbar from "pages/Navbar";


const ProfilePage = () => {

    const { userId } = useParams();
    const { data, loading, error } = useGetUser(userId); // * backend api call for GET request...
    console.log(data, loading);
    console.log(userId);

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    if (loading) return <p>Data loading...</p>;
    if (error) return <p>Error happen...</p>;

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserInfo userId={userId} picturePath={data?.picturePath} />
                    <Box m="2rem 0" />
                    <FriendList userId={userId} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <NewPostCreate picturePath={data?.picturePath} />
                    <Box m="2rem 0" />
                    <PostsContainer userId={userId} isProfile />
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;