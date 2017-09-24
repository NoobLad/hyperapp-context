export function h(tag, data) {
  var children = [].slice.call(arguments, 2)
  return {
    tag: tag,
    data: data || {},
    children: children
  }
}
