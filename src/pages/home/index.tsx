import React, { useCallback, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Flex, Box, Divider } from "@chakra-ui/react"
import Cont from "../../components/Container"
import { toast } from "../../utils"

export default function Home() {
  const history = useHistory()
  return (
    <Cont>
      <Flex>
        <Box
          bgColor='teal.300'
          w='48%'
          borderRadius="md"
          mr={4}
          h={16}
          p={4}
          color='white'
          onClick={() => history.push("/ft")}
        >
          Fungible Token
      </Box>
        <Box
          bgColor='blue.300'
          w='48%'
          borderRadius="md"
          h={16}
          p={4}
          color='white'
          onClick={() =>
            toast({
              title: "Tip",
              desc: "Comming soon",
            })
          }
        >
          NonFungbile Token
      </Box>
      </Flex>

    </Cont>
  )
}
