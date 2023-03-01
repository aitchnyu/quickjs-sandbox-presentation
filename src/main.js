import { newAsyncContext } from "quickjs-emscripten"
import { readFileSync } from 'fs'
import fetch from 'node-fetch';

class VmWrapper {
  vm = null;
  handle = null;

  async init() {
    if (this.vm) {
      return
    }

    this.vm = await newAsyncContext()

    // Building a global object
    const someFunctionHandle = this.vm.newFunction("someFunction", () => {
      console.log("someFunction was called!")
    })
    // {someFunction: {}, someNumber: 42, someString: ""}
    const someStringHandle = this.vm.newString("someString")
    const someNumberHandle = this.vm.newNumber(42)
    const someGlobalHandle = this.vm.newObject()
    this.vm.setProp(someGlobalHandle, "someFunction", someFunctionHandle)
    this.vm.setProp(someGlobalHandle, "someString", someStringHandle)
    this.vm.setProp(someGlobalHandle, "someNumber", someNumberHandle)
    this.vm.setProp(this.vm.global, "someGlobal", someGlobalHandle)
    someFunctionHandle.dispose()
    someGlobalHandle.dispose()

    // Adding hostLog function to scripts
    const hostLogHandle = this.vm.newFunction("hostLog", (lineNoHandle, valueHandle) => {
      const lineNo = this.vm.dump(lineNoHandle)
      const value = this.vm.dump(valueHandle)
      console.log('Log from vm at line', lineNo, ...value)
    })
    this.vm.setProp(this.vm.global, "hostLog", hostLogHandle)
    hostLogHandle.dispose()
    
    // Adding hostFetchJson function to scripts, async in host side, sync in script
    const hostFetchJsonHandle = this.vm.newAsyncifiedFunction("hostFetchJson", async (pathHandle) => {
      const path = this.vm.dump(pathHandle)
      console.log('fetching for', path)
      const response = await (await fetch(path)).text();
      // console.log('response text', response)
      return this.vm.newString(response)
    })
    this.vm.setProp(this.vm.global, "hostFetchJson", hostFetchJsonHandle)
    hostFetchJsonHandle.dispose()


    const result = await this.vm.evalCodeAsync(readFileSync('src/scripts/lib.js', 'utf8'), "lib.js")
    // In case there is an error with parsing lib.js
    if (result.error) {
      const out = this.vm.dump(result.error)
      result.error.dispose()
      console.log("VM reports error", out)
      throw out
    }
  }

  async evalCode(code, filename) {
    await this.init()

    const result = await this.vm.evalCodeAsync(code, filename)
    if (result.error) {
      const out = this.vm.dump(result.error)
      result.error.dispose()
      console.log("VM reports error", out)
      return { error: out }
    } else {
      const out = this.vm.dump(result.value)
      result.value.dispose()
      return { result: out }
    }
  }

  dispose() {
    this.vm.dispose()
  }
}

async function runScript(script) {
  const vm = new VmWrapper()
  const result = await vm.evalCode(readFileSync(script, 'utf8'), 'ours.js')
  console.log(result)
  vm.dispose()
}

async function demo1() {
  runScript('src/scripts/demo1.js')
}

async function demo2() {
  runScript('src/scripts/demo2.js')
}
async function demo3() {
  runScript('src/scripts/demo3.js')
}

function main() {
  const demos = { demo1, demo2, demo3 }
  demos[process.argv[2]]()
}

main()