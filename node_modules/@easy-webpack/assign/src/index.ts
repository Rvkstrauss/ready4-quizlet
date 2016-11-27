export function assign(current, addition, property: string = 'config', style: 'append' | 'prepend' | 'replace' = 'replace') {
  if (addition === undefined) {
    return current
  }
  if (Array.isArray(current) && Array.isArray(addition)) {
    switch (style) {
      case 'append': return (current as Array<any>).concat(...addition)
      case 'prepend': return (addition as Array<any>).concat(...current)
      default: return addition.slice()
    }
  }
  else if (Array.isArray(addition)) {
    return addition.slice()
  }
  else if (typeof addition === 'object' && (addition.constructor.name === 'Object' || !addition.constructor.name)) {
    if (typeof current !== 'object' || addition['_literalReplace']) {
      if (addition['_literalReplace'])
        delete addition['_literalReplace']
      current = {}
    }
    else
      current = Object.assign({}, current)

    for (let subProperty of Object.getOwnPropertyNames(addition)) {
      current[subProperty] = assign(current[subProperty], addition[subProperty], `${property}.${subProperty}`, style)
    }
    return current
  }
  return addition
}

export function literalReplace<T>(object: T): T {
  object['_literalReplace'] = true
  return object
}

export default assign
