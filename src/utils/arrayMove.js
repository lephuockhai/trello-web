

export function arrayMove (array, from, to) {
    const newArray = array.slice()
    newArray.splice(
        to < 0 ? newArray.lenght + to : to,
        0,
        newArray.splice(from, 1)[0]
    )
    return newArray
}