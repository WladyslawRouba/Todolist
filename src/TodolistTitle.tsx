type PropsType = {
    title: string
}
export const TodolistTitle = ({title}: PropsType) => {
    return (
        <h3>{title}</h3>
    )
}