import test from 'ava'
import {assign} from '../src'

test(`replace object | 1st degree`, t => {
  const replaced = assign({
      a: 'a'
    }, {
      a: 'b'
    }, undefined, 'replace')
  t.true(replaced.a == 'b')
})

test(`replace and extend object | 3rd degree`, t => {
  const replaced = assign({
      a: { a: { 
        a: 'a',
        b: 'b'
      } },
      c: 'c'
    }, {
      a: { a: { a: 'b' } },
      b: 'b'
    }, undefined, 'replace')
  t.true(replaced.a.a.a == 'b', 'assignes new value')
  t.true(replaced.a.a.b == 'b', 'keeps previously assigned value')
  t.true(replaced.b == 'b')
  t.true(replaced.c == 'c')
})

test(`don't replace object | 1st degree`, t => {
  const replaced = assign({
      a: 'a'
    }, {
      b: 'b'
    }, undefined, 'replace')

  t.true(replaced.a == 'a')
  t.true(replaced.b == 'b')
})

test(`append object | 2nd degree`, t => {
  const replaced = assign({
      a: { aIn: 'a' }
    }, {
      a: { bIn: 'b' }
    }, undefined, 'append')

  t.true(replaced.a.aIn == 'a')
  t.true(replaced.a.bIn == 'b')
})

test(`append object | 3rd degree`, t => {
  const replaced = assign({
      a: { aIn: { aInIn: 'a' } }
    }, {
      a: { aIn: { bInIn: 'b' } }
    }, undefined, 'append')

  t.true(replaced.a.aIn.aInIn == 'a')
  t.true(replaced.a.aIn.bInIn == 'b')
})

test(`append array | 3rd degree`, t => {
  const replaced = assign({
      a: { aIn: { aInIn: ['a'] } }
    }, {
      a: { aIn: { aInIn: ['b'] } }
    }, undefined, 'append')
  
  t.true(replaced.a.aIn.aInIn[0] == 'a')
  t.true(replaced.a.aIn.aInIn[1] == 'b')
})

test(`prepend array | 3rd degree`, t => {
  const replaced = assign({
      a: { aIn: { aInIn: ['a'] } }
    }, {
      a: { aIn: { aInIn: ['b'] } }
    }, undefined, 'prepend')
  
  t.true(replaced.a.aIn.aInIn[0] == 'b')
  t.true(replaced.a.aIn.aInIn[1] == 'a')
})

test(`string replace | 1st degree`, t => {
  const replaced = assign({
      a: 'before'
    }, {
      a: 'after'
    }, undefined, 'replace')
  
  t.true(replaced.a == 'after')
})

test(`prepend combinations | multiple degrees`, t => {
  const replaced = assign({
      obj: { aIn: { aInIn: ['a'], bInIn: 'oldField' } },
      arr: ['a']
    }, {
      obj: { aIn: { aInIn: ['b'], bInIn: 'newField' } },
      arr: ['b']
    }, undefined, 'prepend')
  
  t.true(replaced.obj.aIn.aInIn.length == 2)
  t.true(replaced.obj.aIn.aInIn[0] == 'b')
  t.true(replaced.obj.aIn.aInIn[1] == 'a')
  t.true(replaced.obj.aIn.bInIn == 'newField', 'change non-object/non-array objects with prepend/append')
  t.true(replaced.arr.length == 2)
  t.true(replaced.arr[0] == 'b')
  t.true(replaced.arr[1] == 'a')
})