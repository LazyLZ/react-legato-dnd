# React Legato DnD

React hook component for [Legato Dnd](https://github.com/LazyLZ/legato-dnd).

See legato-dnd docs for option and event descriptions.

Demo: [Legato Dnd React Demo](https://lazylz.github.io/legato-dnd-react-demo/)

## Basic Usage
```jsx
import { DragContainer, Draggable } from 'react-legato-dnd'

function Component () {
    return (
        <DragContainer>
            <Draggable>Item1</Draggable>
            <Draggable>Item1</Draggable>
            <Draggable>Item1</Draggable>
        </DragContainer>
    )
}
```

## Bind with Items

```jsx
// Hook Component
import { useEffect } from 'react'

function Component () {
    const [items, setItems] = useState([
        { name: 'Alice' },
        { name: 'Bob' },
        { name: 'Candy' },
    ])
    const ref = useRef(items)
    useEffect(() => {
        ref.current = items
    })
    const onOrderChange = ({ order }) => {
        setItems(order.map(i => ref.current[i]))
    }
    return (
        <DragContainer items={items} onOrderChange={onOrderChange}>
            {items.map(({ name }) => (
                <Draggable key={name}>{name}</Draggable>
            ))}
        </DragContainer>
    )
}

```

## types
```typescript
export interface ContainerComponentProps {
    style?: CSSProperties,
    className?: string,
    children?: ReactNode,
    onDragStart?: Handler<DragStartEvent>,
    // all events in legato-dnd is supported
}
// all options in legato-dnd is supported
export type ContainerPropTypes = ContainerComponentProps & Omit<DragDropProps, 'container'>
```
