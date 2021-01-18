import * as React from "react"
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa"
import { useCurrentTheme } from '../../hooks/useCurrentTheme'


type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode()
  const [_, setCurrentTheme] = useCurrentTheme()
  const theme = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  const toggleTheme = () => {
    toggleColorMode()
    setCurrentTheme(theme)
  }

  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleTheme}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${theme}`}
      {...props}
    />
  )
}
