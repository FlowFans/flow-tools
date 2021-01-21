import * as React from "react";
import AceEditor from "react-ace";

import {
  Box,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Flex,
  useColorMode
} from "@chakra-ui/react";

import { SearchIcon } from '@chakra-ui/icons'
import { useHistory } from "react-router-dom";



import "ace-builds/src-noconflict/mode-golang"
import "ace-builds/src-noconflict/theme-solarized_dark"
import "ace-builds/src-noconflict/theme-solarized_light"

import { contractCodeType } from '../../utils'
import {colorType} from '../../constants'

type ContractsProps = {
  contracts: any;
  userAddress: string
};

const ContractsInfo = (props: ContractsProps) => {
  const { contracts = {}, userAddress } = props;
  const contractNames = Object.keys(contracts);
  
  const history = useHistory()

  return (
    <Box >
      <Accordion allowMultiple>
        {contractNames.map((name, idx) => {
          const code = contracts[name]
          const contractType:string = contractCodeType(code)
          const color = colorType[contractType]
          return (
            <AccordionItem key={idx}>
              <AccordionButton>
                <Flex flex='1' textAlign='left'>
                  <Text fontWeight="bold">{name} </Text><Badge ml={2} colorScheme={color}>{contractType}</Badge>
                </Flex>
                <Box flex='1' textAlign='right' mr={2} >
                  <SearchIcon color='teal' onClick={()=>history.push(`/ft/${userAddress}/${name}`)} />
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel p={4}>
                <ContractCode code={code} />
              </AccordionPanel>
            </AccordionItem>
          )
        }
        )}
      </Accordion>
    </Box>
  );
};

export const ContractCode = ({code = '', height='600px'})=>{
  const {colorMode} = useColorMode()
  const editorTheme = `solarized_${colorMode}`
  return (<AceEditor
  mode="golang"
  width="100%"
  height={height}
  theme={editorTheme}
  value={code}
  readOnly={true}
  fontSize={14}
  showPrintMargin={true}
  showGutter={true}
  highlightActiveLine={true}
  setOptions={{
    showLineNumbers: true,
    tabSize: 2,
  }}
/>)
}

export default ContractsInfo;
