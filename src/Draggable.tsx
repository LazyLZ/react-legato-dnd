import { DRAGGABLE_CLASS, HANDLER_CLASS } from 'legato-dnd'
import { CSSProperties, ReactNode } from 'react'
// TODO 使用Class Component重写
interface DraggableProps {
    children?: ReactNode,
    className?: string,
    handler?: boolean,
    style?: CSSProperties,
}

export default function Draggable ({ style, children, className = '', handler = true }: DraggableProps) {
    const classes = [
        DRAGGABLE_CLASS,
        handler && HANDLER_CLASS,
        className,
    ].filter(v => !!v).join(' ')
    return (
        <div style={style} className={classes}>
            {children}
        </div>
    )
}
