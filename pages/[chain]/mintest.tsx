import { NextPage } from 'next'
import { Text, Flex, Box } from 'components/primitives'
import Layout from 'components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { getClient, Execute } from "@reservoir0x/reservoir-sdk";
import { createWalletClient, http } from 'viem'
const IndexPage: NextPage = () => {

   


    const address = "0x075DaB923F83b41D4E66213bc0C8946fAb9aA122"
   const  wallet = createWalletClient({
        account: address,
       transport: http('https://polygon.llamarpc.com')
    })


    getClient()?.actions.mintToken({
        items: [{ token: "0xca5917db56191bb8dbfc9ab07d86c7c0fe1b39e5:1", quantity: 1 }],
        wallet,
        onProgress: (steps: Execute['steps']) => {
            console.log(steps)
        },
        options: {
            // feesOnTopUsd={ ['0x29ED29d41da22e799A14fdb7F458efAC03512300:100000']}
        }
    })



    return (
        <Layout>
            <Flex
                direction="column"
                align="center"
                css={{ py: '200px', px: '$3', textAlign: 'center' }}
            >
                <Box css={{ color: '$gray11', mb: '30px' }}>
                    <FontAwesomeIcon icon={faFolderOpen} size="2xl" />
                </Box>
                <Text style="body1" color="subtle" css={{ mb: '$1' }}>
                    minttest.
                </Text>
                <Text style="body1" color="subtle">
                    The requested URL was not found on the server.
                </Text>
            </Flex>
        </Layout>
    )
}

export default IndexPage
