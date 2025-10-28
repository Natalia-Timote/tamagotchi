import './Button.css'

interface ButtonProps {
    control: () => void,
    children: string
}

export default function Button({ control, children }: ButtonProps) {
    return (
        <button onClick={control} className="button-controls">{children}</button>
    )
}