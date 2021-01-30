import React, { useState } from "react";
import _ from 'lodash'
import {useHistory} from 'react-router-dom'
import {
  Box
} from "@chakra-ui/react";
import * as Yup from "yup";

import { Formik } from "formik";
import {
  InputControl,
  SubmitButton,
  SelectControl
} from "formik-chakra-ui";
import { fetchAccount } from '../../flow/fetchFlowInfo'
import { ADDR_REGEX } from '../../constants'
import {toast} from '../../utils'

type TokenQueryFormProps = {
  type?:string
};
type FormValues = {
  contractAddress: string
  contractName: string
}

const TokenQueryForm = (props: TokenQueryFormProps) => {
  const {type = 'ft'} = props
  const history = useHistory()
  const [contracts, setContracts] = useState([''])
  const [state, setstate] = useState()

  const initialValues: FormValues = { contractName: '', contractAddress: '' };

  const validationSchema = Yup.object({
    contractAddress: Yup.string().length(18).required().matches(ADDR_REGEX, 'Address is invalid'),
    contractName: Yup.string().required(),
  })

  const queryContract = async (addr: string) => {
    console.log(addr)
    addr = addr.trim()
    if (addr.length !== 18) return
    if (addr.indexOf('0x') !== 0) return
    try {
      const account = await fetchAccount(addr)
      const { contracts } = account
      const keys = Object.keys(contracts)
      setContracts(keys)
    } catch (e) {
      console.error(e)  
      toast({
        title: 'error',
        desc:`Address ${addr} can not founded`,
        status: 'error'
      })
      setContracts([''])
    }
  }

  const onAddrInput = async (e: any) => {
    const query = _.debounce(() => queryContract(e.target.value), 2000)
    await query()
  }

  return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          // onSubmit(values, actions)
          // console.log(values, '=====')
          const {contractAddress, contractName} = values

          history.push(`/${type}/${contractAddress}/${contractName}`)
          actions.setSubmitting(false)
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, values, errors }) => (
          <Box
            borderWidth="1px"
            rounded="lg"
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
            minW="200px"
            p={6}
            m="10px auto"
            as="form"
            onSubmit={handleSubmit as any}
          >

            <InputControl name="contractAddress" label="Contract Address" onChange={e => onAddrInput(e)} />
            {/* <InputControl name="contractName" label="Contract Name" /> */}
            <SelectControl
              name="contractName"
              selectProps={{ placeholder: "Select contract" }}
            >
              {
                contracts.map((contract, idx) => <option key={idx} value={contract}>{contract}</option>)
              }
            </SelectControl>
            <SubmitButton>Search</SubmitButton>
          </Box>
        )}
      </Formik>
  );
};

export default TokenQueryForm