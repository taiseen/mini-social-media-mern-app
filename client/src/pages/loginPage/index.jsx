import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";


const LoginPage = () => {

    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    return (
        <Box>
            <Box
                p="1rem 6%"
                width="100%"
                textAlign="center"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography fontWeight="bold" fontSize="32px" color="primary">
                    SocialMedia
                </Typography>
            </Box>

            <Box
                p="2rem"
                m="2rem auto"
                borderRadius=".5rem"
                width={isNonMobileScreens ? "50%" : "93%"}
                backgroundColor={theme.palette.background.alt}
            >
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem", textAlign: "center" }}>
                    Welcome to SocialMedia, the Social Media for Sociopaths!
                </Typography>

                {/* user registration form */}
                <Form />
            </Box>
        </Box>
    );
};

export default LoginPage;