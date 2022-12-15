import { FriendList, NewPostCreate, PostsContainer, UserInfo } from "./widgets";
import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetUser } from "api";
import Navbar from "pages/Navbar";


const UserProfilePage = () => {

    const { userId } = useParams(); // ID come from URL parameter...
    const { data, loading, error } = useGetUser(userId); // 🟩🟩🟩 GET Request...
    console.log(data, loading);
    console.log(userId);

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    if (loading) {
        return (
            <Box
                width='100%'
                height='100%'
                display='flex'
                justifyContent="center"
                alignItems='center'
            >
                <CircularProgress color="inherit" />
            </Box>);
    }
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

export default UserProfilePage;