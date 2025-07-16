import {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type Props = {
    title: string,
    changeTitle: (title: string) => void,
}
export const EditableSpan = ({title,changeTitle}: Props) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [itemTitle, setItemTitle] = useState('title')

    const onEditMode = () => {
        setIsEditMode(true)
    }
    const offEditMode = () => {
        changeTitle(itemTitle)
        setIsEditMode(false)
    }
    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }

    return (
        isEditMode ? <TextField
                variant="standard"
                value={itemTitle}
                onChange={changeItemTitleHandler}
                onBlur={offEditMode}
                autoFocus
            />
            : <span onDoubleClick={onEditMode}>{title}</span>
    )
}