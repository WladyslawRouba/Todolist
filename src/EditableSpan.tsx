import {ChangeEvent, useState} from "react";

type Props = {
    title: string,
}
export const EditableSpan = ({title}: Props) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [itemTitle, setItemTitle] = useState('title')

    const onEditMode = () => {
        setIsEditMode(true)
    }
    const offEditMode = () => {
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