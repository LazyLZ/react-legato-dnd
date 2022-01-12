import {DragContainer, Draggable, Handler, OrderChangeHandlerProps} from '../index'
import {useCallback, useEffect, useRef, useState} from 'react'

interface ItemType {
    name: string,
    groups?: [number, number][],
    children?: ItemType[]
}

export default function App() {
    const [items, setItems] = useState<ItemType[]>([
        {
            name: 'AAAAAAAA', children: [
                {name: 'Angela'},
                {name: 'Bob'},
                {name: 'Candy'},
                {name: 'Duke'},
                {name: 'Eve'},
                {name: 'Far'},
            ],
            groups: [[0, 3], [2, 3]],
        },
        {
            name: 'B', children: [
                {name: 'Angela'},
                {name: 'Bob'},
                {name: 'Candy'},
            ],
        },
        {
            name: 'C', children: [
                {name: 'Angela'},
                {name: 'Bob'},
                {name: 'Candy'},
            ],
        },

    ])
    const ref = useRef(items)
    useEffect(() => {
        ref.current = items
    })

    const onOuterChange = ({items: newItems}: OrderChangeHandlerProps<ItemType>) => {
        setItems(newItems)
    }
    const onInnerChange = ({items: newItems}: OrderChangeHandlerProps<ItemType>, i: number) => {
        const outItems = [...ref.current]
        console.log('outItems', i, outItems.map(t => t.name))
        outItems[i].children = newItems
        setItems(outItems)
    }
    return (
        <div style={{maxWidth: '1000px', margin: 'auto', marginTop: '100px', height: '200px', overflow: 'auto'}}>
            <DragContainer lockCrossAxis items={items} onOrderChange={onOuterChange}>
                {items.map(({name, children, groups}, i) => (
                    <Draggable key={i} handler={false}>
                        <div style={{backgroundColor: '#f2f2f2', display: 'flex'}}>
                            <Handler>
                                <div>Handler{name}</div>
                            </Handler>
                            {children && children.length && (
                                <DragContainer
                                    groups={groups}
                                    lockCrossAxis vertical items={children}
                                    onOrderChange={e => onInnerChange(e, i)}>
                                    {children.map(({name}) => (
                                        <Draggable key={name} handler={false}>
                                            <div style={{width: '500px', height: '48px', display: 'flex'}}>
                                                <Handler>
                                                    <div style={{height: '100px'}}>Handler</div>
                                                </Handler>
                                                <input/>
                                                <div>{name}</div>
                                            </div>
                                        </Draggable>
                                    ))}
                                </DragContainer>
                            )}
                        </div>
                    </Draggable>
                ))}
            </DragContainer>
        </div>
    )

}
