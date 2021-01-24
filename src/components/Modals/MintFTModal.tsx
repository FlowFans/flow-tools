import React, { useState } from "react"

import {
  Box, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ButtonGroup,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Link
} from "@chakra-ui/react"


import { ExternalLinkIcon } from '@chakra-ui/icons'

import { Formik } from "formik"
import {
  InputControl,
  NumberInputControl,
  SubmitButton
} from "formik-chakra-ui"
import * as Yup from "yup";

import { SubmitFuncType } from '../../constants/types'
import { mintToken } from '../../flow/fungibleToken'
import { toast } from '../../utils'

type MintModalProps = {
  contractAddress: string
  contractName: string
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  cb?: () => void
}

interface FormValues {
  amount: number
  recipient?: string
}

const MintFTModal = (props: MintModalProps) => {

  const { isOpen, onClose, contractAddress, contractName, cb = () => { } } = props
  const initialValues: FormValues = { amount: 0, recipient: contractAddress }

  const validationSchema = Yup.object({
    amount: Yup.number().required().positive(),
    recipient: Yup.string().required().length(18)
  })
  const [txInfo, setTx] = useState()
  const [error, setError] = useState()




  const onSubmit: SubmitFuncType = async (values, actions) => {
    actions.setSubmitting(true)
    const { amount, recipient } = values

    const onSuccess = (status: any, txLink: string) => {
      toast({
        title: `Token mint success`,
        // desc: `${contractName} mint in Tx ${txId}`
        desc: (<Text>{contractName}  mint in <Link href={txLink} isExternal>tx<ExternalLinkIcon mx="2px" /></Link></Text>)
      })
      cb()
      onClose()

    }

    const onError = (error: any) => {
      setError(error)
      toast({
        title: 'Token mint error',
        desc: 'trx error',
        status: 'error'
      })
      onClose()
    }

    const res = await mintToken(contractAddress, contractName, Number(amount), recipient, { onSuccess, onError })

    console.log(res, '==== mint submit')
    actions.setSubmitting(false)
    actions.resetForm()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Mint {contractAddress}.{contractName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {/* <FormControl>
            <FormLabel>Amount</FormLabel>
            <Input type='number' placeholder="Mint amount" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Recipient</FormLabel>
            <Input placeholder="Could be null as your own address" />
          </FormControl> */}

          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              onSubmit(values, actions)
            }}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, values, errors }) => (
              <Box
                borderWidth="1px"
                rounded="lg"
                maxWidth={'sm'}
                p={6}
                m="10px auto"
                as="form"
                onSubmit={handleSubmit as any}
              >
                <NumberInputControl name="amount" label="Mint amount" />
                <InputControl name="recipient" label="Recipient address" />
                <ButtonGroup>
                  <SubmitButton mt={0} colorScheme="blue">Mint</SubmitButton>
                  <Button onClick={onClose}>Cancel</Button>
                </ButtonGroup>
              </Box>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default MintFTModal