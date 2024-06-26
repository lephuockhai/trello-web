//chứa các thông tin của 1 card
import { Card as MuiCard} from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function Card({ card }) {
    const ShouldShowCardActions = () => {
        return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
    }

    const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
        id: card._id,
        data: {...card}
    })

    const dndKitOrderedStyles = {
        touchAction: 'none', //dành cho người dùng màn hình cảm ứng
        transform: CSS.Translate.toString(transform),
        transition,
        height: '100%',
        opacity: isDragging ? 0.5 : undefined,
        border: isDragging ? '1px solid #48dbfb' : undefined
    }

    return (
        <div
            ref={setNodeRef}
            style={dndKitOrderedStyles}
            {...attributes}
        >
            <MuiCard
                {...listeners}
                sx={{
                    cursor: 'pointer',
                    boxShadow: ' 0 1px 1px rgba(0, 0, 0, 0.2)',
                    overflow: 'unset',
                    display: card?.FE_PlaceHolderCard ? 'none' : 'block',
                    border: '1px solid transparent',
                    '&:hover': { borderColor: (theme) => theme.palette.primary.main }
                }}
            >
                    {
                    card?.cover &&
                    <CardMedia sx={{ height: 150 }} image= {card?.cover} />
                    }
                    <CardContent sx={{ p: 1.5, '&:last-child': {p: 1.5 } }}>
                        <Typography> {card?.title} </Typography>
                    </CardContent>
                    {ShouldShowCardActions() &&
                        <CardActions sx={{ p: '0 4px 8px 4px' }}>
                            {!!card?.memberIds?.length && 
                                <Button size="small" startIcon={<GroupIcon />}>{card?.memberIds?.length}</Button>
                            }
                            {!!card?.comments?.length && 
                                <Button size="small" startIcon={<CommentIcon />}>{card?.comments?.length}</Button>
                            }
                            {!!card?.attachments?.length && 
                                <Button size="small" startIcon={<AttachmentIcon />}>{card?.attachments?.length}</Button>
                            }
                        </CardActions>
                    }
            </MuiCard>
        </div>
    )
}

export default Card