"use strict"

//in hoa chu cai dau cua 1 chuoi

export const CapitalizeTheFirstLetter = ( val ) => {
    if(!val) return ''
    return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

export const generatePlaceHolderCard = (column) => {
    return {
        _id: `${column._id}-placeholder-card`,
        boardId: column.boardId,
        columnId: column._id,
        FE_PlaceHolderCard: true
    }
}