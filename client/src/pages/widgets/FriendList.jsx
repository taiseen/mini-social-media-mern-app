import { Box, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "redux/features/authSlice";
import { useGetFriends } from "api";
import { useEffect } from "react";
import WidgetWrapper from "components/WidgetWrapper";
import Friend from "components/Friend";


const FriendList = ({ userId }) => {

    const dispatch = useDispatch();
    const { palette } = useTheme();
    const { data } = useGetFriends(userId); // 🟩🟩🟩 GET Request...
    const friends = useSelector(state => state.auth.user.friends);

    useEffect(() => {
        // data store in redux store for globally accessible...
        dispatch(setFriends({ friends: data }));
    }, [data, dispatch]);


    return (
        <WidgetWrapper>

            <Typography
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
                color={palette.neutral.dark}
            >
                Friend List
            </Typography>

            <Box display="flex" flexDirection="column" gap="1.5rem">
                {
                    friends?.map(friend => (
                        <Friend
                            key={friend?._id}
                            friendId={friend._id}
                            subtitle={friend.occupation}
                            userPicturePath={friend.picturePath}
                            name={`${friend.firstName} ${friend.lastName}`}
                        />
                    ))
                }
            </Box>

        </WidgetWrapper>
    );
};

export default FriendList;