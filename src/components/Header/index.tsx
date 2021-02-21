import React, { FC } from "react";
import * as fcl from "@onflow/fcl"
import {useHistory} from 'react-router-dom'

import { Box, Flex, Spacer, Button, useColorMode, Text } from "@chakra-ui/react";
// import {useHistory} from "react-router-dom"

// import { useThemeManager, useUserInfo } from "../../state/user/hooks";
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { UserInfo as User } from '../../constants/types'
type HeaderProps = {};

interface SignInOutButtonProps {
  user: User;
}

const Header = (props: HeaderProps) => {
  const { colorMode } = useColorMode()
  const [userInfo, isLogin, tools] = useCurrentUser()
  const history = useHistory()
  // if(isLogin) {
  //   history.push("/account/" + userInfo.addr)
  // }

  const SignInOutButton: FC<SignInOutButtonProps> = ({ user }) => {
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
      <Flex borderBottom='1px' borderBottomColor={`border.${colorMode}`} >
        <Box p='2'>
          <Text fontWeight={600} fontSize="2xl" onClick={()=>history.push('/')}>Flow Tools</Text>
      </Box>
        <Spacer />
        <Spacer />
        <Box p='2'>
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