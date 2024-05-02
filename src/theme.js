import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { cyan, deepOrange, orange, teal} from '@mui/material/colors'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

// Create a theme instance.
const theme = extendTheme({
    trello: {
        appBarHeight: APP_BAR_HEIGHT,
        boardBarHeight: BOARD_BAR_HEIGHT,
        boardContentHeight: BOARD_CONTENT_HEIGHT,
        columnHeaderHeight: COLUMN_HEADER_HEIGHT,
        columnFooterHeight: COLUMN_FOOTER_HEIGHT
    },
    // colorSchemes: {
    //     // light: {
    //     //     palette: {
    //     //         primary: teal,
    //     //         secondary: deepOrange
    //     //     }
    //     // },
    //     // dark: {
    //     //     palette: {
    //     //         primary: cyan,
    //     //         secondary: orange
    //     //     }
    //     // }
    // },
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
        MuiTypography: {
            styleOverrides: {
              root: { '&.MuiTypography-body1': { fontSize: '0.875rem' } }
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