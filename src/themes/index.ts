// theme.js
import { extendTheme } from "@chakra-ui/react"

// Global style overrides
import styles from "./styles"

// Foundational style overrides
import borders from "./foundations/borders"

// Component style overrides
import Button from "./components/button"

const colors = {
  primary: '#000',
  secondary:{

  },
  background:{
    light:'white',
    dark:'black'
  },
  border:{
    light:'gray',
    dark:'gray'
  },
  text:{
    light:'black',
    dark:'white'
  }

}

const overrides = {
  colors,
  // colorMode config
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
  styles,
  borders,
  // Other foundational style overrides go here
  components: {
    Button,
    // Other components go here
  },
}

export default extendTheme(overrides)