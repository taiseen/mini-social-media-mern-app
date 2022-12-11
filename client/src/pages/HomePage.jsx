import { PostsContainer, NewPostCreate, FriendList, UserInfo, Advert } from "./widgets";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "pages/Navbar";


const HomePage = () => {

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector(state => state.auth?.user);

    return (
        <Box>

            <Navbar />

            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                justifyContent="space-between"
                gap="0.5rem"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserInfo userId={_id} />
                </Box>

                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <NewPostCreate picturePath={picturePath} />
                    <PostsContainer userId={_id} />
                </Box>

                {
                    // friend list only show at desktop view...
                    isNonMobileScreens &&
                    <Box flexBasis="26%">
                        <Advert />
                        <Box m="2rem 0" />
                        <FriendList userId={_id} />
                    </Box>
                }
            </Box>
        </Box>
    );
};

export default HomePage;