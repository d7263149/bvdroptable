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
import React, {  useRef,  useMemo, useCallback, useState, useEffect} from 'react'
import {  db } from "../../config/firebase"
import { collection, getDocs, orderBy, query , onSnapshot, doc,where, limit  } from 'firebase/firestore'

//@ts-ignore
import OBJECT_IMG  from "../../config/variableImage"
//@ts-ignore
import OBJECT_VAL  from "../../config/variableCommon"

//@ts-ignore
import chainURL  from "../../config/chainURL"
//@ts-ignore
import chainInternalURL  from "../../config/chainInternalURL"
//@ts-ignore
//@ts-ignore
import mintURL  from "../../config/mintURL"
import Link from 'next/link'
import supabase from "../../config/supabaseClient"
const IndexPage: NextPage = () => {

       //@ts-ignore
const imagesMain:any[] = OBJECT_IMG;
//@ts-ignore
const urlMain:any[] = chainURL;
//@ts-ignore
const InternalurlMain:any[] = chainInternalURL;
//@ts-ignore
 const getchainName:any[] = OBJECT_VAL;
//@ts-ignore
const getmintURL:any[] = mintURL;

 //@ts-ignore
const OBJECT_VALm:any[] = OBJECT_VAL;
//  //@ts-ignore
// const OBJECT_VAL:any[] = OBJECT_VAL;
  const { theme: nextTheme } = useTheme()
  const [theme, setTheme] = useState<string | null>(null)
  useEffect(() => {
    if (nextTheme) {
      setTheme(nextTheme)
    }
  }, [nextTheme])

  const [error, setError] = useState('null');
     const [countries, setCountries] = useState([] as any);
     const [mintsCustom, setMintsCustom] = useState([] as any);
     const [mintsCollection, setMintsCollection] = useState([] as any);
     const [mintsCustomTest, setMintsCustomTest] = useState([] as any);
     const [toshow, setToshow] = useState([] as any);
  const [toshow1, setToshow1] = useState([] as any);
  const [toshowFree, settoshowFree] = useState([] as any);
     const [fc, setFs] = useState([] as any);
     const [fc1, setFs1] = useState([] as any);

          let [empty, setemptycount] = useState(0);
 const [myCarChain, setMyCarChain] = useState('all');

 
///////////////////////////////////start firebase ///////////

   
  let [rowDataold, setRowDataold] = useState([] as any); // Set rowData to Array of Objects, one Object per Row
  let [rowData, setRowData] = useState([] as any); // Set rowData to Array of Objects, one Object per Row


const [data, setData] = useState(null);



//@ts-ignore
    const [dogs, setDogs] = React.useState<Dog[]>([]);

    useEffect(() => {

      // , where("mintType", "==", 'paid') 
       const dogsCol = query(collection(db, "autoTopTrendingMints"), limit(10));
      //  let dogsCol = collection(db, 'autoTopTrendingMints');
        const unSubscribe = onSnapshot(dogsCol, dogsSnap => {
            const dogsArray = dogsSnap.docs.map(dogSnap => {
              //@ts-ignore
                const dog = dogSnap.data() as Dog;
                dog.id = dogSnap.id;
                return dog;
            });
            // console.log('dogsArray1',dogsArray);
                  //  setFs(dogsArray)     
// setRowData(dogsArray)
dogsArray.sort((a, b) => parseFloat(b.sixHourCount) - parseFloat(a.sixHourCount));

setRowData(dogsArray)
          setRowDataold(dogsArray)

// console.log('dogsArrayaftershort',dogsArray);


        });

        return () => unSubscribe();
    },[]);

    useEffect(() => {

      // , where("mintType", "==", 'paid') 
      const dogsCol = query(collection(db, "autoTopTrendingMints"), where("mintType", "==", 'free'), limit(16) );
      //  let dogsCol = collection(db, 'autoTopTrendingMints');
        const unSubscribe = onSnapshot(dogsCol, dogsSnap => {
            const dogsArray = dogsSnap.docs.map(dogSnap => {
              //@ts-ignore
                const dog = dogSnap.data() as Dog;
                dog.id = dogSnap.id;
                return dog;
            });
            // console.log('dogsArray1',dogsArray);
                  //  setFs(dogsArray)     
// setRowData(dogsArray)
dogsArray.sort((a, b) => parseFloat(b.sixHourCount) - parseFloat(a.sixHourCount));

          settoshowFree(dogsArray)

// console.log('dogsArrayaftershort',dogsArray);


        });

        return () => unSubscribe();
    },[]);



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
            // console.log(dogsArray); 
          for (let index = 0; index < dogsArray.length; index++) {
            let element = dogsArray[index];
            // console.log('element', element);
            // dogsArray[index].totalMints = 5;
            }    
                        setToshow(dogsArray);
        });
        return () => unSubscribe();
    },[]);

  const [topfreedrops, setTopFreeDrops] = useState([] as any);
  useEffect(() => {
    //  let dogsCol = collection(db, 'autoManualFeatureCollections');
    const dogsCol = query(collection(db, "autoManualFeatureCollections"), where("key", "==", 'topfreedrops'));
    const unSubscribe = onSnapshot(dogsCol, dogsSnap => {
      const dogsArray = dogsSnap.docs.map(dogSnap => {
        //@ts-ignore
        const dog = dogSnap.data() as Dog;
        dog.id = dogSnap.id;
        return dog;
      });
      // console.log(dogsArray); 
      for (let index = 0; index < dogsArray.length; index++) {
        let element = dogsArray[index];
        // console.log('element', element);
        // dogsArray[index].totalMints = 5;
      }
      setTopFreeDrops(dogsArray);
    });
    return () => unSubscribe();
  }, []);


  const [featureddrops, setFeaturedDrop] = useState([] as any);
  useEffect(() => {
    //  let dogsCol = collection(db, 'autoManualFeatureCollections');
    const dogsCol = query(collection(db, "autoManualFeatureCollections"), where("key", "==", 'featureddrops'));
    const unSubscribe = onSnapshot(dogsCol, dogsSnap => {
      const dogsArray = dogsSnap.docs.map(dogSnap => {
        //@ts-ignore
        const dog = dogSnap.data() as Dog;
        dog.id = dogSnap.id;
        return dog;
      });
      // console.log(dogsArray); 
      for (let index = 0; index < dogsArray.length; index++) {
        let element = dogsArray[index];
        // console.log('element', element);
        // dogsArray[index].totalMints = 5;
      }
      setFeaturedDrop(dogsArray);
    });
    return () => unSubscribe();
  }, []);


  const [featuredcollections, setFeaturedcollections] = useState([] as any);
  useEffect(() => {
    //  let dogsCol = collection(db, 'autoManualFeatureCollections');
    const dogsCol = query(collection(db, "autoManualFeatureCollections"), where("key", "==", 'featuredcollections'));
    const unSubscribe = onSnapshot(dogsCol, dogsSnap => {
      const dogsArray = dogsSnap.docs.map(dogSnap => {
        //@ts-ignore
        const dog = dogSnap.data() as Dog;
        dog.id = dogSnap.id;
        return dog;
      });
      // console.log(dogsArray); 
      for (let index = 0; index < dogsArray.length; index++) {
        let element = dogsArray[index];
        // console.log('element', element);
        // dogsArray[index].totalMints = 5;
      }
      setFeaturedcollections(dogsArray);
    });
    return () => unSubscribe();
  }, []);
////////////////////////testing/////////////

  useEffect(() => {



  }, []);
  //////////////////testinend/////////////////











        useEffect(() => {



      //  let dogsCol = collection(db, 'autoManualFeatureCollections');
       const dogsCol = query(collection(db, "autoManualFeatureCollections"), where("key", "==", 'f_mints'));


        const unSubscribe = onSnapshot(dogsCol, dogsSnap => {
            const dogsArray = dogsSnap.docs.map(dogSnap => {
              //@ts-ignore
                const dog = dogSnap.data() as Dog;
                dog.id = dogSnap.id;
                return dog;
            });
            // console.log(dogsArray);

                  
                      //  setMintsCollection(dogsArray);
                      //  setRowData(dogsArray);
                        // setMintsCustom(dogsArray);
                        // setToshow(dogsArray);

        });




        

        return () => unSubscribe();
    },[]);




        useEffect(() => {
      //  let dogsCol = collection(db, 'autoManualFeatureCollections');
       const dogsCol = query(collection(db, "autoManualFeatureCollections"), where("key", "==", 'fc'));


        const unSubscribe = onSnapshot(dogsCol, dogsSnap => {
            const dogsArray = dogsSnap.docs.map(dogSnap => {
              //@ts-ignore
                const dog = dogSnap.data() as Dog;
                dog.id = dogSnap.id;
                return dog;
            });
            // console.log(dogsArray);
                  
                      
            dogsArray.sort((a, b) => parseFloat(b.h24v) - parseFloat(a.h24v));

// setRowData(dogsArray)
                        // setMintsCustom(dogsArray);
                         setFs(dogsArray);
                         setFs1(dogsArray);

        });

        return () => unSubscribe();
    },[]);





  useEffect(() => {

    // , where("mintType", "==", 'paid') 
    const dogsCol = query(collection(db, "nftscan"), limit(100));
    //  let dogsCol = collection(db, 'autoTopTrendingMints');
    const unSubscribe = onSnapshot(dogsCol, dogsSnap => {
      const dogsArray = dogsSnap.docs.map(dogSnap => {
        //@ts-ignore
        const dog = dogSnap.data() as Dog;
        dog.id = dogSnap.id;
        return dog;
      });

      


    });

    return () => unSubscribe();
  }, []);





  const gridRef = useRef();
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
    link.setAttribute('target', '_blank');
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
        'arrow/green1.png';
    } else {
      imageElement.src =
        'arrow/red1.png';
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
  class sixHourCount {
  eGui: HTMLSpanElement | undefined;
  init(params: {
      tfHMStatus: number
    data: any; price: any; sixHourCount:any
}) {
    // console.log('paramssss',params)
    const element = document.createElement('span');
    const imageElement = document.createElement('img');
    element.appendChild(document.createTextNode(params.data.sixHourCount));
    if (params.data.sixHourCount > 999) {
      imageElement.src =
        'arrow/hot1.png';
      element.appendChild(imageElement);
    } else {
      //
    }
   
   
    
    this.eGui = element;
  }
  getGui() {
    return this.eGui;
  }
}
// This is a plain JS (not React) component
class h24v {
  eGui: HTMLSpanElement | undefined;
  init(params: {
      tfHMStatus: number
      data: any; price : any ;h24v:any
}) {
    // console.log('paramssss',params)
    const element = document.createElement('span');
    const imageElement = document.createElement('img');
    if (params.data.h24v > 0) {
      imageElement.src =
        'arrow/green1.png';
    } else {
      imageElement.src =
        'arrow/red1.png';
    }
    element.appendChild(imageElement);
    element.appendChild(document.createTextNode(params.data.h24v));
    
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
    link.setAttribute('target', '_blank');
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












// This is a plain JS (not React) component
class mintprice {
  eGui: HTMLSpanElement | undefined;
  init(params: {
      tfHMStatus: number
      chain: number
      data: any; price : any 
}) {

    const element = document.createElement('span');
    const imageElement = document.createElement('img');
    if (params.data.chain == 1) {
      imageElement.src =
        imagesMain[params.data.chain];
    } else {
      imageElement.src =
        imagesMain[params.data.chain];
    }
    // element.appendChild(imageElement);

    if(params.data.price){
      // let v:any = params.data.price/(1*1000000000000000000)
      let v:any = params.data.price
      v = v + " " + params.data.symbol
element.appendChild(document.createTextNode(v));
    }else{
      let m:any = 0;
      // m = m + " " + params.data.symbol
element.appendChild(document.createTextNode(m));
    }

    
    
    this.eGui = element;
  }
  getGui() {
    return this.eGui;
  }
}
class fprice {
  eGui: HTMLSpanElement | undefined;
  init(params: {
      tfHMStatus: number
      chain: number
      data: any; price : any 
}) {

    const element = document.createElement('span');
    const imageElement = document.createElement('img');
    if (params.data.chain == 1) {
      imageElement.src =
        imagesMain[params.data.chain];
    } else {
      imageElement.src =
        imagesMain[params.data.chain];
    }
    // element.appendChild(imageElement);

    if(params?.data.fprice?.amount?.decimal){
      let v:any = params.data.price/(1*1000000000000000000)
    //  v= parseFloat(v.toFixed(5))
      v = params?.data.fprice.amount.decimal
      v = v + " " + params.data.symbol
element.appendChild(document.createTextNode(v));
// console.log('params?.data?.fprice',params?.data.fprice.amount.decimal)
    }else{
      let m:any = 0;
      // m = m + " " + params.data.symbol
element.appendChild(document.createTextNode(m));
    }

    
    
    this.eGui = element;
  }
  getGui() {
    return this.eGui;
  }
}





  // Each Column Definition results in one Column.
  const [columnDefs2, setColumnDefs2] = useState([
    {
      headerName: 'Collection',
      cellRenderer: DeltaIndicator,
      cellStyle: function (params: any) {
        if (params.node.sixHourMint == 'Police') {
          return { color: 'red1', textAlign: 'center', };
        } else {
          // return null;
          return { color: 'red1', textAlign: 'center', };
        }
      },

      // unSortIcon: true,

    },
    {
      headerName: 'Chain',
      // unSortIcon: true,


      cellRenderer: chainHandle,
      filter: false,
      cellStyle: function (params: any) {
        if (params.node.sixHourMint == 'Police') {
          return { color: 'red1' };
        } else {
          // return null;
          return { color: 'red1' };
        }
      },
      cellClass: ["toshortimage"],

    },
    {
      headerName: 'Minting Price',
      // unSortIcon: true,


      cellRenderer: mintprice,
      filter: false,
      cellStyle: function (params: any) {
        if (params.node.sixHourMint == 'Police') {
          return { color: 'red1' };
        } else {
          // return null;
          return { color: 'red1' };
        }
      },
      cellClass: ["toshortimage"],

    },
    // {headerName: 'Minting Price',unSortIcon: true,shorting:true, field: 'price',cellStyle: function(params:any) {
    //             if (params.node.sixHourMint=='Police') {
    //                 return {color: 'red1'};
    //             } else {
    //                 // return null;
    //                 return {color: 'red1'};
    //             } 
    //         },

    //       },
    {
      headerName: 'Total Mints', unSortIcon: true, field: 'totalMints', cellStyle: function (params: any) {
        if (params.node.sixHourMint == 'Police') {
          return { color: 'red1', };
        } else {
          // return null;
          return { color: 'red1', };
        }
      },
      //  sort: 'desc',
    },
    


  ]);




























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
             
            // unSortIcon: true,
            
    },
    {
      headerName: 'Chain',
    // unSortIcon: true,
      
       
      cellRenderer: chainHandle,
      filter: false,
      cellClass: ["toshortimage"],
            
    },
    {
      headerName: 'Minting Price',
    // unSortIcon: true,
      
       
      cellRenderer: mintprice,
      filter: false,
       cellStyle: function(params:any) {
                if (params.node.sixHourMint=='Police') {
                    return {color: 'red1'};
                } else {
                    // return null;
                    return {color: 'red1'};
                } 
            },
            cellClass: ["toshortimage"],
            
    },
    // {headerName: 'Minting Price',unSortIcon: true,shorting:true, field: 'price',cellStyle: function(params:any) {
    //             if (params.node.sixHourMint=='Police') {
    //                 return {color: 'red1'};
    //             } else {
    //                 // return null;
    //                 return {color: 'red1'};
    //             } 
    //         },
           
    //       },
    {
      headerName: '6 H Mints', unSortIcon: true, field: 'sixHourCount', cellRenderer: sixHourCount, 
      cellClass: ["toshortimage"],
          //  sort: 'desc',
          },
    {headerName: '1 H Mints',unSortIcon: true, field: 'oneHourCount', cellRenderer: twinty4mintHandle,
      
      cellStyle: function(params:any) {
                if (params.node.oneHourCount=='Police') {
                    return {color: 'red1',};
                } else {
                    // return null;
                    return {color: 'red1',};
                } 
            },
            cellClass: ["toshortimage" , "toshortimage1"],
           
          },

  ]);
  // Each Column Definition results in one Column.
  const [columnDefs1, setColumnDefs1] = useState([
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
             
            // unSortIcon: true,
            
    },
    {
      headerName: 'Chain',
    // unSortIcon: true,
      
       
      cellRenderer: chainHandle,
      filter: false,
       cellStyle: function(params:any) {
                if (params.node.sixHourMint=='Police') {
                    return {color: 'red1'};
                } else {
                    // return null;
                    return {color: 'red1'};
                } 
            },
            cellClass: ["toshortimage"],
            
    },
    {
      headerName: 'Floor Price',
    // unSortIcon: true,
      
       
      cellRenderer: fprice,
      filter: false,
       cellStyle: function(params:any) {
                if (params.node.sixHourMint=='Police') {
                    return {color: 'red1'};
                } else {
                    // return null;
                    return {color: 'red1'};
                } 
            },
            cellClass: ["toshortimage"],
            
    },
    {headerName: '24h Volume',unSortIcon: true,field: 'h24v',cellStyle: function(params:any) {
                if (params.node.sixHourMint=='Police') {
                    return {color: 'red1',};
                } else {
                    // return null;
                    return {color: 'red1',};
                } 
            },
           
          },
    {headerName: '24H Sale',unSortIcon: true, field: 'h24s', cellRenderer: h24v,
      
      cellStyle: function(params:any) {
                if (params.node.oneHourCount=='Police') {
                    return {color: 'red1',};
                } else {
                    // return null;
                    return {color: 'red1',};
                } 
            },
            cellClass: ["toshortimage" , "toshortimage1"],
           
          },

  ]);

  // DefaultColDef sets props common to all Columns
  //@ts-ignore
  const defaultColDef = useMemo( ()=> ({
      sortable: true
    }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback( (event: any) => {
    // console.log('cellClicked', event);
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





















  const [myCar, setMyCar] = useState("all");







  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setMyCar(event.target.value)
    // console.log(event.target.value, myCarChain);
    // rowDataold

    if ('all' == event.target.value) {
      setRowData(rowDataold);
      return;
    }

    let newarray = [];


    if (myCarChain == 'all' || !myCarChain) {

      for (let index = 0; index < rowDataold.length; index++) {
        const element = rowDataold[index];
        // console.log(element);
        if (element?.mintType == event.target.value) {
          newarray.push(element)
        }

      }

    } else {


      for (let index = 0; index < rowDataold.length; index++) {
        const element = rowDataold[index];
        // console.log(element);
        if (element?.chain == myCarChain && element?.mintType == event.target.value) {
          newarray.push(element)
        }

      }





    }







    setRowData(newarray);
  }


  const handleChangeChain = (event: { target: any }) => {

    let vts: any = Number(event.target.value);
    // console.log(vts);
    setMyCarChain(vts);
    // console.log('vsts',InternalurlMain[vts]);
    // console.log('supabase',countries?.[0]?.[InternalurlMain[vts]]);
    // setVersion(countries?.[0]?.[InternalurlMain[vts]]);
    if ('all' == event.target.value) {
      setRowData(rowDataold);
      return;
    }
    let newarray = [];
    if (myCar == 'all' || !myCar) {


      for (let index = 0; index < rowDataold.length; index++) {
        const element = rowDataold[index];
        // console.log(element);
        if (element?.chain == event.target.value) {
          newarray.push(element)
        }

      }




    } else {


      for (let index = 0; index < rowDataold.length; index++) {
        const element = rowDataold[index];
        // console.log(element);
        if (element?.chain == event.target.value && element?.mintType == myCar) {
          newarray.push(element)
        }

      }


    }



    setRowData(newarray);


  }






  return (
    <Layout>
        <Img className='imagebg' src="../bvinvibg1.png" width="1000" height={500} alt="sdf" />
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
                       
<Flex css={{ fontSize:'14px' }} >
                          <Box css={{ mr: '$5' }}>
                            <Text style="subtitle2" color="subtle">
                              Mint Price
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
                                    {collection?.price} {collection?.symbol}
                              
                            
                            </Text>
                         
                           
                            </Box>
                          </Box>

                           {/* <Box css={{ mr: '$4' }}>
                            <Text style="subtitle2" color="subtle">
                              Total Mints
                            </Text>
                            <Text style="h4" as="h4" css={{ mt: 2, fontSize:'14px' }}>
                              {collection?.totalMints}
                            </Text>
                          </Box> */}

                        {/*  <Box css={{ mr: '$4' }}>
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


{/* ///////////////////////////divided start////////////// */}

      {/* <Box
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
            justify="between"
    
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



            <Flex css={{ width:'49%', gap: 80, '@bp600': { gap: 136 } }} >
    


              
              <Flex className='whitetheme' css={{ gap: '$4', width: '100%' }}>
                <div style={containerStyle}>
                  <div id="grid-wrapper" style={{ width: '100%', height: '100%' }}>

                    <div
                      style={gridStyle}
                      className={theme == 'light' ? 'ag-theme-alpine example-wrapper hide' : 'ag-theme-alpine-dark example-wrapper hide'}
                    >
                      <AgGridReact
                        //@ts-ignore
                        ref={gridRef} // Ref for accessing Grid's API
                        rowData={fc} // Row Data for Rows
                        columnDefs={columnDefs2} // Column Defs for Columns
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
                    </div>
                    <div
                      style={gridStyle}
                      className={theme == 'light' ? 'ag-theme-alpine example-wrapper show' : 'ag-theme-alpine-dark example-wrapper show'}
                    >
                      <AgGridReact
                        //@ts-ignore
                        ref={gridRef} // Ref for accessing Grid's API
                        rowData={rowData} // Row Data for Rows
                        columnDefs={columnDefs2} // Column Defs for Columns
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
                    </div>







                  </div>
                </div>
                </Flex>
           


            </Flex>

            <Flex
              direction="column"
              css={{ width: '49%', alignItems: 'flex-start', '@bp600': { alignItems: 'flex-end' } }}
            >


              <Flex
                justify="between"
                css={{

                  width: '100%',
                  flexDirection: 'column',
                  alignItems: 'flex-start',

                  '@bp600': {
                    flexDirection: 'row',
                    gap: 40,
                  },
                }}
              >
                <div style={containerStyle}>
                  <div id="grid-wrapper" style={{ width: '100%', height: '100%' }}>

                    <div
                      style={gridStyle}
                      className={theme == 'light' ? 'ag-theme-alpine example-wrapper hide' : 'ag-theme-alpine-dark example-wrapper hide'}
                    >
                      <AgGridReact
                        //@ts-ignore
                        ref={gridRef} // Ref for accessing Grid's API
                        rowData={fc} // Row Data for Rows
                        columnDefs={columnDefs2} // Column Defs for Columns
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
                    </div>
                    <div
                      style={gridStyle}
                      className={theme == 'light' ? 'ag-theme-alpine example-wrapper show' : 'ag-theme-alpine-dark example-wrapper show'}
                    >
                      <AgGridReact
                        //@ts-ignore
                        ref={gridRef} // Ref for accessing Grid's API
                        rowData={rowData} // Row Data for Rows
                        columnDefs={columnDefs2} // Column Defs for Columns
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
                    </div>







                  </div>
                </div>
                
              </Flex>



       
         

            </Flex>


          </Flex>





          </Box>

          </Box> */}



      {/* ///////////////////////////divided end////////////// */}


     {/* <Box
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
          justify="between"
          align="center"
          css={{ flexWrap: 'wrap', mb: '$4', gap: '$3' }}
        >
          <Text style="h4" as="h4">
            Featured Drops
          </Text>
        
        </Flex>          
          </Box>
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

 <div style={containerStyle}>
      <div id="grid-wrapper" style={{ width: '100%', height: '100%' }}>
              {/* <select style={{
                padding: "10px", margin: "0px 10px 5px 0px"
              }} value={myCar} onChange={handleChange}>
                <option value="" selected disabled>Select Mint Type</option>
                <option value="all">All Mints</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>

              <select style={{ padding: "10px", margin: "0 10px 5px 0" }} value={myCarChain} onChange={handleChangeChain} className="form-control" >
                <option value="" selected disabled>Select Chain</option>
                <option value="all">All Chains</option>
                <option value="1">Ethereum</option>
                <option value="7777777">Zora</option>
                <option value="10">Optimism</option>
                <option value="137">Polygon</option>
                <option value="42161">Arbitrum One</option>
               <option value="5">Goerli</option> 
                <option value="11155111">Sepolia</option>
                <option value="8453">Base</option>
                 <option value="80001"> Mumbai</option> 
                <option value="56">BNB Smart Chain</option>

              </select> */}
        <div
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
        </div>
<div
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
        </div>







      </div>
    </div>
{/* <div className="example-wrapper">
       <div id="myGrid" className={theme == 'light' ? 'ag-theme-alpine example-wrapper':'ag-theme-alpine-dark example-wrapper'} style={{   }} >
 
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
            domLayout='autoHeight'
            
            />
      </div>
      </div> */}
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

{/* ///////////////collections//////////
 */}








     {/* <Box
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
          justify="between"
          align="center"
          css={{ flexWrap: 'wrap', mb: '$4', gap: '$3' }}
        >
          <Text style="h4" as="h4">
            Featured Collections
          </Text>
        
        </Flex>          
          </Box>
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
            <Text>Trending Collections  </Text>


          </Flex>
        </Box>
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
  

{/* //////////start main///////////// */}

 <div style={containerStyle}>




      <div id="grid-wrapper" style={{ width: '100%', height: '100%' }}>





        <div
          style={gridStyle}
         className={theme == 'light' ? 'ag-theme-alpine example-wrapper hide':'ag-theme-alpine-dark example-wrapper hide'}
        >
           <AgGridReact
        //@ts-ignore
            ref={gridRef} // Ref for accessing Grid's API
            rowData={fc} // Row Data for Rows
            columnDefs={columnDefs1} // Column Defs for Columns
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
        </div>
<div
          style={gridStyle}
         className={theme == 'light' ? 'ag-theme-alpine example-wrapper show':'ag-theme-alpine-dark example-wrapper show'}
        >
           <AgGridReact
        //@ts-ignore
            ref={gridRef} // Ref for accessing Grid's API
            rowData={fc} // Row Data for Rows
            columnDefs={columnDefs1} // Column Defs for Columns
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
        </div>







      </div>
    </div>
{/* <div className="example-wrapper">
       <div id="myGrid" className={theme == 'light' ? 'ag-theme-alpine example-wrapper':'ag-theme-alpine-dark example-wrapper'} style={{   }} >
 
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
            domLayout='autoHeight'
            
            />
      </div>
      </div> */}
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
            <Text>Top Free Drops  </Text>


          </Flex>
        </Box>
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
      {topfreedrops &&
        //@ts-ignore
        topfreedrops.slice(0, 4).map((collection, i) => {

          return (
            <Link
              key={collection?.id}


              href={InternalurlMain[collection?.chain] + '/collection/' + collection?.address}
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

                        <Box css={{ mr: '$4' }}>
                          <Text style="subtitle2" color="subtle">
                            6 H Mints
                          </Text>
                          <Text style="h4" as="h4" css={{ mt: 2, fontSize: '14px' }}>
                            {collection?.sixHourCount}
                          </Text>
                        </Box>

                        {/*  <Box css={{ mr: '$4' }}>
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
            <Text>Featured Drops</Text>


          </Flex>
        </Box>
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
            {featureddrops &&
              //@ts-ignore
              featureddrops.slice(0, 4).map((collection, i) => {

                return (
                  <Link
                    key={collection?.id}


                    href={InternalurlMain[collection?.chain] + '/collection/' + collection?.address}
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

                              {/*  <Box css={{ mr: '$4' }}>
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
            <Text>Featured collections</Text>


          </Flex>
        </Box>
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
            {featuredcollections &&
              //@ts-ignore
              featuredcollections.slice(0, 4).map((collection, i) => {

                return (
                  <Link
                    key={collection?.id}


                    href={InternalurlMain[collection?.chain] + '/collection/' + collection?.address}
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

                              <Box css={{ mr: '$4' }}>
                                <Text style="subtitle2" color="subtle">
                                  24H Volume
                                </Text>
                                <Text style="h4" as="h4" css={{ mt: 2, fontSize: '14px' }}>
                                  {collection?.h24v}
                                </Text>
                              </Box>

                              {/*  <Box css={{ mr: '$4' }}>
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




 <Footer />
       
    </Layout>
  )
}

export default IndexPage
