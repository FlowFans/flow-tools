import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  ChakraProvider,
  Box,
} from "@chakra-ui/react"
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import '../config'
import theme from '../themes'
import {useCurrentTheme} from '../hooks/useCurrentTheme'

import Header from '../components/Header'
import Footer from '../components/Footer'

import Home from './home'
// import Wallet from './wallet'
// import Config from './config'
import FungibleTokens from './fungibleTokens'
import FungibleTokenDetail from './fungibleTokenDetail'
import FungibleTokenIssue from './fungibleTokenIssue'
import FungibleTokenQuery from './fungibleTokenQuery'
import Account from './account'

export const App = () => {

  const [currTheme] = useCurrentTheme()
  const color = `text.${currTheme}`
  const background = `background.${currTheme}`
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
              <Route exact strict path="/ft/issue" component={FungibleTokenIssue} />
              <Route exact strict path="/ft/query" component={FungibleTokenQuery} />
              <Route exact strict path="/ft/:contractAddress/:contractName" component={FungibleTokenDetail} />
              <Route exact strict  component={Home} />
        </Switch>
        <Footer />
      </Box>
    </ChakraProvider>
  </Suspense>
)}
