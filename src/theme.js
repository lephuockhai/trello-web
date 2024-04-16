import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { cyan, deepOrange, orange, teal} from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
    trello: {
        appBarHeight: '58px',
        boardBarHeight: '60px'
    },
    colorSchemes: {
        // light: {
        //     palette: {
        //         primary: teal,
        //         secondary: deepOrange
        //     }
        // },
        // dark: {
        //     palette: {
        //         primary: cyan,
        //         secondary: orange
        //     }
        // }
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
                        backgroundColor: '#dcdde1', // màu của thanh cuộn
                        borderRadius: '8px' // bo góc của thanh cuộn
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: 'white', // màu của thanh cuộn khi di chuyển chuột vào
                    },
                }
            }
        },
        MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'None',
                borderWidth: '0.5px',
                '&:hover': { borderWidth: '0.5px', bordercolor: 'white'}
              }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
              root: { fontSize: '0.875rem' }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    fontSize: '0.875rem',
                    '& fieldset': { borderWidth: '1px !impotant' },
                    '&:hover fieldset': { borderWidth: '1px !impotant' },
                    '&.Mui-focused fieldset': { borderWidth: '1px !impotant' },
                }
            }
        }
    }
})

export default theme