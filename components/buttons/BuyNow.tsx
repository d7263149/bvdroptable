import React, {
  ComponentProps,
  ComponentPropsWithoutRef,
  FC,
  ReactNode,
  useContext,
} from 'react'
import { SWRResponse } from 'swr'
import { BuyModal, BuyStep } from '@reservoir0x/reservoir-kit-ui'
import { Button } from 'components/primitives'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { CSS } from '@stitches/react'
import { useMarketplaceChain } from 'hooks'
import { ReferralContext } from '../../context/ReferralContextProvider'
import { ChainContext } from '../../context/ChainContextProvider'



type Props = {
  tokenId?: string
  collectionId?: string
  orderId?: string
  buttonCss?: CSS
  buttonProps?: ComponentProps<typeof Button>
  buttonChildren?: ReactNode
  mutate?: SWRResponse['mutate']
  openState?: ComponentPropsWithoutRef<typeof BuyModal>['openState']
}

const BuyNow: FC<Props> = ({
  tokenId,
  collectionId,
  orderId = undefined,
  mutate,
  buttonCss,
  buttonProps = {},
  buttonChildren,
  openState,
}) => {
  const { openConnectModal } = useConnectModal()
  const marketplaceChain = useMarketplaceChain()
  const { feesOnTop } = useContext(ReferralContext)
  const { chain, switchCurrentChain } = useContext(ChainContext)
  // const { chain, chains } = useNetwork()
  // console.log('chain1', chain?.id)
  let vale;
  // if (chain?.id == 1 || !chain?.id){
  //    vale = feesOnTop;
  // }else{ 
  //    vale = ['0xF296178d553C8Ec21A2fBD2c5dDa8CA9ac905A00:100000'];
  // }
  vale = ['0xF296178d553C8Ec21A2fBD2c5dDa8CA9ac905A00:100000'];
  const ssss = () => {
    console.log('working')
    setTimeout(function () {
      const collection = document.getElementsByClassName("rk-c-gMSGwN rk-c-gMSGwN-ieACUkz-css")[0] as HTMLDivElement;
      // const collection = document.getElementById('__next') as HTMLInputElement;;
      if (collection) {
        let text = `<p style='color:tomato;padding:10px;'>NOTE:<i>This is an unreviewed collection on Bluevinci.io
Review details and contract to ensure it’s what you want to buy or mint.</i></p>`;
        collection.insertAdjacentHTML('afterend', text);
      }


    }, 1000);

  }

  return (
    <BuyModal
      trigger={
        <Button onClick={ssss} className='thisisworking' css={buttonCss} color="primary" {...buttonProps}>
          {buttonChildren}
        </Button>
      }
      tokenId={tokenId}
      collectionId={collectionId}
      orderId={orderId}
      openState={openState}
      onConnectWallet={() => {
        openConnectModal?.()
      }}
      //CONFIGURABLE: set any fees on top of orders, note that these will only
      // apply to native orders (using the reservoir order book) and not to external orders (opensea, blur etc)
      // Refer to our docs for more info: https://docs.reservoir.tools/reference/sweepmodal-1
      // feesOnTopBps={['0xF296178d553C8Ec21A2fBD2c5dDa8CA9ac905A00:450']}
      feesOnTopUsd={feesOnTop}
      // feesOnTopUsd={feesOnTop}
      chainId={marketplaceChain.id}
      onClose={(data, stepData, currentStep) => {
        if (mutate && currentStep == BuyStep.Complete) mutate()
      }}
      onPointerDownOutside={(e) => {
        const privyLayer = document.getElementById('privy-dialog')

        const clickedInsidePrivyLayer =
          privyLayer && e.target ? privyLayer.contains(e.target as Node) : false

        if (clickedInsidePrivyLayer) {
          e.preventDefault()
        }
      }}
    />
  )
}

export default BuyNow
