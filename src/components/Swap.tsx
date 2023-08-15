import {
  Flex,
  Box,
  Image,
  Text,
  Button,
  Input
} from "@chakra-ui/react";
import { SettingsIcon, ChevronDownIcon } from '@chakra-ui/icons'
import etherLogo from '../assets/etherLogo.png'
import { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Provider, Network } from "aptos"

export default function Swap() {
  const [inputValue, setInputValue] = useState('');
  const { account, signAndSubmitTransaction } = useWallet();
  
  const handleChange = (e: any) => {
    setInputValue(e.target.value)
    console.log(inputValue)
  }

  async function swap() {
    const provider: Provider = new Provider(Network.DEVNET)
    const moduleAdress = '0x8699fedf3dba3ebc43459bb4557dac8e283bb99014e4fdbb9ce1a05ff9a9ac16'

    // const payload = {
    //   type: "entry_function_payload",
    //   function: `${moduleAdress}::dex::create_store`,
    //   type_arguments: [],
    //   arguments: []
    // }

    // const payload = {
    //   type: "entry_function_payload",
    //   function: `${moduleAdress}::dex::create_swap`,
    //   type_arguments: [],
    //   arguments: [inputValue]
    // }

    // try{
    //   const response = await signAndSubmitTransaction(payload)
    //   await provider.waitForTransaction(response.hash)
    // } catch(error){
    //   console.log(error)
    // }
    
    // if (!account) return
    // const resource = await provider.getAccountResource(
    //   account.address,
    //   `${moduleAdress}::dex::SwapStore`
    // )

    // const balance = (resource as any).data.balance
    // setInputValue(balance)
  }

  return (
    <Box
      w="30.62rem"
      mx="auto"
      mt="5.25rem"
      boxShadow="rgb(0 0 0 / 8%) 0rem 0.37rem 0.62rem"
      borderRadius="1.37rem">
      <Flex
        alignItems="center"
        p="1rem 1.25rem 0.5rem"
        bg="white"
        color="rgb(86, 90, 105)"
        justifyContent="space-between"
        borderRadius="1.37rem 1.37rem 0 0">
        <Text
          color="black"
          fontWeight="500">
          Swap
        </Text>
        <SettingsIcon
          fontSize="1.25rem"
          cursor="pointer"
          _hover={{ color: "rgb(128,128,128)" }}
        />
      </Flex>

      <Box
        p="0.5rem"
        bg="white"
        borderRadius="0 0 1.37rem 1.37rem">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          bg="rgb(247, 248, 250)"
          p="1rem 1rem 1.7rem"
          borderRadius="1.25rem" border="0.06rem solid rgb(237, 238, 242)"
          _hover={{ border: "0.06rem solid rgb(211,211,211)" }}>
          <Box>
            <Button
              bg="white"
              borderRadius="1.12rem"
              boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
              fontWeight="500"
              mr="0.5rem"
              rightIcon={<ChevronDownIcon fontSize="1.37rem" cursor="pointer" />}>
              <Image boxSize="1.5rem"
                src={etherLogo}
                alt="Ether Logo"
                mr="0.5rem"
              />
              TOKEN
            </Button>
          </Box>
          <Box>
            <Input
              placeholder="0.0"
              fontWeight="500"
              fontSize="1.5rem"
              width="100%"
              size="19rem"
              textAlign="right"
              bg="rgb(247, 248, 250)"
              outline="none"
              border="none"
              focusBorderColor="none"
              type="number"
              onChange={handleChange}
            />
          </Box>
        </Flex>

        <Flex
          alignItems="center"
          justifyContent="space-between"
          bg="rgb(247, 248, 250)"
          pos="relative" p="1rem 1rem 1.7rem"
          borderRadius="1.25rem"
          mt="0.25rem"
          border="0.06rem solid rgb(237, 238, 242)"
          _hover={{ border: "0.06rem solid rgb(211,211,211)" }}>
          <Flex
            alignItems="center"
            justifyContent="center"
            bg="white"
            p="0.18rem"
            borderRadius="0.75rem"
            pos="relative"
            top="-2.37rem"
            left="2.5rem">
          </Flex>
          <Box>
            <Input
              placeholder="0.0"
              value={inputValue}
              fontSize="1.5rem"
              width="100%"
              size="19rem"
              textAlign="right"
              bg="rgb(247, 248, 250)"
              outline="none"
              border="none"
              focusBorderColor="none"
              type="number" 
              />
          </Box>
        </Flex>

        <Box mt="0.5rem">
          <Button
            color="rgb(213, 0, 102)"
            bg="rgb(253, 234, 241)"
            width="100%"
            p="1.62rem"
            borderRadius="1.25rem"
            _hover={{ bg: "rgb(251, 211, 225)" }}
            onClick={swap}>
            Swap
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
