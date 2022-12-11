import { loginInitValues, registerInitValues, loginSchema, registerSchema } from "./value&validation";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from "@mui/material";
import { userLogin, userRegistration } from '../../api';
import { setLogin } from "redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Formik } from "formik";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";


const Form = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { palette } = useTheme();
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const [pageType, setPageType] = useState("login");
    const isRegister = pageType === "register";
    const isLogin = pageType === "login";

    const [statusInfo, setStatusInfo] = useState({
        loginError: '',
        registerSuccessInfo: '',
        registerErrorInfo: '',
    });


    // 🟨🟨🟨 POST request...
    const register = async (values, onSubmitProps) => {

        // this allows us to send form info with image
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append("picturePath", values.picture.name);

        try {
            // 🟨🟨🟨 backend api call for POST request...
            const savedUserResponse = await userRegistration(formData);

            // 🧹🧹🧹 Form Fields are Reset by Formik lib...
            onSubmitProps.resetForm();

            if (savedUserResponse.statusText === 'Created') {
                setStatusInfo(pre => ({ ...pre, registerSuccessInfo: 'Account created successfully...' }));
                setTimeout(() => { setPageType("login") }, 2000);
            }
        } catch (error) {
            console.log(error);
            setStatusInfo(pre => ({ ...pre, registerErrorInfo: error.response?.statusText }));
        }
    };

    // 🟨🟨🟨 POST request...
    const login = async (values, onSubmitProps) => {

        try {
            // 🟨🟨🟨 backend api call for POST request...
            const { data } = await userLogin(values);

            // 🧹🧹🧹 Form Fields are Reset by Formik lib...
            onSubmitProps.resetForm();

            // set user info at redux global store...
            dispatch(
                setLogin({
                    user: data.user,
                    token: data.token,
                })
            );

            navigate("/home");

        } catch (error) {
            console.log(error);
            setStatusInfo(pre => ({ ...pre, loginError: error?.response?.data?.msg }));
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? loginInitValues : registerInitValues}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue, // use for specific file upload...
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        gap="30px"
                        sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
                    >
                        {
                            // Registration Form...
                            isRegister && (
                                <>
                                    <TextField
                                        name="firstName"
                                        label="First Name"
                                        onBlur={handleBlur}         // click out into the input
                                        onChange={handleChange}     // handle when user is typing...
                                        value={values.firstName}
                                        error={Boolean(touched.firstName) && Boolean(errors.firstName)} // display error info...
                                        helperText={touched.firstName && errors.firstName}
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        name="lastName"
                                        label="Last Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lastName}
                                        error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName}
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                    <TextField
                                        name="location"
                                        label="Location"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.location}
                                        error={Boolean(touched.location) && Boolean(errors.location)}
                                        helperText={touched.location && errors.location}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                    <TextField
                                        name="occupation"
                                        label="Occupation"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.occupation}
                                        error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                        helperText={touched.occupation && errors.occupation}
                                        sx={{ gridColumn: "span 4" }}
                                    />
                                    <Box
                                        p="1rem"
                                        borderRadius="5px"
                                        gridColumn="span 4"
                                        border={`1px solid ${palette.neutral.medium}`}
                                    >
                                        <Dropzone
                                            multiple={false}                // only single file allowed
                                            acceptedFiles=".jpg,.jpeg,.png" // only accept these formate files
                                            onDrop={acceptedFiles => setFieldValue("picture", acceptedFiles[0])}
                                        >
                                            {
                                                ({ getRootProps, getInputProps }) => (
                                                    <Box
                                                        {...getRootProps()}
                                                        p="1rem"
                                                        border={`2px dashed ${palette.primary.main}`}
                                                        sx={{ "&:hover": { cursor: "pointer" } }}
                                                    >
                                                        <input {...getInputProps()} />
                                                        {
                                                            !values.picture // if no picture is uploaded...
                                                                ? <p>Add Picture Here</p>
                                                                : <FlexBetween>
                                                                    <Typography>{values.picture.name}</Typography>
                                                                    <EditOutlinedIcon />
                                                                </FlexBetween>
                                                        }
                                                    </Box>
                                                )
                                            }
                                        </Dropzone>
                                    </Box>
                                </>
                            )
                        }

                        {/* Registration & Login Form... */}
                        <TextField
                            name="email"
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4" }}
                        />
                    </Box>

                    {/* BUTTONS */}
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                p: "1rem",
                                m: "2rem 0",
                                fontSize: "1rem",
                                transition: ".5s",
                                color: palette.background.alt,
                                backgroundColor: palette.primary.main,
                                "&:hover": { color: palette.primary.main },
                            }}
                        >
                            {
                                isLogin ? "LOGIN" : "REGISTER"
                            }
                        </Button>

                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                setStatusInfo({}); // empty all status info...
                                resetForm();
                            }}
                            sx={{
                                textAlign: "center",
                                transition: ".3s",
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.dark,
                                }
                            }}
                        >
                            {
                                isLogin
                                    ? "Don't have an account? Sign Up here."
                                    : "Already have an account? Login here."
                            }
                        </Typography>
                    </Box>

                    {
                        // ! login error message display
                        isLogin && statusInfo?.loginError &&
                        <Box>
                            <Typography
                                marginTop={2}
                                sx={{
                                    color: "tomato",
                                    textAlign: "center",
                                }}
                            >
                                {statusInfo?.loginError}
                            </Typography>
                        </Box>
                    }

                    {
                        // ! register error message display
                        isRegister && statusInfo?.registerErrorInfo &&
                        <Box>
                            <Typography
                                marginTop={2}
                                sx={{
                                    color: "tomato",
                                    textAlign: "center",
                                }}
                            >
                                {statusInfo?.registerErrorInfo}
                            </Typography>
                        </Box>
                    }
                </form>
            )}
        </Formik>
    );
};

export default Form;