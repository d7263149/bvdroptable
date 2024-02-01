import { NextPage } from 'next'
import { Text, Flex, Box } from 'components/primitives'
import Layout from 'components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

//@ts-ignore
import OBJECT_VAL  from "../../config/variableCommon"
//@ts-ignore
import OBJECT_IMG  from "../../config/variableImage"
//@ts-ignore
import chainURL  from "../../config/chainURL"
//@ts-ignore
import chainInternalURL  from "../../config/chainInternalURL"

////////////////////////


import Img from 'components/primitives/Img'
import useTopSellingCollections from 'hooks/useTopSellingCollections'
import ReactMarkdown from 'react-markdown'
import { basicFetcher as fetcher } from 'utils/fetcher'
import { styled } from 'stitches.config'
import { useTheme } from 'next-themes'
import ChainToggle from 'components/common/ChainToggle'
import optimizeImage from 'utils/optimizeImage'
import { MarkdownLink } from 'components/primitives/MarkdownLink'
import { useRouter } from 'next/router'
import supabase from "../../config/supabaseClient"

import React, {  useRef,  useMemo, useCallback, useState, useEffect} from 'react'
import {  db } from "../../config/firebase"
import { collection, getDocs, orderBy, query , onSnapshot, doc, where  } from 'firebase/firestore'
import Link from 'next/link'

const IndexPage: NextPage = () => {

const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {
    console.log("Current data: ", doc.data());
});

//@ts-ignore
const imagesMain:any[] = OBJECT_IMG;
 //@ts-ignore
const OBJECT_VALm:any[] = OBJECT_VAL;
//@ts-ignore
const InternalurlMain:any[] = chainInternalURL;
    const { theme } = useTheme()

  const gridRef = useRef();
 const [countries, setCountries] = useState([] as any);
     const [toshow, setToshow] = useState([] as any);
     const [todata, setTodata] = useState([] as any);

   
  let [rowDataold, setRowDataold] = useState("" as any); // Set rowData to Array of Objects, one Object per Row
  let [rowData, setRowData] = useState([] as any); // Set rowData to Array of Objects, one Object per Row





const [data, setData] = useState(null);

 const dogsCol = collection(db, 'autoTopTrendingMints');
//@ts-ignore
    const [dogs, setDogs] = React.useState<Dog[]>([]);

    useEffect(() => {
        const unSubscribe = onSnapshot(dogsCol, dogsSnap => {
            const dogsArray = dogsSnap.docs.map(dogSnap => {
              //@ts-ignore
                const dog = dogSnap.data() as Dog;
                dog.id = dogSnap.id;
                return dog;
            });
            console.log(dogsArray);
                        setRowData(dogsArray);

         });

        return () => unSubscribe();
    },[]);



//   useEffect(() => {




//     const fetchData = async () => {
//       try {
//         const todoRef = collection(db, 'autoTopTrendingMints');
// // let allTodos = await getDocs(todoRef).then((snapshot)=>{
// let allTodos = await getDocs(query(todoRef, orderBy('sixHourCount', 'desc'))).then((snapshot)=>{
//     let books: { id: string }[] = []
//     snapshot.docs.forEach((doc)=>{
//         books.push ({...doc.data(),id:doc.id});
//     })

//     setRowData(books);
//       console.log('sandeep',books);
//  }).catch(err =>{
//     console.warn(err);
//  })
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();




//   }, []);




    async function workings(){

  
const todoRef = collection(db, 'autoTopTrendingMints');
// let allTodos = await getDocs(todoRef).then((snapshot)=>{
let allTodos = await getDocs(query(todoRef, orderBy('sixHourCount', 'desc'))).then((snapshot)=>{
    let books: { id: string }[] = []
    snapshot.docs.forEach((doc)=>{
        books.push ({...doc.data(),id:doc.id});
    })

    setRowData(books);
      console.log('sandeep',books);
 }).catch(err =>{
    console.warn(err);
 })
  }


const [counts, setcounts] = useState(0);
  // Example load data from server
// Write this line
useEffect(() => {
// workings();
}, []);

    useEffect(() => {



      //  let dogsCol = collection(db, 'autoManualFeatureCollections');
       const dogsCol = query(collection(db, "autoManualFeatureCollections"), where("key", "==", 'home_1'));


        const unSubscribe = onSnapshot(dogsCol, dogsSnap => {
            const dogsArray = dogsSnap.docs.map(dogSnap => {
              //@ts-ignore
                const dog = dogSnap.data() as Dog;
                dog.id = dogSnap.id;
                return dog;
            });
            console.log(dogsArray);
                  
                        // setMintsCollection(dogsArray);
                        // setMintsCustom(dogsArray);
                        setToshow(dogsArray);

        });




        

        return () => unSubscribe();
    },[]);


//  setTimeout(() => {
//     workings();
//    }, 30000);



// console.log(tasks);
/*
 * It's unlikely you'll use functions that create and manipulate DOM elements like this in an React application, but it
 * demonstrates what is at least possible, and may be preferable in certain use cases
 */
const createImageSpan = (imageMultiplier: any, image: any) => {
  const resultElement = document.createElement('span');
  for (let i = 0; i < imageMultiplier; i++) {
    const imageElement = document.createElement('img');
    imageElement.src =
      'https://www.ag-grid.com/example-assets/weather/' + image;
    resultElement.appendChild(imageElement);
  }
  return resultElement;
};

// This is a plain JS (not React) component
//   const gridRef = useRef();
// This is a plain JS (not React) component
class DeltaIndicator {
  eGui: HTMLSpanElement | undefined | any;
  init(params: {
      data: any; price : any ; image : any ; chain : any ; address : any 
}) {
    // console.log('paramssss',params)
    const element = document.createElement('span');
    const element1 = document.createElement('a');
    const imageElement = document.createElement('img');
    // console.log('params.data.image',params.data.image)
    if (params.data.image) {
      imageElement.src = params.data.image;
    } else {
      imageElement.src = 'https://iconicentertainment.in/wp-content/uploads/2013/11/dummy-image-square.jpg';
    }
    element1.href="working";
    // element.appendChild(element1);
    element.appendChild(imageElement);
    // element.appendChild(imageElement);
    // element.appendChild(document.createTextNode(params.data.name));
    var link = document.createElement('a');
    //@ts-ignore
        link.href = `/${InternalurlMain[params.data.chain ?? '1']}/collection/${params.data.address}`;
        link.innerText = params.data.name;
element.appendChild(link);


    this.eGui =  element;
  }
  getGui() {
    return this.eGui;
  }
}


// This is a plain JS (not React) component
class twinty4mintHandle {
  eGui: HTMLSpanElement | undefined;
  init(params: {
      tfHMStatus: number
      data: any; price : any ;oneHourCount:any
}) {
    // console.log('paramssss',params)
    const element = document.createElement('span');
    const imageElement = document.createElement('img');
    if (params.data.oneHourCount > 0) {
      imageElement.src =
        './../arrow/green1.png';
    } else {
      imageElement.src =
        './../arrow/red1.png';
    }
    element.appendChild(imageElement);
    element.appendChild(document.createTextNode(params.data.oneHourCount));
    
    this.eGui = element;
  }
  getGui() {
    return this.eGui;
  }
}
// This is a plain JS (not React) component
class chainHandle {
  eGui: HTMLSpanElement | undefined | any;
  init(params: {
      data: any; price : any ; image : any ; chain : any ; address : any 
}) {
    // console.log('paramssss',params)
    const element = document.createElement('span');
    const element1 = document.createElement('a');
    const imageElement = document.createElement('img');
    // console.log('params.data.image',params.data.image)
    if (imagesMain[params.data.chain]) {
      imageElement.src = imagesMain[params.data.chain];
    } else {
      imageElement.src = imagesMain['1'];;
    }
    element1.href="working";
    // element.appendChild(element1);
    element.appendChild(imageElement);
    // element.appendChild(imageElement);
    // element.appendChild(document.createTextNode(params.data.name));
    var link = document.createElement('a');
    //@ts-ignore
        // link.target = "_blank";
        link.href = `${urlMain[params.data.chain ?? '1']}/address/${params.data.address}`;
        link.innerText = OBJECT_VALm[params.data.chain];
element.appendChild(link);


    this.eGui =  element;
  }
  getGui() {
    return this.eGui;
  }
}


  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: 'Collection',
      cellRenderer: DeltaIndicator,
      //  cellStyle: function(params:any) {
      //           if (params.node.sixHourMint=='Police') {
      //               return {color: 'red1',textAlign: 'center',};
      //           } else {
      //               // return null;
      //               return {color: 'red1',textAlign: 'center',};
      //           } 
      //       },
            
            unSortIcon: true
    },
    {
      headerName: 'Chain',
    unSortIcon: true,
      
       
      cellRenderer: chainHandle,
    //   filter: true,
      //  cellStyle: function(params:any) {
      //           if (params.node.sixHourMint=='Police') {
      //               return {color: 'red1',textAlign: 'center'};
      //           } else {
      //               // return null;
      //               return {color: 'red1',textAlign: 'center'};
      //           } 
      //       },
            type: 'leftAligned',
            cellClass: ["toshortimage", "ag-cell--monospace-font"]
    },
    {headerName: 'Minting Price',unSortIcon: true,shorting:true, field: 'price',
    // cellStyle: function(params:any) {
    //             if (params.node.sixHourMint=='Police') {
    //                 return {color: 'red1',textAlign: 'center'};
    //             } else {
    //                 // return null;
    //                 return {color: 'red1',textAlign: 'center'};
    //             } 
    //         }
          },
    {headerName: '6 H Mints',unSortIcon: true,field: 'sixHourCount',
    // cellStyle: function(params:any) {
    //             if (params.node.sixHourMint=='Police') {
    //                 return {color: 'red1',textAlign: 'center',};
    //             } else {
    //                 // return null;
    //                 return {color: 'red1',textAlign: 'center',};
    //             } 
    //         }
          },
    {headerName: '1 H Mints',unSortIcon: true, field: 'oneHourCount', cellRenderer: twinty4mintHandle,
      
      // cellStyle: function(params:any) {
      //           if (params.node.oneHourCount=='Police') {
      //               return {color: 'red1',textAlign: 'center',};
      //           } else {
      //               // return null;
      //               return {color: 'red1',textAlign: 'center',};
      //           } 
      //       },
            cellClass: ["toshortimage1", "ag-cell--monospace-font"]
        },

  ]);

  // DefaultColDef sets props common to all Columns
  //@ts-ignore
  const defaultColDef = useMemo( ()=> ({
      sortable: true
    }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback( (event: any) => {
    console.log('cellClicked', event);
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback( (e: any) => {
    //@ts-ignore
    gridRef.current.api.deselectAll();
  }, []);






 const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
 
const autoSizeStrategy:any = useMemo(() => {
    return {
      type: 'fitGridWidth',
    };
  }, []);
  const onGridSizeChanged = useCallback((params:any) => {
    // get the current grids width
    //@ts-ignore
    var gridWidth = document.getElementById('grid-wrapper').offsetWidth;
    // keep track of which columns to hide/show
    var columnsToShow = [];
    var columnsToHide = [];
    // iterate over all columns (visible or not) and work out
    // now many columns can fit (based on their minWidth)
    var totalColsWidth = 0;
    var allColumns = params.api.getColumns();
    if (allColumns && allColumns.length > 0) {
      for (var i = 0; i < allColumns.length; i++) {
        var column = allColumns[i];
        totalColsWidth += column.getMinWidth() || 0;
        if (totalColsWidth > gridWidth) {
          columnsToHide.push(column.getColId());
        } else {
          columnsToShow.push(column.getColId());
        }
      }
    }
    // show/hide columns based on current grid width
    params.api.setColumnsVisible(columnsToShow, true);
    params.api.setColumnsVisible(columnsToHide, false);
    // fill out any available space to ensure there are no gaps
    params.api.sizeColumnsToFit();
  }, []);





  return (
              <Layout>
            <Box
        css={{
          p: '0 24 0 24',
          height: '100%',
          '@bp800': {
            p: '$6 $6 0 $6',
          },
        }}
      >
<Flex
className="againbox"
          direction="column"
          css={{
            px: '0',
            pt: 20,
            display:'flow',
            '@sm': {
              px: '$5',
            },
          }}
        >
             <Text>Mints  </Text>
             

          </Flex>
          </Box>






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

{toshow &&
            toshow.length &&
              //@ts-ignore
            toshow.slice(0, 4).map((collection, i) => {
             
                return (
                  <Link
                    key={collection?.id}
                    
                   
                     href={InternalurlMain[collection?.chain]+'/collection/'+collection?.address}
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
                          <Img
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
                          />
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
                       
<Flex css={{ fontSize:'14px' }} >
                          <Box css={{ mr: '$5' }}>
                            <Text style="subtitle2" color="subtle">
                              MINT Price
                            </Text>
                            <Box css={{ mt: 2,display:'flex' }}>
                               <Img
                               css={{ width:'14px',height:"14px",marginTop:'7px' }}
                            src={'../../../'+imagesMain[collection?.chain]}
                            alt='chain'
                            width={14}
                            height={14}
                            />
                              <Text style="h4" as="h4" css={{ mt: 2, fontSize:'16px' }}>
                              {collection?.price}
                              
                            
                            </Text>
                         
                           
                            </Box>
                          </Box>

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














          
<Box
        css={{
          px: 24,
          pb: 24,
          height: '100%',
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

      <Box
          style={gridStyle}
         className={theme == 'light' ? 'ag-theme-alpine example-wrapper hide':'ag-theme-alpine-dark example-wrapper hide'}
        >
           <AgGridReact
        //@ts-ignore
            ref={gridRef} // Ref for accessing Grid's API
            rowData={rowData} // Row Data for Rows
            columnDefs={columnDefs} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties
            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            rowSelection='multiple' // Options - allows click selection of rows
            onCellClicked={cellClickedListener} // Optional - registering for Grid Event
            enableCellChangeFlash={true}
            //@ts-ignore
            // autoSizeStrategy={autoSizeStrategy}
            // onGridSizeChanged={onGridSizeChanged}
             domLayout='autoHeight'
            />
        </Box>
<Box
          style={gridStyle}
         className={theme == 'light' ? 'ag-theme-alpine example-wrapper show':'ag-theme-alpine-dark example-wrapper show'}
        >
           <AgGridReact
        //@ts-ignore
            ref={gridRef} // Ref for accessing Grid's API
            rowData={rowData} // Row Data for Rows
            columnDefs={columnDefs} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties
            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            rowSelection='multiple' // Options - allows click selection of rows
            onCellClicked={cellClickedListener} // Optional - registering for Grid Event
            enableCellChangeFlash={true}
            //@ts-ignore
            autoSizeStrategy={autoSizeStrategy}
            onGridSizeChanged={onGridSizeChanged}
            domLayout='autoHeight'
            />
        </Box>

      
      {/* /////////////////////////////// */}

      
      {/* /////////////////////////////// */}
{/* ///////////end main//////////// */}






        <Flex
          justify="between"
          align="center"
          css={{ flexWrap: 'wrap', mb: '$4', gap: '$3' }}
        >
          {/* <Text style="h4" as="h4" css={{ width: '100%', float: 'right' }}>
           Trending Collections 
            <Link

                     href={'cdrop'}
                    style={{ display: 'grid',width: '200px',
    float: 'right' }}
                  >
<Button className="deplysubmit" type="submit"
                css={{
                  Width: '100%',
                  justifyContent: 'center',
                  marginTop:20
                }}
                style={{  width:'100%'}}
                size="medium"
              >
              Import Drop
              </Button>  

                  </Link>
          </Text> */}
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



      








        
        {/* ///////////// */}


















    </Layout>
  )
}

export default IndexPage
