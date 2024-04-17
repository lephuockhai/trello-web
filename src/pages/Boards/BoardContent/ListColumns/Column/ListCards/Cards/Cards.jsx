import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function Cards({ temporaryHiddenMedia }) {
    if( temporaryHiddenMedia ) {
        return (
            <Card
                sx={{
                cursor: 'pointer',
                boxShadow: ' 0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
                }}
            >
                <Typography> Card 1 No Media</Typography>
            </Card>
      )
    }
    return (
        <Card
            sx={{
            cursor: 'pointer',
            boxShadow: ' 0 1px 1px rgba(0, 0, 0, 0.2)',
            overflow: 'unset'
            }}
        >
            <CardMedia 
            sx={{ height: 150 }}
            image='https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-1/420743009_1972660693135510_656830229285118847_n.jpg?stp=dst-jpg_s480x480&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=9kq2opHws8EAb5mrjeT&_nc_ht=scontent.fsgn5-15.fna&oh=00_AfCiQvRHMSgnRjFFiXB2CNYDbKqBkn18WwtPeXRtVRjOUA&oe=6623043D'
            title= 'Avatar'
            />
            <CardContent
            sx={{ p: 1.5, '&:last-child': {p: 1.5 } }}>
            <Typography>Khaxi dev</Typography>
            </CardContent>
            <CardActions sx={{ p: '0 4px 8px 4px' }}>
            <Button size="small" startIcon={<GroupIcon />}>20</Button>
            <Button size="small" startIcon={<CommentIcon />}>15</Button>
            <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
            </CardActions>
        </Card>
  )
}

export default Cards