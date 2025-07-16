import {SxProps} from "@mui/material";

export const getListItemSx =(isDone: boolean): SxProps => ({
    display: "flex",
    justifyContent: "space-between",
    opacity: isDone? 0.5 : 1,
})