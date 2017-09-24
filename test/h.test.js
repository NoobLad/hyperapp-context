import { h } from "../src/h"

test("empty node", () => {
  expect(h("div")).toEqual({
    tag: "div",
    props: {},
    children: []
  })
})

test("simple props", () => {
  expect(h("div", { className: "hello" })).toEqual({
    tag: "div",
    props: { className: "hello" },
    children: []
  })
})

test("nesting", () => {
  const tree = h(
    "div",
    {},
    h("h1", {}, "hello"),
    h("p", { className: "message" }, "world")
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

  expect(h(Title, { text: "hello" }, "world")).toEqual({
    tag: Title,
    props: { text: "hello" },
    children: ["world"]
  })
})
