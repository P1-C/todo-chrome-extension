/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { CssBaseline, Box, ThemeProvider, Paper } from "@mui/material";
import Sidebar from "./components/Sidebar";
import MainSection from "./components/MainSection";
import { createTheme } from "@mui/material/styles";
import Notifier from './components/Notifier';
import LandingPage from './components/LandingPage'
import useTodoStore from './store/todoStore';
import { deepPurple } from '@mui/material/colors';
import useConfigStore from './store/configStore';
import TaskDrawer from './components/TaskDrawer';

function App() {
  // State to track the theme (dark or light)
  const { isSideBarOpen } = useConfigStore()
  const { groups } = useTodoStore()
  const { isNewUser, setIsDarkTheme, isDarkTheme, setSelectedGroup } = useConfigStore()

  // Function to apply the theme based on user preference
  const applyTheme = (matches) => {
    const theme = createTheme({
      palette: {
        mode: matches ? 'dark' : 'light',
      },
    });

    setIsDarkTheme(matches);
    return theme;
  };

  useEffect(() => {
    setSelectedGroup(groups[0])
    // Apply theme based on user preference on component mount
    applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e) => {
      // Apply theme and update state when user preference changes
      const newTheme = applyTheme(e.matches);
      document.documentElement.style.setProperty('--primary-background-color', newTheme.palette.background.default);
    };

    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, [isNewUser]);

  // Function to toggle between dark and light themes
  const themeChangeHandler = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeProvider theme={createTheme({
      palette: {
        mode: isDarkTheme ? 'dark' : 'light',
        primary: {
          main: deepPurple.A200
        }
      },
      typography: {
        fontFamily: 'Josefin Sans'
      }
    })}>
      <Paper sx={{ height: 'auto', minHeight: '99vh' }} variant='elevation'>
        <CssBaseline />
        {isNewUser ?
          <LandingPage />
          :
          <Box display="flex" flexDirection='row'  >
            <Box minWidth={220} boxShadow={3} height="99.7vh" display={isSideBarOpen ? 'block' : 'none'} >
              <Sidebar toggleTheme={themeChangeHandler} isDarkTheme={isDarkTheme} />
            </Box>
            <Box width='100%' >
              <MainSection />
            </Box>
          </Box>
        }
      </Paper>
      <TaskDrawer />
      <Notifier />
    </ThemeProvider>
  );
}

export default App;
