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
import { Provider, Network } from "aptos"
import { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export default function Swap() {
  const { account, signAndSubmitTransaction } = useWallet();
  const [inputValue, setInputValue] = useState('');

  const provider: Provider = new Provider(Network.DEVNET);
  async function swap() {
    console.log("Swap")
    console.log("account : ", account)
    await submitData()
  }

  const submitData = async () =>{
    const moduleAddress = '0x57877313f1fcd9d913fa37125e47e38dcf1a561696b436223140fa5632ef8087'
    // const payload = {
    //   type: "entry_function_payload",
    //   function: `${moduleAddress}::dex::create_store`,
    //   type_arguments: [],
    //   arguments: []
    // }
    // const payload = {
    //   type: "entry_function_payload",
    //   function: `${moduleAddress}::dex::create_swap`,
    //   type_arguments: [],
    //   arguments: ["10"]
    // }
    // try{ 
    //   const response = await signAndSubmitTransaction(payload);
    //   await provider.waitForTransaction(response.hash);
    //   console.log(response)
    //   console.log("Transaction submitted")
    // }catch (error:any){
    //   console.log(error)
    // }

    if (!account) return
    const resource = await provider.getAccountResource(
      account?.address,
      `${moduleAddress}::dex::SwapStore`
    );
    const balance = (resource as any).data.balance;
    setInputValue(balance)
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
              type="number" />
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
