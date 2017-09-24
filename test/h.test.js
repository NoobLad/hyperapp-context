import { h } from "../src/h"

test("empty node", () => {
  expect(h("div")).toEqual({
    tag: "div",
    data: {},
    children: []
  })
})

test("simple props", () => {
  expect(h("div", { className: "hello" })).toEqual({
    tag: "div",
    data: { className: "hello" },
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
    data: {},
    children: [
      {
        tag: "h1",
        data: {},
        children: ["hello"]
      },
      {
        tag: "p",
        data: {
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
    data: { text: "hello" },
    children: ["world"]
  })
})
