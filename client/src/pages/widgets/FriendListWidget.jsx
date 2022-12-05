import { Box, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "redux/features/authSlice";
import { useGetFriends } from "hook";
import { useEffect } from "react";
import WidgetWrapper from "components/WidgetWrapper";
import Friend from "components/Friend";


const FriendListWidget = ({ userId }) => {

    const dispatch = useDispatch();
    const { palette } = useTheme();
    const { data } = useGetFriends(userId);
    const friends = useSelector(state => state.user?.friends);

    useEffect(() => {
        dispatch(setFriends({ friends: data }));
    }, [data, dispatch]);

    
    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {friends?.map((friend) => (
                    <Friend
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occupation}
                        userPicturePath={friend.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default FriendListWidget;