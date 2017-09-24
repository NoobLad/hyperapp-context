# Hyperapp Context

It's a simple implementation of react context for [hyperapp](https://github.com/hyperapp/hyperapp).

## How

You need to add the context mixin and use context h instead of default hyperapp one like that :
```js
import {app} from "hyperapp"
import context, {h} from "hyperapp-context"

app({
  state: {/*Some state*/},
  view(state, actions) {
    return <div>
      <SomeComponentUsingContext/>
    </div>
  },
  mixins: [context]
})
```

for components they just have two more parameters than usual, the context and function to set children context :
```js
function MessageProvider(props, children, context, setChildContext) {
  setChildContext({
    /* it will merge this with the actual context, but will only be accessible to its children */
    message: "Hello"
  })
  
  return children
}

function MessageDisplay(props, children, context, setChildContext) {
  return <h1>{context.message}</h1>
}
```

If `MessageDisplay` is a child of `MessageProvider` then the value of message in `MessageDisplay` context will be "Hello".

The context is inherited from the component tree, so each node of the tree have his own context depending on the value of it's parent.

A more complex example (in [codepen](https://codepen.io/nooblad/pen/LzbrrY?editors=0010) ) :

```js
import {app} from "hyperapp"
import context, {h} from "hyperapp-context"

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
  mixin: [context]
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
```

## Why ?

To provide a way to pass implicit parameters to components.
One of the uses i see is to provide a simple way to implement react-redux like pattern to provide the state (or part of it) to connected components without the use of global variables.

Another example could be for a router, to permit to use an action to change the url like this :
```js
app({
  view(state, actions) {
    return <Router>
      <Link to="/home"/>
      <Link to="/hello"/>
      <Route path="/home" component={Home}></Route>
      <Route path="/hello" component={Hello}></Route>
    </Router>
  },
  mixin: [
    context,
    ContextualRouter
  ]
})
```

instead of :
```js
app({
  view(state, actions) {
    return <Router>
      <Link to="/home" go={actions.go}/>
      <Link to="/hello" go={actions.go}/>
      <Route path="/home" component={Home}></Route>
      <Route path="/hello" component={Hello}></Route>
    </Router>
  },
  mixin: [
    Router
  ]
})
```

## Warn

Using implicit value can make the code harder to read. 
It's a practical tool but can also lead you to complicated code, making your app harder to maintain.
But it's a powerful addition for libraries developer.

## Going further

- [ ] tweak the code to make it lighter
- [ ] better documentation
- [ ] more examples

## License

Hyperapp context is MIT licensed. See [LICENSE](LICENSE.md).
