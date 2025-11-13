import type { ReactNode } from 'react'
import './Button.css'

interface ButtonProps {
    control: () => void,
    hover?: () => void,
    hoverOff?: () => void,
    children: string | ReactNode
}

export default function Button({ control, hover, hoverOff, children }: ButtonProps) {
    return (
        <button onClick={control} onMouseOver={hover} onMouseLeave={hoverOff} className="button-controls">{children}</button>
    )
}