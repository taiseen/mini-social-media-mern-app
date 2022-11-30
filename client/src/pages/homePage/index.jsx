import FriendListWidget from "pages/widgets/FriendListWidget";
import MyPostWidget from "pages/widgets/MyPostWidget";
import AdvertWidget from "pages/widgets/AdvertWidget";
import PostsWidget from "pages/widgets/PostsWidget";
import UserWidget from "pages/widgets/UserWidget";
import Navbar from "pages/navbar";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const HomePage = () => {

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector(state => state.auth.user);

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyPostWidget picturePath={picturePath} />
                    <PostsWidget userId={_id} />
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis="26%">
                        <AdvertWidget />
                        <Box m="2rem 0" />
                        <FriendListWidget userId={_id} />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default HomePage;