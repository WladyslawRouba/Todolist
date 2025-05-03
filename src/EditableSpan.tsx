import {ChangeEvent, useState} from "react";

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
        isEditMode ? <input value={itemTitle}
                            onChange={changeItemTitleHandler}
                            onBlur={offEditMode}
                            autoFocus
            />
            : <span onDoubleClick={onEditMode}>{title}</span>
    )
}