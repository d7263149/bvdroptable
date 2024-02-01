import { useCollections, useDynamicTokens } from '@reservoir0x/reservoir-kit-ui'

import { useContractRead, erc721ABI  } from "wagmi";

import CollectionActions from 'components/collections/CollectionActions'
import TokenCard from 'components/collections/TokenCard'
import { Box, Flex, Text } from 'components/primitives'
import { useChainCurrency, useMarketplaceChain } from 'hooks'
import { useRouter } from 'next/router'
import { FC, useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { styled } from 'stitches.config'
import optimizeImage from 'utils/optimizeImage'
import titleCase from 'utils/titleCase'
import { truncateAddress } from 'utils/truncate'
import supportedChains, { DefaultChain } from 'utils/chains'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faLinkedin, faTwitter, faTelegram } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import supabase from "../../config/supabaseClient";
import { v4 as uuidv4 } from 'uuid';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi'
// import * as Form from '@radix-ui/react-form';
const StyledImage = styled('img', {})

const ItemGrid = styled(Box, {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '$4',
  '@md': {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  '@bp1500': {
    gridTemplateColumns: 'repeat(5, 1fr)',
  },
})

type Props = {
  collection?: ReturnType<typeof useCollections>['data'][0]
  collectionId?: string
  tokens: ReturnType<typeof useDynamicTokens>['data']
}

export const CollectionDetails: FC<Props> = ({
  collection,
  collectionId,
  tokens,
}) => {
  const router = useRouter()
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)
  const [isOverflowed, setIsOverflowed] = useState(false)

  const chainCurrency = useChainCurrency()

  const descriptionRef = useRef(null as any)

  const hasSecurityConfig =
    collection?.securityConfig &&
    Object.values(collection.securityConfig).some(Boolean)
  const contractKind = `${collection?.contractKind?.toUpperCase()}${
    hasSecurityConfig ? 'C' : ''
  }`

  const collectionChain =
    supportedChains.find(
      (chain) => router.query?.chain === chain.routePrefix
    ) || DefaultChain

  let creatorRoyalties = collection?.royalties?.bps
    ? collection?.royalties?.bps * 0.01
    : 0
  let chainName = collectionChain?.name

  let rareTokenQuery: Parameters<typeof useDynamicTokens>['0'] = {
    limit: 8,
    collection: collectionId,
    includeLastSale: true,
    sortBy: 'rarity',
    sortDirection: 'asc',
  }

  useEffect(() => {
    setIsOverflowed(
      descriptionRef?.current?.scrollHeight >
        descriptionRef?.current?.clientHeight
    )
  }, [isOverflowed, descriptionRef])

  const { data: rareTokens } = useDynamicTokens(rareTokenQuery)
// 
   const [countries, setCountries] = useState([] as any);
const [icon, setIcon] = useState<File | null>(null)
const [image, setImage] = useState<File | null>(null)
 const [description, setDescription] = useState("");
 const [media, setMedia] = useState([] as any);
 const [open, setOpen] = useState(false);
  const [data1, setData1] = useState(null);
  const newcollecid:any = collectionId;
 const handleSubmit1 = async () => {
   const { data, error } = await supabase
      .from('dropinfo')
    .select('*')
    .ilike('collectionaddress', newcollecid)
setCountries(data);
// console.log('data',data);

}
handleSubmit1();
// 
const tovalue = countries?.length;
const tovalueicon = countries?.[0]?.icon;
const tovaluedesc = countries?.[0]?.desc;
const tovalueimage = countries?.[0]?.image;
const tovalueaddress = countries?.[0]?.address;

  const { address, connector, isConnected } = useAccount()
let isOwner = false;


//  console.log('isOwner', isOwner);
   const uploadToIpfs = async (event: { preventDefault: () => void }) => {
    //name , symbol type
    event.preventDefault();

    const iconvalue = icon;
    const collectionaddress:any = collectionId;
    // console.log('collectionId',newcollecid)
    const imagevalue = image;
    const desc = description;
        if(1){
      // console.log('tovalue',tovalue)
      if(tovalue){
const { data, error } = await supabase
      .from('dropinfo')
      .update([{ collectionaddress, desc }])
      .ilike('collectionaddress', newcollecid);
   
      }else{
          const { data, error } = await supabase
      .from('dropinfo')
      .insert([{   collectionaddress, desc }]);
      handleSubmit1()
     
      }
    }
    if(iconvalue){
 let file = iconvalue;
 let icon =  uuidv4();
const { data, error } = await supabase
      .storage
      .from('test')
      .upload('userId' + "/" + icon, iconvalue)

      if(data){
const { data, error } = await supabase
      .from('dropinfo')
      .update([{ collectionaddress,icon }])
      .ilike('collectionaddress', newcollecid);

      }else{
          const { data, error } = await supabase
      .from('dropinfo')
      .insert([{ collectionaddress, icon }]);
      handleSubmit1()
      }


    }
    if(imagevalue){
      // console.log('imagevalue', imagevalue)
let file = imagevalue;
 let image =  uuidv4();
 const imageval = image;
const { data, error } = await supabase
      .storage
      .from('test')
      .upload('userId' + "/" + image, file)

      if(data){
const { data, error } = await supabase
      .from('dropinfo')
      .update([{ collectionaddress,image }])
      .ilike('collectionaddress', newcollecid);

      }else{
          const { data, error } = await supabase
      .from('dropinfo')
      .insert([{ collectionaddress,image }]);
      handleSubmit1()
      }
    }

		// const uploadUrl = await upload({
		// 	data: [file],
		// 	options: {
		// 		uploadWithGatewayUrl: true,
		// 		uploadWithoutDirectory: true,
		// 	},
		// })
    // setFile(uploadUrl);
    // let newver = uploadUrl.toString();
    // console.log('newver',newver);
    // setImage(newver);
	// 	console.log("Uploaded to IPFS: " + uploadUrl)
    //  console.log('recipient',recipient)
    //  console.log('percent',percent)
    // //  setTimeout(function(){
    //       console.log('percent2',percent)
       
    //     }, 4000);
// console.log('working');
// console.log('desc',desc);
alert('settings updated')
setOpen(false)
	}


  // async function getMedia() {

  //   const { data, error } = await supabase.storage.from('test').list('userId' + '/', {
  //     limit: 10,
  //     offset: 0,
  //     sortBy: {
  //       column: 'name', order:
  //         'asc'
  //     }
  //   });

  //   if (data) {
  //     setMedia(data);
  //   } else {
  //     console.log(71, error);
  //   }
  // }
//   const account = useAccount()
//     const token = tokens && tokens[0] ? tokens[0] : undefined
    
// const owner = isOwner ? account?.address : token?.token?.owner
// console.log('owner12345', owner);
if(isConnected){
// console.log('collection?.creator',collection?.creator);
// console.log('address',address);
let givenaddress:any = collection?.creator;
let givenaddress1:any = address;
let newgivenaddress:any = givenaddress?.toLowerCase();
let newgivenaddress1:any = givenaddress1?.toLowerCase();
// console.log('givenaddress', newgivenaddress)
// console.log('givenaddress1', newgivenaddress1)
if(newgivenaddress == newgivenaddress1){
  isOwner = true;
  // console.log('if woreking')
}else{
// console.log('else woreking')
}
  // isOwner = true;
}
// console.log('isOwner',isOwner)



  // useEffect(() => {
  //   fetch('https://api.reservoir.tools/owners/common-collections/v1?owners=0x29bBe8E4b3CFF9427A5A71024eD1bD798aAF87A8')
  //     .then(response => response.json())
  //     .then(json => setData1(json))
  //     .catch(error => console.error(error));
  // }, []);
//  const { data, isError, isLoading } = useContractRead({
//     address: '0x10b8b56d53bfa5e374f38e6c0830bad4ebee33e6',
//     abi: erc721ABI,
//     functionName: 'ownerOf',
//   })
// console.log('data1',data)

  
  return (
    <Flex wrap="wrap">
      <Box css={{ width: '100%', '@lg': { width: 440 }, pb: '$5' }}>
        <Box
          css={{
            borderRadius: 8,
            overflow: 'hidden',
            background: '$neutralBgSubtle',
            $$shadowColor: '$colors$panelShadow',
            boxShadow: '0 8px 12px 0px $$shadowColor',
            position: 'relative',
            '&:hover > a > div > img': {
              transform: 'scale(1.1)',
            },
            '@sm': {
              '&:hover .token-button-container': {
                bottom: 0,
              },
            },
          }}
        >
          {collection?.banner && !tovalueimage ? (
            <StyledImage
              src={optimizeImage(collection?.banner, 1000)}
              css={{
                borderRadius: 8,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                width: '100%',
                height: 300,
                '@md': {
                  height: 350,
                },
                '@lg': {
                  height: 200,
                },
                objectFit: 'cover',
              }}
            />
          ) : null}

          {tovalueimage ? (
            <StyledImage
              src={'https://gaqiyoafnzsovcorfqli.supabase.co/storage/v1/object/public/test/userId/'+ tovalueimage}
              css={{
                borderRadius: 8,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                width: '100%',
                height: 300,
                '@md': {
                  height: 350,
                },
                '@lg': {
                  height: 200,
                },
                objectFit: 'cover',
              }}
            />
          ) : null}
      
          <Box css={{ float: 'right' }}>
            {/* <FontAwesomeIcon icon={faPentosquare} width={14} height={14} /> */}

  
            <Dialog.Root  open={open} onOpenChange={setOpen}>
   {/* isOwner */}
   {isOwner && (
    <Dialog.Trigger asChild>
      <button className="Button violet"  style={{ color: 'white' }}>Edit</button>
    </Dialog.Trigger>
   )}

    <Dialog.Portal>
      
      <Dialog.Overlay className="DialogOverlay" />
      
      <Dialog.Content className="DialogContent" >
        <form  >
        <Dialog.Title className="DialogTitle" >Edit</Dialog.Title>
        

        <fieldset className="Fieldset">
          <label className="Label" htmlFor="Icon">
            Icon
          </label>
          <input type="file" className="Input" id="Icon" onChange={(e) => {
					if (e.target.files) {
						setIcon(e.target.files[0])
					}
				}}  />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="image">
            image
          </label>
          <input type="file" className="Input" id="image" onChange={(e) => {
					if (e.target.files) {
						setImage(e.target.files[0])
					}
				}}  />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="Descriptoin">
            Descriptoin
          </label>
          <textarea rows={6} cols={5} className="Input" id="Descriptoin" value={description}
          onChange={(e) => setDescription(e.target.value)}   />
        </fieldset>
        <div  style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
          <Dialog.Close asChild className='c-PJLV'>
            <button type="submit" className="Button violet"  style={{ color: 'white',background:'#0A2B9A', backgroundColor:'#0A2B9A' }} onClick={uploadToIpfs}>Save changes</button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
        </form> 
      </Dialog.Content>
       
    </Dialog.Portal>
  </Dialog.Root>
           
            {/* end */}
          </Box>
          <Box css={{ p: '$4' }}>
            <Text style="h6" as="h6" css={{ mb: '$1', fontWeight: 700 }}>
              About {collection?.name}
            </Text>
            {tovaluedesc && (
<Text
              style="body1"
              as="p"
              ref={(ref) => {
                if (!ref) return
                descriptionRef.current = ref
              }}
              css={{
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: descriptionExpanded ? 'reset' : 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <ReactMarkdown children={tovaluedesc || ''} />
            </Text>

            )}
             {!tovaluedesc && (
            <Text
              style="body1"
              as="p"
              ref={(ref) => {
                if (!ref) return
                descriptionRef.current = ref
              }}
              css={{
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: descriptionExpanded ? 'reset' : 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <ReactMarkdown children={collection?.description || ''} />
            </Text>
             )}
            {isOverflowed && (
              <Text
                onClick={() => setDescriptionExpanded(!descriptionExpanded)}
                style="body1"
                as="p"
                css={{
                  cursor: 'pointer',
                  mt: '$2',
                  fontWeight: 600,
                  textDecoration: 'underline',
                }}
              >
                {descriptionExpanded ? 'Close' : 'Expand'}
              </Text>
            )}
            <Box css={{ mt: '$4' }}>
              <Flex justify="start">
                {collection && <CollectionActions collection={collection} />}
              </Flex>
            </Box>
          </Box>
        </Box>
        <Box css={{ mt: '$5' }}>
          <Text css={{ mb: '$2', fontWeight: 700 }} as="h6" style="h6">
            Collection Details
          </Text>
          {[
            {
              label: 'Contract',
              value: truncateAddress(collection?.primaryContract || ''),
            },
            { label: 'Token Standard', value: contractKind },
            { label: 'Chain', value: chainName },
            {
              label: 'Creator Earning',
              value: creatorRoyalties + '%',
            },
            { label: 'Total Supply', value: collection?.tokenCount },
          ].map((data) => (
            <Flex
              css={{
                gap: '$4',
                justifyContent: 'space-between',
                mb: '$2',
              }}
            >
              <Text style="body1" color="subtle">
                {data.label}
              </Text>
              <Text style="body1" css={{ fontWeight: 600 }}>
                {data.value}
              </Text>
            </Flex>
          ))}
        </Box>
      </Box>
      <Box
        css={{
          flex: 1,
          '@lg': { pl: '$5', ml: '$2', pt: '$2', pb: '$6' },
        }}
      >
        <Text style="h7" as="h5" css={{ mb: '$3' }}>
          Collection Stats
        </Text>
        <ItemGrid>
          {[
            {
              name: 'Floor',
              value: collection?.floorAsk?.price?.amount?.decimal
                ? `${collection?.floorAsk?.price?.amount?.decimal} ${collection?.floorAsk?.price?.currency?.symbol}`
                : '-',
            },
            {
              name: 'Top Bid',
              value: collection?.topBid?.price?.amount?.decimal
                ? `${collection?.topBid?.price?.amount?.decimal || 0} ${
                    collection?.topBid?.price?.currency?.symbol
                  }`
                : '-',
            },
            {
              name: '24h Volume',
              value: `${Number(
                collection?.volume?.['1day']?.toFixed(2)
              ).toLocaleString()} ${chainCurrency.symbol}`,
            },

            {
              name: '24h Sales',
              value: Number(
                `${collection?.salesCount?.['1day'] || 0}`
              ).toLocaleString(),
            },
          ].map((stat) => (
            <Box
              css={{
                p: '$4',
                borderRadius: 8,
                overflow: 'hidden',
                background: '$neutralBgSubtle',
                $$shadowColor: '$colors$panelShadow',
                boxShadow: '0 0px 12px 0px $$shadowColor',
                position: 'relative',
              }}
            >
              <Text style="subtitle1" as="p">
                {stat.name}
              </Text>
              <Text style="h5" css={{ fontWeight: 800 }}>
                {stat.value}
              </Text>
            </Box>
          ))}
        </ItemGrid>

        <Text style="h7" as="h5" css={{ mb: '$3', mt: '$5' }}>
          Rare Tokens
        </Text>
        {rareTokens.length > 0 ? (
          <ItemGrid>
            {rareTokens.slice(0, 4).map((token) => (
              <TokenCard
                showAsk={false}
                token={token}
                showSource={false}
                rarityEnabled={false}
              />
            ))}
          </ItemGrid>
        ) : (
          <Text>No rare tokens</Text>
        )}

        <Text style="h7" as="h5" css={{ mb: '$3', mt: '$5' }}>
          Floor Tokens
        </Text>

        {rareTokens.length > 0 ? (
          <ItemGrid>
            {tokens.slice(0, 4).map((token) => (
              <TokenCard
                showAsk={false}
                token={token}
                showSource={false}
                rarityEnabled={false}
              />
            ))}
          </ItemGrid>
        ) : (
          <Text>No Tokens</Text>
        )}
      </Box>
    </Flex>
  )
}
