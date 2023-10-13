import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiLink: {
            styleOverrides:{
                root:{
                    color: 'black'

                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {

                    backgroundColor: 'rgb(82, 223, 201)',
                    color: 'black',
                    borderRadius: '8px',
                    margin: "1rem",
                    fontFamily: "Roboto"
                }
            }

        }
    },
  palette: {
    primary: {
      main: "#FF5722",
    },
    secondary: {
      main: '#FF5722', // Change to your secondary color
    },
  },
  typography: {
    fontFamily: 'Lexend',
    fontSize: 16,
  },
});

export default theme;
