import React, { useState, useEffect } from "react"

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
import {ExternalLinkIcon} from '@chakra-ui/icons'
import { Formik } from "formik"
import {
	InputControl,
	NumberInputControl,
	SubmitButton
} from "formik-chakra-ui"
import * as Yup from "yup";

import { SubmitFuncType } from '../../constants/types'
import { transferToken } from '../../flow/fungibleToken'
import { toast } from '../../utils'


type TransferModalProps = {
	contractAddress: string
	contractName: string
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
	cb?: () => any
}

interface FormValues {
	amount: number
	recipient?: string
}

const TransferFTModal = (props: TransferModalProps) => {

	const { isOpen, onClose, contractAddress, contractName, cb } = props
	const initialValues: FormValues = { amount: 0, recipient: '' }
	// init account token balance
	const [balance, setBalance] = useState(0)


	const validationSchema = Yup.object({
		amount: Yup.number().required().positive().test('Self address check',
			'Balance not enough..',
			async value => {
				const balance = cb ? await cb() : 0
				return Number(value) <= balance
			}),
		recipient: Yup.string().required().length(18).test('Self address check',
			'Dont send token to your self..',
			value => {
				return value !== contractAddress
			})
	})



	useEffect(() => {
		const queryBalance = async () => {
			if (!cb) return
			const res = await cb()
			setBalance(res)
		}

		queryBalance()
	}, [])

	const onSubmit: SubmitFuncType = async (values, actions) => {
		const { amount, recipient } = values



		actions.setSubmitting(true)


		const onSuccess = (status: any, txLink: string) => {
			toast({
				title: `Token transfer success`,
				desc: (<Text>{contractName}  mint in <Link  href={txLink} isExternal>Tx<ExternalLinkIcon mx="2px" /></Link></Text>)
			})
			cb && cb()
			onClose()

		}

		const onError = (error: any) => {
			toast({
				title: 'Token transfer error',
				desc: 'trx error',
				status: 'error'
			})
			onClose()
		}

		const res = await transferToken(contractAddress, contractName, Number(amount), recipient, { onSuccess, onError })

		console.log(res, '==== transfer submit')
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
				<ModalHeader>Send {contractAddress}.{contractName}</ModalHeader>
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
								<NumberInputControl name="amount" label={`Send amount(${balance}  ${contractName})`} />

								<InputControl name="recipient" label="Recipient address" />
								<ButtonGroup>
									<SubmitButton mt={0} colorScheme="blue">Send</SubmitButton>
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

export default TransferFTModal