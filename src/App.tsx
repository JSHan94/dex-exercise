import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import Swap from "./components/Swap";

import "@fontsource/inter";
import "./global.css";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { Layout, Row, Col } from "antd";


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Row align="middle" style={{paddingTop: "50px"}}>
          <Col span={10} offset={2}/>
          <Col span={12} style={{ textAlign: "right", paddingRight: "200px" }}>
            <WalletSelector/>
          </Col>
          <Swap />
        </Row>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
