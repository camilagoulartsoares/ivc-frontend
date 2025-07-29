import "@testing-library/jest-dom"
import "whatwg-fetch"
import { TextEncoder, TextDecoder } from "util"
import { TransformStream } from "web-streams-polyfill/ponyfill/es6"

global.TextEncoder = TextEncoder as typeof global.TextEncoder
global.TextDecoder = TextDecoder as typeof global.TextDecoder
global.TransformStream = TransformStream

global.BroadcastChannel = class {
  constructor() {}
  postMessage() {}
  close() {}
  onmessage() {}
} as any
