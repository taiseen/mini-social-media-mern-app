import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./styles/theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import ProfilePage from "pages/profilePage";
import LoginPage from "pages/loginPage";
import HomePage from "pages/homePage";


function App() {

  const mode = useSelector(state => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector(state => state.auth.token));
  // const posts = useSelector(state => state.post.posts);
  // const user = useSelector(state => state.auth.user);
  // console.log('mode ==> ' , mode)
  // console.log('posts ==> ' , posts)
  // console.log('user ==> ' , user)
  // console.log('isAuth ==> ' , isAuth)

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>

            <Route path="/" element={<LoginPage />} />

            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />

            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />

          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;