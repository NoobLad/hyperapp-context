import { h } from "../src/h"
import { render } from "../src/render"

function renderTree(tree, state = {}, actions = {}) {
  return render(state, actions, typeof tree === "function" ? tree : () => tree)(
    state,
    actions
  )
}

test("empty node", () => {
  expect(renderTree(h("div"))).toEqual({
    tag: "div",
    props: {},
    children: []
  })
})

test("simple props", () => {
  expect(renderTree(h("div", { className: "hello" }))).toEqual({
    tag: "div",
    props: { className: "hello" },
    children: []
  })
})

test("nesting", () => {
  const tree = renderTree(
    h(
      "div",
      {},
      h("h1", {}, "hello"),
      h("p", { className: "message" }, "world")
    )
  )
  const expected = {
    tag: "div",
    props: {},
    children: [
      {
        tag: "h1",
        props: {},
        children: ["hello"]
      },
      {
        tag: "p",
        props: {
          className: "message"
        },
        children: ["world"]
      }
    ]
  }

  expect(tree).toEqual(expected)
})

test("component", () => {
  const Title = ({ text }) => h("h1", {}, text)

  expect(renderTree(h(Title, { text: "hello" }, "world"))).toEqual({
    tag: "h1",
    props: {},
    children: ["hello"]
  })
})

test("component with context", () => {
  const Config = ({ text }, children, context, setContext) => {
    setContext({ text })
    return h("div", {}, children)
  }
  const Title = (props, children, context) => h("h1", {}, context.text)

  expect(
    renderTree(h(Config, { text: "hello" }, h(Title, {}, "world")))
  ).toEqual({
    tag: "div",
    props: {},
    children: [
      {
        tag: "h1",
        props: {},
        children: ["hello"]
      }
    ]
  })
})

test("component with nested context", () => {
  const Config = ({ text }, children, context, setContext) => {
    setContext({ text })
    return h("div", {}, children)
  }
  const Title = (props, children, context) => h("h1", {}, context.text)

  expect(
    renderTree(
      h(
        Config,
        { text: "hello" },
        h(Config, { text: 1 }, h(Title, {}, "world"))
      )
    )
  ).toEqual({
    tag: "div",
    props: {},
    children: [
      {
        tag: "div",
        props: {},
        children: [
          {
            tag: "h1",
            props: {},
            children: ["1"]
          }
        ]
      }
    ]
  })
})
