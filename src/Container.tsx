import {ReactNode, useEffect, useRef, useState, forwardRef, CSSProperties} from 'react'
import {
    BeforeDragStartEvent, BeforeDropEvent, DragCanceledEvent, DragCrossEvent,
    DragDrop, DragDropProps, DragEndEvent, DragOverEvent,
    DragStartEvent, DropEvent,
    EnterContainerEdgeEvent,
    EnterViewportEdgeEvent,
    LeaveContainerEdgeEvent,
    LeaveViewportEdgeEvent, OrderChangeEvent,
    ProgrammingScrollEndEvent,
    ProgrammingScrollErrorEvent,
    ProgrammingScrollEvent,
    ProgrammingScrollStartEvent,
} from 'legato-dnd'
// } from './dist'
import mergeRefs from 'react-merge-refs'
import {Simulate} from 'react-dom/test-utils'
import drag = Simulate.drag
// TODO 使用Class Component重写
export type Handler<Event> = (event: Event) => void

export interface ContainerComponentProps {
    style?: CSSProperties,
    className?: string,
    children?: ReactNode,
    onEnterViewportEdge?: Handler<EnterViewportEdgeEvent>,
    onLeaveViewportEdge?: Handler<LeaveViewportEdgeEvent>,
    onEnterContainerEdge?: Handler<EnterContainerEdgeEvent>,
    onLeaveContainerEdge?: Handler<LeaveContainerEdgeEvent>,
    onProgrammingScrollStart?: Handler<ProgrammingScrollStartEvent>,
    onProgrammingScrollEnd?: Handler<ProgrammingScrollEndEvent>,
    onProgrammingScroll?: Handler<ProgrammingScrollEvent>,
    onProgrammingScrollError?: Handler<ProgrammingScrollErrorEvent>,
    onBeforeDragStart?: Handler<BeforeDragStartEvent>,
    onDragStart?: Handler<DragStartEvent>,
    onDragOver?: Handler<DragOverEvent>,
    onDragCross?: Handler<DragCrossEvent>,
    onBeforeDrop?: Handler<BeforeDropEvent>,
    onDragCanceled?: Handler<DragCanceledEvent>
    onDrop?: Handler<DropEvent>,
    onDragEnd?: Handler<DragEndEvent>,
    onOrderChange?: Handler<OrderChangeEvent>
}

export type ContainerPropTypes = ContainerComponentProps & Omit<DragDropProps, 'container'>


const DragContainer = forwardRef<HTMLDivElement, ContainerPropTypes>(function ({
    className,
    children,
    style,
    onEnterViewportEdge,
    onLeaveViewportEdge,
    onEnterContainerEdge,
    onLeaveContainerEdge,
    onProgrammingScrollStart,
    onProgrammingScrollEnd,
    onProgrammingScroll,
    onProgrammingScrollError,
    onBeforeDragStart,
    onDragStart,
    onDragOver,
    onDragCross,
    onBeforeDrop,
    onDrop,
    onDragEnd,
    onOrderChange,
    onDragCanceled,
    ...args
}, ref) {
    // const ref = useRef(null)
    const [dragDrop, setDragDrop] = useState<DragDrop | null>(null)
    const divRef = useRef(null)
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
        const entries: ([string, Handler<any> | undefined])[] = [
            ['enterViewportEdge', onEnterViewportEdge],
            ['leaveViewportEdge', onLeaveViewportEdge],
            ['enterContainerEdge', onEnterContainerEdge],
            ['leaveContainerEdge', onLeaveContainerEdge],
            ['programmingScrollStart', onProgrammingScrollStart],
            ['programmingScrollEnd', onProgrammingScrollEnd],
            ['programmingScroll', onProgrammingScroll],
            ['programmingScrollError', onProgrammingScrollError],
            ['beforeDragStart', onBeforeDragStart],
            ['dragStart', onDragStart],
            ['dragOver', onDragOver],
            ['dragCross', onDragCross],
            ['beforeDrop', onBeforeDrop],
            ['drop', onDrop],
            ['dragEnd', onDragEnd],
            ['orderChange', onOrderChange],
        ]
        entries.forEach(([name, handler]) => {
            if (handler) {
                d.on(name, handler)
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
