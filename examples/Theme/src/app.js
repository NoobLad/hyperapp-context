/** @jsx h */
import {app} from "hyperapp"
import contextMixin, {h} from "../../.."

app({
  view(state, actions) {
    return <div>
      <Theme color="red">
        <Button>Red Button</Button>
      </Theme>
      <Theme color="blue">
        <Button>Blue Button</Button>
      </Theme>
    </div>
  },

  mixins: [contextMixin]
})

function Theme(props, children, context, setChildContext) {
  setChildContext({
    color: props.color,
  })

  return children
}

function Button(props, children, context) {
  return <button style={{color: context.color}}>
    {children}
  </button>
}
