import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

configure({
  adapter: new Adapter()
})

// Local storage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
}

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true
})

interface CustomEnv extends NodeJS.ProcessEnv {
  REACT_APP_API_ROOT: string
}

process.env = {
  REACT_APP_API_ROOT: "https://get.geojs.io/v1/ip/country.json"
} as CustomEnv
