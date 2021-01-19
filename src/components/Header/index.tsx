import React, {useEffect, FC} from "react";
import * as fcl from "@onflow/fcl"

import { Box, Flex, Spacer, Button } from "@chakra-ui/react";
// import {useHistory} from "react-router-dom"

// import { useThemeManager, useUserInfo } from "../../state/user/hooks";
import { useCurrentTheme} from '../../hooks/useCurrentTheme'
import { useCurrentUser} from '../../hooks/useCurrentUser'
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import {UserInfo as User} from '../../constants/types'
type HeaderProps = {};

interface SignInOutButtonProps {
  user: User;
}

const Header = (props: HeaderProps) => {
  const [theme] = useCurrentTheme()
  const [userInfo, isLogin, tools] = useCurrentUser()
  // const history = useHistory()
  // if(isLogin) {
  //   history.push("/account/" + userInfo.addr)
  // }

  const SignInOutButton : FC<SignInOutButtonProps> = ({ user}) => {
    const signInOrOut = async (event: any) => {
      event.preventDefault()
  
      if (user.loggedIn) {
        fcl.unauthenticate()
      } else {
        fcl.authenticate()

      }
    }
  
    return (
      <Button onClick={signInOrOut}>
        {user.loggedIn ? 'Sign Out' : 'Sign In/Up'}
      </Button>
    )
  }



  return (
    <>
      <Flex borderBottom='1px' borderBottomColor={`border.${theme}`} >
        <Box p='4'>
          logo
        </Box>
        <Spacer />
        <Box p='4'>
          Title
        </Box>
        <Spacer />
        <Box p='4'>
          <SignInOutButton user={userInfo} />
        </Box>
        <Box p='2' >
          <ColorModeSwitcher />
        </Box>
      </Flex>
    </>
  );
};

export default Header