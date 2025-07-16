// import {Button} from "./Button.tsx";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton,TextField} from "@mui/material";
type Props = {
    createItem: (title: string) => void
}
export const CreateItemForm = ({createItem}: Props) => {
    const[itemTitle, setItemTitle] = useState('')
    const[error, setError]= useState<string | null>(null)


    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) =>{
        setItemTitle(event.currentTarget.value)
        setError(null)

    }

    const createItemHandler = () => {
        const trimmedTitle = itemTitle.trim()
        if(trimmedTitle !== ''){
            createItem(trimmedTitle)
            setItemTitle('')
        }else{
            setError('Task title cannot be empty')
        }
    }

    const createItemEnterHandler = (event: KeyboardEvent<HTMLInputElement>) =>{
        if(event.key === "Enter"){
            createItemHandler()
        }
    }
    return (

        <div>
            <TextField
                size="small"
                variant="outlined"
                // className={error ? "error" : ""}
                error={!!error}
                value={itemTitle}
                placeholder="Enter task title"
                onChange={changeItemTitleHandler}
                onKeyDown={createItemEnterHandler}
                helperText={error}
            />
            {/*<Button title="+" onClick={createItemHandler}/>*/}
            <IconButton
                onClick={createItemHandler}
            >
                <AddCircleOutlineIcon/>
            </IconButton>
            {/*{error &&<div className={'error-message'}>{error}</div>}*/}

        </div>
    )
}