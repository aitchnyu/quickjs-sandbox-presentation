// function is not logged here
log('someGlobal', someGlobal)
// function is logged here
log('keys of someGlobal', Object.keys(someGlobal))
log(someGlobal.someFunction())

// Circular objects arent serialized properly to host
const a = {}
a.a = 1
// a.b = a
log('a is', a)

// Infinity is not serialized
log('1/0 is', 1/0, String(1/0))