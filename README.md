# Quickjs Presentation

### Scripts in Hoppscotch

https://docs.hoppscotch.io/quickstart/scripts

https://docs.hoppscotch.io/quickstart/tests

https://github.com/hoppscotch/hoppscotch/discussions/2292

### Some code

https://github.com/hoppscotch/hoppscotch/blob/main/packages/hoppscotch-js-sandbox/src/preRequest.ts

https://github.com/hoppscotch/hoppscotch/blob/main/packages/hoppscotch-js-sandbox/src/test-runner.ts

https://github.com/hoppscotch/hoppscotch/blob/main/packages/hoppscotch-js-sandbox/src/__tests__/testing/expect/toBe.spec.ts

## What is Quickjs?
https://bellard.org/quickjs/

```
 QuickJS is a small and embeddable Javascript engine. It supports the ES2020 specification including modules, asynchronous generators, proxies and BigInt. 
 ...
    Small and easily embeddable: just a few C files, no external dependency, 210 KiB of x86 code for a simple hello world program.
    Fast interpreter with very low startup time: runs the 75000 tests of the ECMAScript Test Suite in about 100 seconds on a single core of a desktop PC. The complete life cycle of a runtime instance completes in less than 300 microseconds.
    Almost complete ES2020 support including modules, asynchronous generators and full Annex B support (legacy web compatibility).
    Passes nearly 100% of the ECMAScript Test Suite tests when selecting the ES2020 features. A summary is available at Test262 Report.
    Can compile Javascript sources to executables with no external dependency.
    Garbage collection using reference counting (to reduce memory usage and have deterministic behavior) with cycle removal.
    Mathematical extensions: BigDecimal, BigFloat, operator overloading, bigint mode, math mode.
    Command line interpreter with contextual colorization implemented in Javascript.
    Small built-in standard library with C library wrappers.
```

## quickjs-emscripten for web apps
https://github.com/justjake/quickjs-emscripten

Safely execute untrusted Javascript in your Javascript, and execute synchronous code that uses async functions 

```
Javascript/Typescript bindings for QuickJS, a modern Javascript interpreter, compiled to WebAssembly.

    Safely evaluate untrusted Javascript (up to ES2020).
    Create and manipulate values inside the QuickJS runtime.
    Expose host functions to the QuickJS runtime.
    Execute synchronous code that uses asynchronous functions, with asyncify.
```

## Bun
https://bun.sh/

```
Bun is a modern JavaScript runtime like Node or Deno. It was built from scratch to focus on three main things:

    Start fast (it has the edge in mind).
    New levels of performance (extending JavaScriptCore, the engine).
    Being a great and complete tool (bundler, transpiler, package manager).

Bun is designed as a drop-in replacement for your current JavaScript & TypeScript apps or scripts — on your local computer, server or on the edge. Bun natively implements hundreds of Node.js and Web APIs, including ~90% of Node-API functions (native modules), fs, path, Buffer and more.
```

- Implements fetch, websocket
- Implements npm
- typescript
- Top level await
- Web crypto support

```
await write(
  stdout,
  file(path),
);

```

Quickjs wont support top level await: https://github.com/bellard/quickjs/issues/52

Web crypto: https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API

## Codemirror and  Tern 
https://codemirror.net/ Text editor for web

https://ternjs.net/
Tern is a stand-alone code-analysis engine for JavaScript. It is intended to be used with a code editor plugin to enhance the editor's support for intelligent JavaScript editing. Features provided are:

Grammers defined at:

https://github.com/hoppscotch/hoppscotch/blob/main/packages/hoppscotch-common/src/helpers/tern.js
https://github.com/hoppscotch/hoppscotch/blob/main/packages/hoppscotch-common/src/helpers/terndoc/pw-test.json
