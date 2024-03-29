import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Button } from 'components/primitives'
import { ToastContext } from 'context/ToastContextProvider'
import { useMarketplaceChain } from 'hooks'
import { cloneElement, ComponentProps, FC, ReactNode, useContext } from 'react'
import { useAccount, useWalletClient } from 'wagmi'
import { CSS } from '@stitches/react'
import { SWRResponse } from 'swr'
import {
  EditListingModal,
  EditListingStep,
} from '@reservoir0x/reservoir-kit-ui'

type Props = {
  listingId?: string
  tokenId?: string
  collectionId?: string
  disabled?: boolean
  openState?: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  buttonCss?: CSS
  buttonProps?: ComponentProps<typeof Button>
  buttonChildren?: ReactNode
  mutate?: SWRResponse['mutate']
}

const EditListing: FC<Props> = ({
  listingId,
  tokenId,
  collectionId,
  disabled,
  openState,
  buttonCss,
  buttonProps,
  buttonChildren,
  mutate,
}) => {
  const { isDisconnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { addToast } = useContext(ToastContext)
  const marketplaceChain = useMarketplaceChain()

  const { data: signer } = useWalletClient()

  const trigger = (
    <Button css={buttonCss} disabled={disabled} {...buttonProps} color="gray3">
      {buttonChildren}
    </Button>
  )

  if (isDisconnected) {
    return cloneElement(trigger, {
      onClick: async () => {
        if (!signer) {
          openConnectModal?.()
        }
      },
    })
  } else
    return (
      <EditListingModal
        trigger={trigger}
        openState={openState}
        listingId={listingId}
        tokenId={tokenId}
        collectionId={collectionId}
        chainId={marketplaceChain.id}
        onClose={(data, currentStep) => {
          if (mutate && currentStep == EditListingStep.Complete) mutate()
        }}
        onEditListingError={(error: any) => {
          if (error?.code === 4001) {
            addToast?.({
              title: 'User canceled transaction',
              description: 'You have canceled the transaction.',
            })
            return
          }
          addToast?.({
            title: 'Could not edit listing',
            description: 'The transaction was not completed.',
          })
        }}
        onPointerDownOutside={(e) => {
          const privyLayer = document.getElementById('privy-dialog')

          const clickedInsidePrivyLayer =
            privyLayer && e.target
              ? privyLayer.contains(e.target as Node)
              : false

          if (clickedInsidePrivyLayer) {
            e.preventDefault()
          }
        }}
      />
    )
}

export default EditListing
