import React, {
  ComponentProps,
  ComponentPropsWithoutRef,
  FC,
  ReactNode,
  useContext,
  useEffect,
} from 'react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { MintStep, MintModal } from '@reservoir0x/reservoir-kit-ui'
import { useMarketplaceChain } from 'hooks'
import { CSS } from '@stitches/react'
import { Button } from 'components/primitives'
import { SWRResponse } from 'swr'
import { ReferralContext } from 'context/ReferralContextProvider'

type Props = {
  collectionId?: string
  tokenId?: string
  buttonCss?: CSS
  buttonProps?: ComponentProps<typeof Button>
  buttonChildren?: ReactNode
  mutate?: SWRResponse['mutate']
  openState?: ComponentPropsWithoutRef<typeof MintModal>['openState'],
  className?: string
}

const Mint: FC<Props> = ({
  collectionId,
  tokenId,
  buttonCss,
  buttonProps,
  buttonChildren,
  mutate,
  openState,
  className

}) => {
  const { openConnectModal } = useConnectModal()
  const marketplaceChain = useMarketplaceChain()
  const { feesOnTop } = useContext(ReferralContext)
  const contract = collectionId?.split(':')?.[0]
  const token = tokenId ? `${contract}:${tokenId}` : undefined






  useEffect(() => {
    // const first = document.getElementById('first') as HTMLInputElement;
    // const value = first?.value;
    // console.log(value)


    // const body1 = document.getElementById('radix-:ri:') as HTMLDivElement
    // body1.innerHTML = 'working';
    const collection = document.getElementsByClassName("rk-c-kfNQbY rk-c-kfNQbY-fjBEy-color-base rk-c-kfNQbY-fAVWxF-style-h6 rk-c-kfNQbY-faSkLj-ellipsify-true")[0] as HTMLDivElement;
    // const collection = document.getElementById('__next') as HTMLInputElement;;
    if (collection) {
      let text = `<p>This is an unreviewed collection on Bluevinci.io
Review details and contract to ensure it’s what you want to buy or mint.</p>`;
      // collection.insertAdjacentHTML('afterend', text);
    }


  }, [])

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
    <MintModal
      trigger={
        <Button onClick={ssss} className='thisisworking' css={buttonCss} color="primary" {...buttonProps}>
          {buttonChildren}
        </Button>
      }

      collectionId={collectionId}
      token={token}
      openState={openState}
      feesOnTopUsd={feesOnTop}
      chainId={marketplaceChain.id}
      onConnectWallet={() => {
        openConnectModal?.()
      }}
      onClose={(data, currentStep) => {
        if (mutate && currentStep == MintStep.Complete) mutate()
      }}
    />
  )
}

export default Mint