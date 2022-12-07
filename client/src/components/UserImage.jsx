import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
    
    return (
        <Box
            width={size}
            height={size}
            sx={{ "&:hover": { cursor: "pointer" } }}>
            <img
                alt="user"
                width={size}
                height={size}
                style={{ objectFit: "cover", borderRadius: "50%" }}
                src={`${process.env.REACT_APP_SERVER_URL}/assets/${image}`}
            />
        </Box>
    );
};

export default UserImage;