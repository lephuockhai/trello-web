import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { cyan, deepOrange, orange, teal, blueGrey} from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
    trello: {
        appBarHeight: '58px',
        boardBarHeight: '60px'
    },
    colorSchemes: {
        light: {
            palette: {
                primary: teal,
                secondary: deepOrange
            }
        },
        dark: {
            palette: {
                primary: blueGrey,
                secondary: orange
            }
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'None'
              }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
              root: ({ theme }) => ({
                color: theme.palette.primary.main,
                // fontSize: '0.875rem'
              })
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }) => {
                    return ({
                        color: theme.palette.primary.main,
                        fontSize: '0.875rem',
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.light
                        },
                        '&:hover': {
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main
                            }
                        },
                        '& fieldset': {
                            borderWidth: '1px !impotant'
                        }
                    })
                }
            }
        }
    }
})

export default theme