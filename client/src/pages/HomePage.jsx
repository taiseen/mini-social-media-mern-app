import FriendListWidget from "pages/widgets/FriendListWidget";
import PostCreationWidget from "pages/widgets/PostCreationWidget";
import AdvertWidget from "pages/widgets/AdvertWidget";
import PostsContainerWidget from "pages/widgets/PostsContainerWidget";
import UserWidget from "pages/widgets/UserWidget";
import Navbar from "pages/Navbar";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

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
                    <UserWidget userId={_id} />
                </Box>

                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <PostCreationWidget picturePath={picturePath} />
                    <PostsContainerWidget userId={_id} />
                </Box>

                {
                    // friend list only show at desktop view...
                    isNonMobileScreens &&
                    <Box flexBasis="26%">
                        <AdvertWidget />
                        <Box m="2rem 0" />
                        <FriendListWidget userId={_id} />
                    </Box>
                }
            </Box>
        </Box>
    );
};

export default HomePage;