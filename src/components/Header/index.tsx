import React, {useEffect, FC} from "react";
import * as fcl from "@onflow/fcl"

import { Box, Flex, Spacer, Button } from "@chakra-ui/react";
import { useThemeManager, useUserInfo } from "../../state/user/hooks";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import {userInfo as User} from '../../constants/types'
type HeaderProps = {};

interface SignInOutButtonProps {
  user: User;
}

const Header = (props: HeaderProps) => {
  const [theme] = useThemeManager()
  const [userInfo, setUserInfo] = useUserInfo()

  const SignInOutButton : FC<SignInOutButtonProps> = ({ user: { loggedIn } }) => {
    const signInOrOut = async (event: any) => {
      event.preventDefault()
  
      if (loggedIn) {
        fcl.unauthenticate()
      } else {
        fcl.authenticate()
      }
    }
  
    return (
      <Button onClick={signInOrOut}>
        {loggedIn ? 'Sign Out' : 'Sign In/Up'}
      </Button>
    )
  }

  useEffect(() =>
    fcl
      .currentUser()
      .subscribe((user: any) => setUserInfo({...user}))
  , [])


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