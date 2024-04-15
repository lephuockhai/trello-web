import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { cyan, deepOrange, orange, teal} from '@mui/material/colors'

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
                primary: cyan,
                secondary: orange
            }
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    '*::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px'
                    }, // thanh cuộn trang hàng ngang
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: '#55E6C1', // màu của thanh cuộn
                        borderRadius: '8px' // bo góc của thanh cuộn
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#4b4b4b', // màu của thanh cuộn khi di chuyển chuột vào
                    },
                }
            }
        },
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