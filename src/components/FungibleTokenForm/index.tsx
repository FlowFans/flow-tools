import * as React from "react";
import {
    Box
} from "@chakra-ui/react";
import * as Yup from "yup";

import { Formik } from "formik";
import {
    InputControl,
    SubmitButton
  } from "formik-chakra-ui";
import {SubmitFunc} from '../../constants/types'

interface FormProps {
    onSubmit:SubmitFunc
}

interface FormValues {
  contractName: string;
}

const FungibleTokenForm = ({onSubmit}:FormProps) => {
  const initialValues: FormValues = { contractName: "" };

  const validationSchema = Yup.object({
    contractName: Yup.string().required(),
  });

  return (
    <>
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
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
            maxWidth={'sm'}
            p={6}
            m="10px auto"
            as="form"
            onSubmit={handleSubmit as any}
          >
            <InputControl name="contractName" label="Contract Name" />
            <SubmitButton>Submit</SubmitButton>
              </Box>
        )}
      </Formik>
    </>
  );
};

export default FungibleTokenForm;
