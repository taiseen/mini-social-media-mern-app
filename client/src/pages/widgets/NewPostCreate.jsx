import { EditOutlined, DeleteOutlined, AttachFileOutlined, GifBoxOutlined, ImageOutlined, MicOutlined, MoreHorizOutlined } from "@mui/icons-material";
import { Box, Divider, Typography, InputBase, useTheme, Button, IconButton, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "redux/features/postSlice";
import { useState } from "react";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import Dropzone from "react-dropzone";
import { userPostCreation } from '../../api/index';


const NewPostCreate = ({ picturePath }) => {

    const { palette } = useTheme();
    const dispatch = useDispatch();
    const { _id } = useSelector(state => state.auth.user);

    const [post, setPost] = useState("");
    const [image, setImage] = useState(null);
    const [isImage, setIsImage] = useState(false);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const medium = palette.neutral.medium;
    const mediumMain = palette.neutral.mediumMain;


    // 🟨🟨🟨 POST Request...
    const handleNewPostCreation = async () => {

        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        try {
            // 🟨🟨🟨 backend api call for POST Request...
            const { data } = await userPostCreation(formData);
            dispatch(setPosts({ posts: data }));
            setImage(null);
            setPost("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage image={picturePath} />
                <InputBase
                    placeholder="What's on your mind..."
                    onChange={e => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                        backgroundColor: palette.neutral.light,
                    }}
                />
            </FlexBetween>
            {
                isImage && (
                    <Box
                        p="1rem"
                        mt="1rem"
                        borderRadius="5px"
                        border={`1px solid ${medium}`}
                    >
                        <Dropzone
                            multiple={false}
                            acceptedFiles=".jpg,.jpeg,.png"
                            onDrop={acceptedFiles => setImage(acceptedFiles[0])}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <FlexBetween>
                                    <Box
                                        {...getRootProps()}
                                        p="1rem"
                                        width="100%"
                                        border={`2px dashed ${palette.primary.main}`}
                                        sx={{ "&:hover": { cursor: "pointer" } }}
                                    >
                                        <input {...getInputProps()} />
                                        {
                                            !image
                                                ? <p>Add Image Here</p>
                                                : <FlexBetween>
                                                    <Typography>{image.name}</Typography>
                                                    <EditOutlined />
                                                </FlexBetween>
                                        }
                                    </Box>
                                    {
                                        image && (
                                            <IconButton
                                                onClick={() => setImage(null)}
                                                sx={{ width: "15%" }}
                                            >
                                                <DeleteOutlined />
                                            </IconButton>
                                        )
                                    }
                                </FlexBetween>
                            )}
                        </Dropzone>
                    </Box>
                )
            }

            <Divider sx={{ margin: "1.25rem 0" }} />

            <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                    >
                        Image
                    </Typography>
                </FlexBetween>

                {
                    isNonMobileScreens ? (
                        <>
                            <FlexBetween gap="0.25rem">
                                <GifBoxOutlined sx={{ color: mediumMain }} />
                                <Typography color={mediumMain}>Clip</Typography>
                            </FlexBetween>

                            <FlexBetween gap="0.25rem">
                                <AttachFileOutlined sx={{ color: mediumMain }} />
                                <Typography color={mediumMain}>Attachment</Typography>
                            </FlexBetween>

                            <FlexBetween gap="0.25rem">
                                <MicOutlined sx={{ color: mediumMain }} />
                                <Typography color={mediumMain}>Audio</Typography>
                            </FlexBetween>
                        </>
                    ) : (
                        <FlexBetween gap="0.25rem">
                            <MoreHorizOutlined sx={{ color: mediumMain }} />
                        </FlexBetween>
                    )
                }

                <Button
                    disabled={!post}
                    onClick={handleNewPostCreation}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                >
                    POST
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default NewPostCreate;