import { NextPage } from 'next'
import { Text, Flex, Box } from 'components/primitives'
import Layout from 'components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarning } from '@fortawesome/free-solid-svg-icons'
import Img from 'components/primitives/Img'
import { AgGridReact } from "ag-grid-react";
import { Footer } from 'components/home/Footer'
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useTheme } from 'next-themes'
import React, { useRef, useMemo, useCallback, useState, useEffect } from 'react'
import { db } from "../../config/firebase"
import { collection, getDocs, orderBy, query, onSnapshot, doc, where, limit } from 'firebase/firestore'
import Grid from "components/Grid";
//@ts-ignore
import OBJECT_IMG from "../../config/variableImage"
//@ts-ignore
import OBJECT_VAL from "../../config/variableCommon"

//@ts-ignore
import chainURL from "../../config/chainURL"
//@ts-ignore
import chainInternalURL from "../../config/chainInternalURL"
//@ts-ignore
//@ts-ignore
import mintURL from "../../config/mintURL"
import Link from 'next/link'
import supabase from "../../config/supabaseClient"
const IndexPage: NextPage = () => {

  //@ts-ignore
  const imagesMain: any[] = OBJECT_IMG;
  //@ts-ignore
  const urlMain: any[] = chainURL;
  //@ts-ignore
  const InternalurlMain: any[] = chainInternalURL;
  //@ts-ignore
  const getchainName: any[] = OBJECT_VAL;
  //@ts-ignore
  const getmintURL: any[] = mintURL;

  //@ts-ignore
  const OBJECT_VALm: any[] = OBJECT_VAL;
  //  //@ts-ignore
  // const OBJECT_VAL:any[] = OBJECT_VAL;
  const { theme: nextTheme } = useTheme()
  const [theme, setTheme] = useState<string | null>(null)
  const [toshow, setToshow] = useState([] as any);
  useEffect(() => {
    if (nextTheme) {
      setTheme(nextTheme)
    }
  }, [nextTheme])



  ///////////////////////////////////start firebase ///////////




  useEffect(() => {



    //  let dogsCol = collection(db, 'autoManualFeatureCollections');
    const dogsCol = query(collection(db, "autoManualFeatureCollections"), where("key", "==", 'top'));


    const unSubscribe = onSnapshot(dogsCol, dogsSnap => {
      const dogsArray = dogsSnap.docs.map(dogSnap => {
        //@ts-ignore
        const dog = dogSnap.data() as Dog;
        dog.id = dogSnap.id;
        return dog;
      });
      // console.log('mindwithshort', dogsArray);

      setToshow(dogsArray);

    });
    return () => unSubscribe();
  }, []);










  return (
    <Layout>
      <Img className='imagebg' src="../bvinvibg1.png" width="1000" height={1000} alt="sdf" />

      <Box
        css={{
          px: 24,
          pb: 24,
          height: '',
          '@bp800': {
            px: '$6',
          },
        }}
      >

        <Box
          css={{

            height: '100%',
            '@bp800': {

            },
            '@xl': {

            },
          }}
        >
          <Box
            css={{
              pt: '$2',
              mb: '$4',
              mt: '$5',
              display: 'grid',
              gap: '$4',
              gridTemplateColumns: 'repeat(1, 1fr)',
              '@sm': {
                gridTemplateColumns: 'repeat(2, 1fr)',
              },

              '@lg': {
                gridTemplateColumns: 'repeat(4, 1fr)',
              },
            }}
          >


            {/* ///////////////////start 1/////////////////////// */}

            {toshow && toshow.slice(0, 4).map((collection: any, i: string | number) => {


              return (
                <Link
                  key={collection?.id}


                  //  href={InternalurlMain[collection?.chain]+'/collection/'+collection?.address}
                  href={`/${InternalurlMain[collection?.chain ?? '1']}/collection/${collection?.address}`}
                  style={{ display: 'grid' }}
                >
                  <Flex
                    direction="column"
                    css={{
                      flex: 1,
                      width: '100%',
                      borderRadius: 12,
                      cursor: 'pointer',
                      height: '100%',
                      background: '$neutralBgSubtle',
                      $$shadowColor: '$colors$panelShadow',
                      boxShadow: '0 0px 12px 0px $$shadowColor',

                      overflow: 'hidden',
                      position: 'relative',
                      p: '$3',
                      '&:hover > div > div> img:nth-child(1)': {
                        transform: 'scale(1.075)',
                      },
                    }}
                  >
                    <Flex
                      direction="column"
                      css={{
                        zIndex: 2,
                        position: 'relative',
                        flex: 1,
                        width: '100%',
                      }}
                    >
                      <Box
                        css={{
                          position: 'relative',
                          overflow: 'hidden',
                          borderRadius: 8,
                        }}
                      >
                        {
                          //@ts-ignore
                          collection?.image ?? collection.recentSales?.[i]?.token?.image || collection.recentSales?.[i]?.token?.image?.length ? (
                            <img
                              loading="lazy"
                              src={collection?.image ?? collection.recentSales?.[i]?.token?.image}
                              style={{
                                transition: 'transform 300ms ease-in-out',
                                width: '100%',
                                borderRadius: 8,
                                height: 250,
                                objectFit: 'cover',
                              }}
                            />
                          ) : (
                            <Box
                              css={{
                                width: '100%',
                                borderRadius: 8,
                                height: 250,
                                background: '$gray3',
                              }}
                            />
                          )}
                        {/* <Img
                            src={collection?.image}
                            alt={collection?.name}
                            width={72}
                            height={72}
                            css={{
                              width: 72,
                              height: 72,
                              border: '2px solid rgba(255,255,255,0.6)',
                              position: 'absolute',
                              bottom: '$3',
                              left: '$3',
                              borderRadius: 8,
                            }}
                          /> */}
                      </Box>
                      <Flex
                        css={{ my: '$4', mb: '$2' }}
                        justify="between"
                        align="center"
                      >
                        <Text style="h5" as="h5" ellipsify css={{ flex: 1 }}>
                          {
                            //@ts-ignore
                            collection?.name}
                        </Text>
                      </Flex>





                      <Flex
                        direction="column"
                        css={{
                          flex: 1,
                          width: '100%',
                          borderRadius: 12,
                          cursor: 'pointer',
                          height: '100%',
                          background: '$neutralBgSubtle',
                          $$shadowColor: '$colors$panelShadow',
                          boxShadow: '0 0px 12px 0px $$shadowColor',

                          overflow: 'hidden',
                          position: 'relative',
                          p: '',
                        }}
                      >
                        <Flex
                          direction="column"
                          css={{
                            zIndex: 2,
                            position: 'relative',
                            flex: 1,
                            width: '100%',
                          }}
                        >

                          <Flex css={{ fontSize: '14px' }} >
                            <Box css={{ mr: '$5' }}>
                              <Text style="subtitle2" color="subtle">
                                Mint Price
                              </Text>
                              <Box css={{ mt: 2, display: 'flex' }}>
                                <Img
                                  css={{ width: '14px', height: "14px", marginTop: '7px' }}
                                  src={'../../../' + imagesMain[collection?.chain]}
                                  alt='chain'
                                  width={14}
                                  height={14}
                                />
                                <Text style="h4" as="h4" css={{ mt: 2, fontSize: '16px' }}>
                                  {collection?.price} {collection?.symbol}


                                </Text>


                              </Box>
                            </Box>
                            {/* <Box css={{ mr: '$4' }}>
                                <Text style="subtitle2" color="subtle">
                                  Total Mints
                                </Text>
                                <Text style="h4" as="h4" css={{ mt: 2, fontSize: '14px' }}>
                                  {collection?.totalMints}
                                </Text>
                              </Box> */}

                            {/* <Box css={{ mr: '$4' }}>
                            <Text style="subtitle2" color="subtle">
                              6H MINTS
                            </Text>
                            <Text style="h4" as="h4" css={{ mt: 2, fontSize:'14px' }}>
                              {collection?.sales}
                            </Text>
                          </Box>

                          <Box css={{ mr: '$4' }}>
                            <Text style="subtitle2" color="subtle">
                              1H MINTS
                            </Text>
                            <Text style="h4" as="h4" css={{ mt: 2, fontSize:'14px' }}>
                              {collection?.oneHourMints}
                            </Text>
                          </Box> */}
                          </Flex>


                        </Flex>
                      </Flex>


                    </Flex>
                  </Flex>
                </Link>
              )
            })}

          </Box>
        </Box>
      </Box>
      {/* ///////////////////////////////next field///////// */}




      <Box
        css={{
          px: 24,
          pb: 24,
          height: '',
          '@bp800': {
            px: '$6',
          },
        }}
      >

        <Box
          css={{

            height: '100%',
            '@bp800': {

            },
            '@xl': {

            },
          }}
        >
          <Flex
            className="againbox"
            direction="column"
            css={{
              px: '0',
              p: 0,
              display: 'flow',
              '@sm': {
                px: '$1 $5',
              },
            }}
          >
            <Text>Trending Drops  </Text>


          </Flex>
        </Box>
      </Box>






      {/* <Box
        css={{
          p: '0 24',
          height: '100%',
          '@bp800': {
            px: '$6',
            py: '$3',
          },
        }}
      >



<Flex
          justify="between"
          align="center"
          css={{ flexWrap: 'wrap', mb: '$4', gap: '$3' }}
        >
           <Text style="h4" as="h4">
            Featured Mints
          </Text> 
        
        </Flex>          
          </Box> */}

      <Box
        css={{
          px: 24,
          pb: 24,
          height: '',
          '@bp800': {
            px: '$6',
          },
        }}
      >

        <Box
          css={{

            height: '100%',
            '@bp800': {

            },
            '@xl': {

            },
          }}
        >


          {/* //////////start main///////////// */}

          <Grid/>
    
          {/* /////////////////////////////// */}


          {/* /////////////////////////////// */}
          {/* ///////////end main//////////// */}






          <Flex
            justify="between"
            align="center"
            css={{ flexWrap: 'wrap', mb: '$4', gap: '$3' }}
          >
    
            {/* <ChainToggle /> */}
          </Flex>
          <Box
            css={{
              pt: '$2',
              mb: '$4',
              display: 'grid',
              gap: '$4',
              gridTemplateColumns: 'repeat(1, 1fr)',
              '@sm': {
                gridTemplateColumns: 'repeat(2, 1fr)',
              },

              '@lg': {
                gridTemplateColumns: 'repeat(4, 1fr)',
              },
            }}
          >


          </Box>
          {/* ////////////////////testing testing end/////////////////// */}







        </Box>

      </Box>

      {/* ///////////////collections//////////
 */}





















      <Footer />

    </Layout>
  )
}

export default IndexPage
