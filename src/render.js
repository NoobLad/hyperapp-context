export function render(state, actions, view) {
  return function(state, actions) {
    return asVDomNode({}, view(state, actions))
  }
}

function asVDomNode(context, node) {
  if (typeof node !== "object") return node
  if (typeof node.tag === "function") {
    node = node.tag(node.data, node.children, context, setContext)
  }
  if (Array.isArray(node)) return walkChildren(node, context)

  node.children = node.children && walkChildren(node.children, context)

  return node

  function setContext(newContext) {
    return (context = merge(context, newContext))
  }
}

function walkChildren(children, context) {
  return flattenChildren(
    children.map(asVDomNode.bind(null, context)).filter(function(v) {
      return v && v !== true
    })
  )
}

function merge(v1, v2) {
  var result = {}

  for (var key in v1) {
    result[key] = v1[key]
  }

  for (var key in v2) {
    result[key] = v2[key]
  }

  return result
}

function flattenChildren(children) {
  if (typeof children === "number") return "" + children
  if (!Array.isArray(children)) return children

  return children.reduce(function(acc, child) {
    return acc.concat(flattenChildren(child))
  }, [])
}
