import { FriendListWidget, PostCreationWidget, PostsContainerWidget, UserWidget } from "./widgets";
import { Box, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetUser } from "hook";
import Navbar from "pages/Navbar";


const ProfilePage = () => {

    const { userId } = useParams();
    const { data, loading, error } = useGetUser(userId); // * backend api call for GET request...

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
                    <UserWidget userId={userId} />
                    <Box m="2rem 0" />
                    <FriendListWidget userId={userId} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <PostCreationWidget picturePath={data.picturePath} />
                    <Box m="2rem 0" />
                    <PostsContainerWidget userId={userId} isProfile />
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;