import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  ChakraProvider,
  Box,
  useColorMode
} from "@chakra-ui/react"
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import '../config'
import theme from '../themes'


import Header from '../components/Header'
import Footer from '../components/Footer'

import Home from './home'
// import Wallet from './wallet'
// import Config from './config'
import FungibleTokens from './fungibleTokens'
import NonFungibleTokens from './nonFungibleTokens'
import FungibleTokenDetail from './fungibleTokenDetail'
import NonFungibleTokenDetail from './nonFungibleTokenDetail'
import FungibleTokenIssue from './fungibleTokenIssue'
import NonFungibleTokenIssue from './nonFungibleTokenIssue'
import FungibleTokenQuery from './fungibleTokenQuery'
import NonFungibleTokenQuery from './nonFungibleTokenQuery'
import Account from './account'
import CreateAccount from './createAccount'

export const App = () => {

  const { colorMode } = useColorMode()
  const color = `text.${colorMode}`
  const background = `background.${colorMode}`
  return (
    <Suspense fallback={null}>
      <Route component={GoogleAnalyticsReporter} />
      <ChakraProvider theme={theme}>
        <Box bg={background} w="100%" minH="100vh" color={color}>
          <Header />
          <Switch>
            {/* <Route exact strict path="/wallet" component={Wallet} /> */}
            {/* <Route exact strict path="/config" component={Config} /> */}
            <Route exact strict path="/account/:address" component={Account} />
            <Route exact strict path="/ft" component={FungibleTokens} />
            <Route exact strict path="/nft" component={NonFungibleTokens} />
            <Route exact strict path="/createAccount" component={CreateAccount} />
            <Route exact strict path="/ft/issue" component={FungibleTokenIssue} />
            <Route exact strict path="/nft/issue" component={NonFungibleTokenIssue} />
            <Route exact strict path="/ft/query" component={FungibleTokenQuery} />
            <Route exact strict path="/nft/query" component={NonFungibleTokenQuery} />
            <Route exact strict path="/ft/:contractAddress/:contractName" component={FungibleTokenDetail} />
            <Route exact strict path="/nft/:contractAddress/:contractName" component={NonFungibleTokenDetail} />
            <Route exact strict component={Home} />
          </Switch>
          <Footer />
        </Box>
      </ChakraProvider>
    </Suspense>
  )
}
