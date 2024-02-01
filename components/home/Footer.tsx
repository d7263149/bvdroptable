import { FC } from 'react'
import { useTheme } from 'next-themes'
import { Text, Box, Flex, Anchor, Button } from '../primitives'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faLinkedin, faTwitter, faTelegram } from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'
type SectionTitleProps = {
  title: string
}


import React from 'react';
// import * as Dialog from '@radix-ui/react-dialog';
// import { Cross2Icon } from '@radix-ui/react-icons';


const SectionTitle: FC<SectionTitleProps> = ({ title }) => (
  <Text style="subtitle1" css={{ color: '$gray12', mb: 8 }}>
    {title}
  </Text>
)

type SectionLinkProps = {
  name: string
  href: string
}

const SectionLink: FC<SectionLinkProps> = ({ name, href }) => (
  <Anchor
    target="_blank"
    rel="noopener noreferrer"
    href={href}
    weight="medium"
    css={{ fontSize: 14, mt: 5 }}
  >
    {name}
  </Anchor>
)

const developerSectionLinks = [
  {
    name: 'Copyright',
    href: 'copyright',
  },
  {
    name: 'Privacy Policy',
    href: 'privacypolicy',
  },
  
]

const companySectionLinks = [
  {
    name: 'Jobs',
    href: '#',
  },
  {
    name: 'Terms of Use',
    href: '#',
  },
  {
    name: 'Privacy Policy',
    href: '#',
  },
]

export const Footer = () => {
    const { theme } = useTheme()
  return (
    <Flex
      justify="between"
      className="footer"
      css={{
        borderTop: '1px solid $gray7',
        borderStyle: 'solid',
        pt: '$5',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 36,
        '@bp600': {
          flexDirection: 'row',
          gap: 0,
          height: '100%',
          '@bp800': {
            px: '$5',
          },
          '@xl': {
            px: '$6',
          },
        },
        
      }}
    >
      
      
      {/* <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="Button violet">Edit profile</button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
        <Dialog.Description className="DialogDescription">
          Make changes to your profile here. Click save when you're done.
        </Dialog.Description>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="name">
            Name
          </label>
          <input className="Input" id="name" defaultValue="Pedro Duarte" />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="username">
            Username
          </label>
          <input className="Input" id="username" defaultValue="@peduarte" />
        </fieldset>
        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
          <Dialog.Close asChild>
            <button className="Button green">Save changes</button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root> */}
      <Flex css={{ gap: 80, '@bp600': { gap: 136 } }}>
        {/* <Flex direction="column">
          <SectionTitle title="Developers" />
          {developerSectionLinks.map((props) => (
            <SectionLink key={props.name} {...props} />
          ))}
        </Flex>
        <Flex direction="column">
          <SectionTitle title="Company" />
          {companySectionLinks.map((props) => (
            <SectionLink key={props.name} {...props} />
          ))}
        </Flex> */}
        
        

         {theme == 'dark' ? (
                <Flex css={{ gap: '$4'}}>
                  <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://t.me/BlueBitLTD"
          >
            <Button size="xs" color="gray3">
              <FontAwesomeIcon icon={faTelegram} width={14} height={14} />
            </Button>
          </a>
          {/* <a
            target="_blank"
            rel="noopener noreferrer"
            href="#"
          >
            <Button size="xs" color="gray3">
              <FontAwesomeIcon icon={faFacebook} width={14} height={14} />
            </Button>
          </a> */}
           <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/Bluebit_io"
          >
            <Button size="xs" color="gray3">
              <FontAwesomeIcon icon={faTwitter} width={14} height={14} />
            </Button>
          </a>
           {/* <a
            target="_blank"
            rel="noopener noreferrer"
            href="#"
          >
            <Button size="xs" color="gray3">
              <FontAwesomeIcon icon={faLinkedin} width={14} height={14} />
            </Button>
          </a> */}
           <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://instagram.com/bluebit.io?igshid=NGVhN2U2NjQ0Yg=="
          >
            <Button size="xs" color="gray3">
              <FontAwesomeIcon icon={faInstagram} width={14} height={14} />
            </Button>
          </a>
        </Flex>
              ) : (
                <Flex className='whitetheme' css={{ gap: '$4'}}>
          {/* <a
            target="_blank"
            rel="noopener noreferrer"
            href="#"
          >
            <Button size="xs" color="gray3">
              <FontAwesomeIcon icon={faFacebook} width={14} height={14} />
            </Button>
          </a> */}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://t.me/BlueBitLTD"
          >
            <Button size="xs" color="gray3">
              <FontAwesomeIcon icon={faTelegram} width={14} height={14} />
            </Button>
          </a>
           <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/Bluebit_io"
          >
            <Button size="xs" color="gray3">
              <FontAwesomeIcon icon={faTwitter} width={14} height={14} />
            </Button>
          </a>
           {/* <a
            target="_blank"
            rel="noopener noreferrer"
            href="#"
          >
            <Button size="xs" color="gray3">
              <FontAwesomeIcon icon={faLinkedin} width={14} height={14} />
            </Button>
          </a> */}
           <a
            target="_blank"
            rel="noopener noreferrer"
            href="#https://instagram.com/bluebit.io?igshid=NGVhN2U2NjQ0Yg=="
          >
            <Button size="xs" color="gray3">
              <FontAwesomeIcon icon={faInstagram} width={14} height={14} />
            </Button>
          </a>
        </Flex>
              )}

         
      </Flex>
      <a 
          className='link colorlink1'
            href="/"
          >© 2023 Bluevinci.io</a> 
      <Flex
        direction="column"
        css={{ alignItems: 'flex-start', '@bp600': { alignItems: 'flex-end' } }}
      >


        <Flex
      justify="between"
      css={{
       
       
        flexDirection: 'column',
        alignItems: 'flex-start',

        '@bp600': {
          flexDirection: 'row',
          gap: 40,
        },
      }}
    >
      <Flex css={{  '@bp600': { gap: 10 } }}>
        <Flex direction="column">
          
        </Flex>
        
      </Flex>
      <Flex
        direction="column"
        css={{ alignItems: 'flex-start', '@bp600': { alignItems: 'flex-end' } }}
      >
      {theme
        ?
                <>
                {theme == 'dark' ? (
                <Image
                  src="/logobv.png"
                  width={120}
                  height={70}
                  alt={theme}
                />
              ) : (
                <Image
                  src="/bvincilogow.png"
                  width={120}
                  height={70}
                  alt='not defind'
                />
              )}
                </>
             : 
             <></>
    }
             
     
      </Flex>
    </Flex>



        {/* <SectionTitle title="BLUEVINCI" /> */}
        <Flex css={{ gap: '$4', mt: 16 }}>
          
          {/* <a
            target="_blank"
            rel="noopener noreferrer"
            href="#"
          >
            <Button size="xs" color="gray3">
              <FontAwesomeIcon icon={faTwitter} width={14} height={14} />
            </Button>
          </a> */}
        </Flex>
        
      </Flex>
      
      
    </Flex>
  )
}
