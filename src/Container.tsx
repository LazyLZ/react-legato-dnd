import { ReactNode, useEffect, useRef, useState, forwardRef, CSSProperties } from 'react'
import { DragDrop, DragDropProps } from 'legato-dnd'
import mergeRefs from 'react-merge-refs'
// TODO 使用Class Component重写
export interface DragStartHandlerProps {
    index: number
}

export interface DragCrossHandlerProps {
    order: number[],
    from: number,
    current: number,
    oldCurrent: number,
    items: any[],
}

export interface OrderChangeHandlerProps<T> {
    order: number[],
    from: number,
    to: number,
    items: T[],
}

export interface ContainerComponentProps {
    style?: CSSProperties,
    className?: string,
    children: ReactNode,
    items?: any[],
    onOrderChange?: (props: OrderChangeHandlerProps<any>) => void
    onDragStart?: (props: DragStartHandlerProps) => void
    onDragEnd?: () => void
    onDragCross?: (props: DragCrossHandlerProps) => void
}

export type ContainerPropTypes = ContainerComponentProps & Omit<DragDropProps, 'container'>


const DragContainer = forwardRef<HTMLDivElement, ContainerPropTypes>(function ({
    className,
    // vertical = false,
    children,
    items,
    onOrderChange,
    onDragStart,
    onDragEnd,
    onDragCross,
    style,
    ...args
}, ref) {
    // const ref = useRef(null)
    const [dragDrop, setDragDrop] = useState<DragDrop | null>(null)
    const itemsRef = useRef(items)
    const divRef = useRef(null)
    useEffect(() => {
        itemsRef.current = items
    })
    useEffect(() => {
        if (dragDrop && args.groups) {
            dragDrop.setGroups(args.groups)
        }
    }, [args.groups])

    useEffect(() => {
        if (divRef.current == null) return
        // console.log('create DragDrop', vertical)
        const d = new DragDrop({
            container: divRef.current,
            ...args,
        })
        d.on('orderChange', ({ order, from, to }: OrderChangeHandlerProps<any>) => {
            const oldItems = itemsRef.current || []
            if (onOrderChange) {
                let newItems: (typeof oldItems) = oldItems || []
                if (oldItems && oldItems.length === order.length) {
                    newItems = oldItems.map((t, i) => oldItems[order[i]])
                }
                onOrderChange({ order, from, to, items: newItems })
            }
        })
        d.on('dragCross', ({ order, from, current, oldCurrent }: DragCrossHandlerProps) => {
            const oldItems = itemsRef.current || []
            if (onDragCross) {
                let newItems: (typeof oldItems) = oldItems || []
                if (oldItems && oldItems.length === order.length) {
                    newItems = oldItems.map((t, i) => oldItems[order[i]])
                }
                onDragCross({ order, from, current, items: newItems, oldCurrent })
            }
        })
        d.on('dragStart', ({ index }: DragStartHandlerProps) => {
            if (onDragStart) {
                onDragStart({ index })
            }

        })
        d.on('dragEnd', () => {
            if (onDragEnd) {
                onDragEnd()
            }
        })
        setDragDrop(d)

    }, [ref])
    return (
        <div ref={mergeRefs([ref, divRef])} className={className} style={style}>
            {children}
        </div>
    )
})
export default DragContainer
