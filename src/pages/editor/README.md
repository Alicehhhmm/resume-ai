# Editor Layout

## use

```jsx
import { EditorProvider, EditorMenuSidebar, EditorMainContent } from '@/pages/editor/components'

const page = () => {
    return (
        <EditorLayout>
            <EditorPanelLeft>
                <p>Preview content edit panel</p>
            </EditorPanelLeft>
            <EditorDrawingBoard>
                <p>PreviewPanel</p>
            </EditorDrawingBoard>
            <EditorPanelRight>
                <p>Preview aattribute edit panel </p>
            </EditorPanelRight>
        </EditorLayout>
    )
}
```
