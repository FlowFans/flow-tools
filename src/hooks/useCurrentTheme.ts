import {atom, useRecoilState, SetterOrUpdater} from "recoil"
export const currentTheme = atom({
  key: "CURRENT_THEME",
  default: 'dark'
})


export function useCurrentTheme():[string, SetterOrUpdater<string>] {
  const [theme, setCurrentTheme] = useRecoilState(currentTheme)
  return [theme,setCurrentTheme]
}
