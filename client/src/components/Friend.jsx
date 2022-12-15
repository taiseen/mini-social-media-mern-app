import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { addRemoveFriend } from './../api/index';
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";


const Friend = ({ postUserId, friendId, name, subtitle, userPicturePath }) => {

    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { _id } = useSelector(state => state.auth.user);          // get login user ID
    const friends = useSelector(state => state.auth.user?.friends); // get user friend list [array]

    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const primaryDark = palette.primary.dark;
    const primaryLight = palette.primary.light;

    const isFriend = Boolean(friends?.find(friend => friend?._id === (postUserId || friendId)));


    // 🟨🟨🟨 PATCH Request...
    const addRemoveFriendRequest = async (postUserId) => {
        console.log(postUserId);
        try {
            // 🟨🟨🟨 backend api call for PATCH request...
            const { data } = await addRemoveFriend(_id, postUserId || friendId);
            dispatch(setFriends({ friends: data }));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <FlexBetween>
            <FlexBetween gap="1rem">

                <UserImage image={userPicturePath} size="55px" />

                <Box
                    onClick={() => {
                        navigate(`/profile/${postUserId || friendId}`);
                        navigate(0); // refresh again this url...
                    }}
                >
             
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer",
                            },
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>

            </FlexBetween>

            {
                // ⛔⛔⛔ you can't send friend request to yourself...
                postUserId === _id
                    ? null
                    : <IconButton
                        onClick={() => addRemoveFriendRequest(postUserId)}
                        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
                    >
                        {
                            isFriend
                                ? <PersonRemoveOutlined sx={{ color: primaryDark }} />
                                : <PersonAddOutlined sx={{ color: primaryDark }} />
                        }
                    </IconButton>
            }
        </FlexBetween>
    );
};

export default Friend;