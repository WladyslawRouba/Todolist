type PropsType = {
    title: string
    onClick?: () => void
    disabled?: boolean
}
export const Button = ({title, onClick, disabled}: PropsType) => {
    return (
        <button onClick={onClick} disabled={disabled} >{title}</button>
    )
}