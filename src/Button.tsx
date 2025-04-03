type PropsType = {
    title: string
    onClick?: () => void
}
export const Button = ({title, onClick}: PropsType) => {
    return (
        <button onClick={onClick}>{title}</button>
    )
}