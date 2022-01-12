import {HANDLER_CLASS} from 'legato-dnd'
import {CSSProperties, ReactNode} from 'react'
// TODO 使用Class Component重写
interface DraggableProps {
    children?: ReactNode,
    className?: string,
    style?: CSSProperties,
    handler?: boolean
}

export default function Handler({children, style, className = '', handler = true}: DraggableProps) {
    const classes = [
        handler && HANDLER_CLASS,
        className,
    ].filter(v => !!v).join(' ')
    return (
        <div style={style} className={classes}>
            {children}
        </div>
    )
}
