> [!NOTE]
> 不适合tiddlywiki

```js
// https://prosemirror.xheldon.com/docs/ref/
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {Schema, DOMParser} from "prosemirror-model"
import {schema} from "prosemirror-schema-basic"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"

export function setupEditor(element: HTMLButtonElement, content: HTMLDivElement) {
const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks
})

// @ts-ignore
const sview = new EditorView(element, {
  state: EditorState.create({
    doc: DOMParser.fromSchema(mySchema).parse(content),
    plugins: exampleSetup({schema: mySchema})
  })
})

const state = EditorState.create({
  doc: DOMParser.fromSchema(schema).parse(content)
}).doc;

window.sstate = state
window.debug = () => {
  console.log(sstate.content.content[0].content.content[0].text)
}

const json = state.toJSON();
  console.log(json)
}
```