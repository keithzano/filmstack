import { Pages } from "./pages";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import 'swiper/css';

const darkBlueTheme = createTheme({
  palette: {
    primary: {
      main: "#112240",
      light: "#233554",
      dark: "#0a192f",
    },
    secondary: {
      main: "#64ffda",
      light: "#a2ffe8",
      dark: "#327f6d",
    },
    text: {
      primary: "#8892b0",
      secondary: "#64ffda",
      disabled: "#ccd6f6"
    }, 
    background: {
      default: "#0a192f",
      paper: "#112240",
    },
  },
});

export const App = () => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={darkBlueTheme}>
        <CssBaseline />
        <Pages />
      </ThemeProvider>
    </QueryClientProvider>
  )
};