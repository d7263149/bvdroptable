import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import * as agGrid from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useTheme } from "next-themes";
//@ts-ignore
import OBJECT_IMG from "../config/variableImage"
//@ts-ignore

import chainURL from "../config/chainURL"
//@ts-ignore
import OBJECT_VAL from "../config/variableCommon"
//@ts-ignore
import chainInternalURL from "../config/chainInternalURL"
import { db } from "../config/firebase"
import { collection, getDocs, orderBy, query, onSnapshot, doc, where, limit } from 'firebase/firestore'
import { useMediaQuery } from "react-responsive";
import { formatNumber } from "utils/numbers";
// interface RowData {
//     address: string;
//     chain: number;
//     price: number;
//     symbol: string;
//     name: string;
//     mintType: string;
//     id: string;
//     sixHourCount: number;
//     oneHourCount: number;

// }

const Grid: React.FC = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 960px' })
    //@ts-ignore
    const imagesMain: any[] = OBJECT_IMG;
    //@ts-ignore
    const OBJECT_VALm: any[] = OBJECT_VAL;
    //@ts-ignore
    const urlMain: any[] = chainURL;
    //@ts-ignore
    const InternalurlMain: any[] = chainInternalURL;
    const { theme: nextTheme } = useTheme()
    const [theme, setTheme] = useState<string | null>(null)
    useEffect(() => {
        if (nextTheme) {
            setTheme(nextTheme)
        }
    }, [nextTheme])

    // const [rowData, setRowData] = useState<RowData[]>([]);
    const [rowData, setRowData] = useState([] as any); 
    const [gridApi, setGridApi] = useState<agGrid.GridApi | null>(null);
    const [gridColumnApi, setGridColumnApi] = useState<agGrid.ColumnApi | null>(
        null
    );
    const [myCarChain, setMyCarChain] = useState('all');
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    let ageType = 'all';
    let ageChain = 'all';

    //@ts-ignore
    const [dogs, setDogs] = React.useState<Dog[]>([]);

    useEffect(() => {


        const dogsCol = query(collection(db, "autoTopTrendingMints"), where("sixHourCount", "!=", 0), limit(1000));
        //  const dogsCol = query(collection(db, "autoTopTrendingMints") , limit(1000));
        //  let dogsCol = collection(db, 'autoTopTrendingMints');
        const unSubscribe = onSnapshot(dogsCol, dogsSnap => {
            const dogsArray = dogsSnap.docs.map(dogSnap => {
                //@ts-ignore
                const dog = dogSnap.data() as Dog;
                dog.id = dogSnap.id;
                return dog;
            });

            dogsArray.sort((a, b) => parseFloat(b.sixHourCount) - parseFloat(a.sixHourCount));
            
            if (rowData){

                rowData.forEach(scrambleItem);
                
                if (gridApi) {
                    var params = {
                        force: false,
                        suppressFlash: false,
                    };

                    gridApi.refreshCells(params);
                    let minttype = document.getElementById('minttype') as HTMLSelectElement;
                    let chain = document.getElementById('chain') as HTMLSelectElement;
                    let mintvalue = minttype?.value;
                    let chainvalue = chain?.value;
                    externalFilterChanged(mintvalue, chainvalue)
                }

                if (gridApi && 0) {
                    console.log('grid start working')

                var rowCount = gridApi.getDisplayedRowCount();
                // pick 20 cells at random to update
                    console.log('rowCount', rowCount);
                    for (var i = 0; i < rowCount; i++) {
                    var row = Math.floor(Math.random() * rowCount);
                    var rowNode = gridApi.getDisplayedRowAtIndex(row);
                    // var col = ['sixHourCount'][i % 6];
                   
                    

                        ['sixHourCount', 'oneHourCount'].forEach((colId) => {
                            // skip 50% of the cells so updates are random
                            if (dogsArray?.[i]?.sixHourCount){

                            }

 //@ts-ignore
                            rowNode.setDataValue(colId, Math.floor(Math.random() * 10000));

                            
                            // item[colId] = Math.floor(Math.random() * 100);
                        });









                }
                }

            }else{
              setRowData(dogsArray)  
            }
            setRowData(dogsArray)

        });

        return () => unSubscribe();
    }, []);


    const scramble = () => {
        rowData.forEach(scrambleItem);
        console.log('working');
        // topRowData.forEach(scrambleItem);
        // bottomRowData.forEach(scrambleItem);
    };

    const scrambleItem = (item: any) => {
        ['sixHourCount', 'oneHourCount'].forEach((colId) => {
            // skip 50% of the cells so updates are random
            if (Math.random() > 0.5) {
                return;
            }
            item[colId] = Math.floor(Math.random() * 100);
        });

        // item['sixHourCount'] = Math.floor(Math.random() * 100);
        // item['oneHourCount'] = Math.floor(Math.random() * 100);

    };


    const scrambleAndRefreshAll = () => {
        scramble();
        var params = {
            force: false,
            suppressFlash: false,
        };
        // gridRef.current.api.refreshCells(params);
        if (gridApi) {
            console.log('gridApi', gridApi)
            gridApi.refreshCells(params);
        }
    };


    // useEffect(() => {
    //     // fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
    //     //     .then((response) => response.json())
    //     //     .then((data) => console.log(data));



        

    //     let ss = [
    //         {
    //             "contact": "0x777b425f6bf8474b0e61f42e880d09e610a9400e",
    //             "createdAt": "2023-11-24T03:35:10.647Z",
    //             "mintType": "free",
    //             "chain": "137",
    //             "key": "auto",
    //             "name": "Unidentified contract 94ffee4a-c55d-41ee-980a-487c5bc4bfa7",
    //             "address": "0x777b425f6bf8474b0e61f42e880d09e610a9400e",
    //             "symbol": "MATIC",
    //             "image": "",
    //             "fprice": null,
    //             "oneHourCount": 377,
    //             "price": 0,
    //             "sixHourCount": 3384,
    //             "id": "0x777b425f6bf8474b0e61f42e880d09e610a9400e"
    //         }
    //     ]
    //     // setRowData(ss)
    // }, []);
////////////////////////////////////
    class DeltaIndicator {
        eGui: HTMLSpanElement | undefined | any;
        init(params: {
            data: any; price: any; image: any; chain: any; address: any
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
            element1.href = "working";
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


            this.eGui = element;
        }
        getGui() {
            return this.eGui;
        }
    }

    class chainHandle {
        eGui: HTMLSpanElement | undefined | any;
        init(params: {
            data: any; price: any; image: any; chain: any; address: any
        }) {
            // console.log('paramssss',params)
            const element = document.createElement('span');
            const element1 = document.createElement('a');
            const imageElement = document.createElement('img');
            // console.log('params.data.image',params.data.image)
            if (imagesMain[params.data.chain]) {
                imageElement.src = `../../../${imagesMain[params.data.chain]}`;
            } else {
                imageElement.src = "../../../" + imagesMain['1'];;;
            }
            element1.href = "working";
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


            this.eGui = element;
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
            data: any; price: any
        }) {

            const element = document.createElement('span');
            const imageElement = document.createElement('img');
            if (params.data.chain == 1) {
                imageElement.src =
                    "../../../" + imagesMain[params.data.chain];
            } else {
                imageElement.src =
                    "../../../" + imagesMain[params.data.chain];
            }
            // element.appendChild(imageElement);

            if (params.data.price) {
                // let v:any = params.data.price/(1*1000000000000000000)
                let v: any = params.data.price
                //  v= parseFloat(v.toFixed(5))
                v = v + " " + params.data.symbol
                element.appendChild(document.createTextNode(v));
            } else {
                let m: any = 0;
                element.appendChild(document.createTextNode(m));
            }



            this.eGui = element;
        }
        getGui() {
            return this.eGui;
        }
    }

    class sixHourCount {
        eGui: HTMLSpanElement | undefined;
        init(params: {
            tfHMStatus: number
            data: any; price: any; sixHourCount: any
        }) {
            // console.log('paramssss',params)
            const element = document.createElement('span');
            const imageElement = document.createElement('img');
            element.appendChild(document.createTextNode(params.data.sixHourCount));
            if (params.data.sixHourCount > 999) {
                imageElement.src =
                    '../../../arrow/hot1.png';
                element.appendChild(imageElement);
            } else {

            }



            this.eGui = element;
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
            data: any; price: any; oneHourCount: any
        }) {
            // console.log('paramssss',params)
            const element = document.createElement('span');
            const imageElement = document.createElement('img');
            if (params.data.oneHourCount > 0) {
                imageElement.src =
                    '../../../arrow/green1.png';
            } else {
                imageElement.src =
                    '../arrow/red1.png';
            }
            element.appendChild(imageElement);
            element.appendChild(document.createTextNode(params.data.oneHourCount));

            this.eGui = element;
        }
        getGui() {
            return this.eGui;
        }
    }


////////////////////////////////////





    const columnDefs: agGrid.ColDef[] = [
        {
            headerName: 'Collection',
            cellRenderer: DeltaIndicator,
            enableCellChangeFlash:false,
            suppressCellFlash: true 
        },
        {
            headerName: 'Chain',
            cellRenderer: chainHandle,
            filter: false,
            cellClass: ["toshortimage"],
            enableCellChangeFlash: false,
            suppressCellFlash: true 
        },
        {
            headerName: 'Minting Price',
            enableCellChangeFlash: false,
            suppressCellFlash: true,
            cellRenderer: mintprice,
            filter: false,
            cellClass: ["toshortimage"],

        },
        {
            headerName: '6 H Mints', unSortIcon: true, field: 'sixHourCount', cellRenderer: sixHourCount,

            cellClass: ["toshortimage"],
            //  sort: 'desc',
        },
        {
            headerName: '1 H Mints', unSortIcon: true, field: 'oneHourCount', cellRenderer: twinty4mintHandle,

            cellClass: ["toshortimage", "toshortimage1"],

        },
    ];

    const defaultColDef: agGrid.ColDef = {
        flex: 1,
        minWidth: 100,
        resizable: true,
    };

    const onGridReady = (params: agGrid.GridReadyEvent) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

    const onPaginationChanged = () => {
        console.log("onPaginationChanged");
    };

    const clearFilters = () => {
        if (gridApi) {
            gridApi.setFilterModel(null);
        }
    };







    const autoSizeStrategy: any = useMemo(() => {
        if (isMobile){

        }else{

        }
        // return {
        //     type: 'fitGridWidth',
        //     defaultMinWidth: 940,
        // };
    }, []);



    // const onGridSizeChanged = useCallback((params: any) => {
    //     // get the current grids width
    //     //@ts-ignore
    //     var gridWidth = document.getElementById('grid-wrapper').offsetWidth;
    //     // keep track of which columns to hide/show
    //     var columnsToShow = [];
    //     var columnsToHide = [];
    //     // iterate over all columns (visible or not) and work out
    //     // now many columns can fit (based on their minWidth)
    //     var totalColsWidth = 0;
    //     var allColumns = params.api.getColumns();
    //     if (allColumns && allColumns.length > 0) {
    //         for (var i = 0; i < allColumns.length; i++) {
    //             var column = allColumns[i];
    //             totalColsWidth += column.getMinWidth() || 0;
    //             if (totalColsWidth > gridWidth) {
    //                 columnsToHide.push(column.getColId());
    //             } else {
    //                 columnsToShow.push(column.getColId());
    //             }
    //         }
    //     }
    //     // show/hide columns based on current grid width
    //     params.api.setColumnsVisible(columnsToShow, true);
    //     params.api.setColumnsVisible(columnsToHide, false);
    //     // fill out any available space to ensure there are no gaps
    //     params.api.sizeColumnsToFit();
    // }, []);



    const [myCar, setMyCar] = useState("all");






    const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setMyCar(event.target.value)
        console.log(event.target.value, myCarChain);
        // rowDataold

        let minttype = document.getElementById('minttype') as HTMLSelectElement;
        let chain = document.getElementById('chain') as HTMLSelectElement;
        let mintvalue = minttype?.value;
        let chainvalue = chain?.value;
        externalFilterChanged(mintvalue, chainvalue)
        // console.log(mintvalue, chainvalue);
        if ('all' == event.target.value) {
            // setRowData(rowDataold);
            return;
        }

      



        // setRowData(newarray);
    }


    const handleChangeChain = (event: { target: any }) => {

        let vts: any = Number(event.target.value);
        console.log(vts);
        setMyCarChain(vts);
        // console.log('vsts',InternalurlMain[vts]);
        // console.log('supabase',countries?.[0]?.[InternalurlMain[vts]]);
        // setVersion(countries?.[0]?.[InternalurlMain[vts]]);
        if ('all' == event.target.value) {
            // setRowData(rowDataold);
            return;
        }
        let newarray = [];
        if (myCar == 'all' || !myCar) {


            // for (let index = 0; index < rowDataold.length; index++) {
            //     const element = rowDataold[index];
            //     // console.log(element);
            //     if (element?.chain == event.target.value) {
            //         newarray.push(element)
            //     }

            // }




        } else {


            // for (let index = 0; index < rowDataold.length; index++) {
            //     const element = rowDataold[index];
            //     // console.log(element);
            //     if (element?.chain == event.target.value && element?.mintType == myCar) {
            //         newarray.push(element)
            //     }

            // }


        }



        // setRowData(newarray);


    }
    const gridOptions = {
        getRowId: (params: { data: { id: any; }; }) => params.data.id,
        defaultColDef: {
            flex: 1,
            cellClass: 'align-right',
            enableCellChangeFlash: true,
            valueFormatter: (params: { value: any; }) => {
                return formatNumber(params.value);
            },
           
        },
    }
///////////////////////filter////////////////
  

    const externalFilterChanged = useCallback((newValue: any,Chainvalue:any) => {
        if (gridApi){
         ageType = newValue;
            ageChain = Chainvalue;
            gridApi.onFilterChanged();   
        }
        
    }, []);

    const isExternalFilterPresent = useCallback(() => {
        // if ageType is not everyone, then we are filtering
        return ageType !== 'everyone';
        // return ageType !== 'all';
    }, []);

    const doesExternalFilterPass = useCallback(
        (node: { data: {
            price: number;
            chain: number;
            sixHourCount: number; age: number; date: any; 
}; }) => {

            // console.log('ageChain', ageChain)
            // console.log('ageType', ageType)



// console.log('node.data', node.data)

         
                
                if (ageType == 'all' && ageChain == 'all'){
                    
                    return true;
                } else if (ageType != 'all' && ageChain != 'all') {

                  
                    if (ageType == 'free') {
           
                        return node.data.price == 0 && node.data.chain == Number(ageChain);
                    } else {
                     
                        return node.data.price != 0 && node.data.chain == Number(ageChain);
                    }


                }
                else if (ageChain == 'all'){
                    if (ageType == 'free'){
                     
                      return node.data.price == 0;  
                    }else{
                   
                        return node.data.price > 0;  
                    }
                     
                } else if (ageType == 'all'){
                    return node.data.chain == Number(ageChain);

                }

            //    ageType = 'below25';

            //     switch (ageType) {
            //         case 'below25':
            //             return node.data.price == 0;  
                 
            //         default:
            //             return true;
            //     }
          
            return true;
        },
        [ageType, ageChain]
    );

    return (
        <>
            <div style={containerStyle}>




                <div id="grid-wrapper" style={{ width: '100%', height: '100%' }}>

                    <select id="minttype" style={{
                        padding: "10px", margin: "0px 10px 5px 0px"
                    }} 
                    onChange={handleChange}
                    >
                        <option value="" selected disabled>Select Mint Type</option>
                        <option value="all">All Mints</option>
                        <option value="free">Free</option>
                        <option value="paid">Paid</option>
                        {/* <option value="below25">below25</option> */}
                    </select>

                    <select id="chain" style={{ padding: "10px", margin: "0 10px 5px 0" }} onChange={handleChange} className="form-control" >
                        <option value="" selected disabled>Select Chain</option>
                        <option value="all">All Chains</option>
                        <option value="1">Ethereum</option>
                        <option value="7777777">Zora</option>
                        <option value="10">Optimism</option>
                        <option value="137">Polygon</option>
                        <option value="42161">Arbitrum One</option>
                        {/* <option value="5">Goerli</option> */}
                        {/* <option value="11155111">Sepolia</option> */}
                        <option value="8453">Base</option>
                        {/* <option value="80001"> Mumbai</option> */}
                        <option value="56">BNB Smart Chain</option>
                        <option value="43114">Avalanche</option>
                        <option value="42170">Nova Arbitrum</option>

                    </select>

                   

                    <div
                        style={gridStyle}
                        className={theme == 'light' ? 'ag-theme-alpine example-wrapper ' : 'ag-theme-alpine-dark example-wrapper '}
                    >
                        {/* {isMobile && 
                            <AgGridReact
                                //@ts-ignore hide

                                rowData={rowData} // Row Data for Rows
                                columnDefs={columnDefs} // Column Defs for Columns
                                defaultColDef={defaultColDef} // Default Column Properties
                                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                                rowSelection='multiple' // Options - allows click selection of rows
                                onGridReady={onGridReady}
                                enableCellChangeFlash={true}
                                //@ts-ignore
                                // autoSizeStrategy={autoSizeStrategy}
                                // onGridSizeChanged={onGridSizeChanged}
                                domLayout='autoHeight'
                            />
                            
                            } */}
                        {1 &&
                            // <AgGridReact
                            //     //@ts-ignore
                            
                            //     rowData={rowData} // Row Data for Rows
                            //     columnDefs={columnDefs} // Column Defs for Columns
                            //     defaultColDef={defaultColDef} // Default Column Properties
                            //     animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                            //     rowSelection='multiple' // Options - allows click selection of rows
                             
                            //     enableCellChangeFlash={true}
                            //     //@ts-ignore
                             
                            //     onGridSizeChanged={onGridSizeChanged}
                            //     domLayout='autoHeight'
                            // />
                            <AgGridReact
                                //@ts-ignore hide
                            gridOptions={gridOptions}
                                rowData={rowData} // Row Data for Rows
                                columnDefs={columnDefs} // Column Defs for Columns
                                defaultColDef={defaultColDef} // Default Column Properties
                                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                                rowSelection='multiple' // Options - allows click selection of rows
                                onGridReady={onGridReady}
                                enableCellChangeFlash={true}
                                //@ts-ignore
                                // autoSizeStrategy={autoSizeStrategy}
                                // onGridSizeChanged={onGridSizeChanged}
                                domLayout='autoHeight'
                            isExternalFilterPresent={isExternalFilterPresent}
                            //@ts-ignore
                            doesExternalFilterPass={doesExternalFilterPass}
                            />
                            }
                        
                    </div>
                    {/* <div
                        style={gridStyle}
                        className={theme == 'light' ? 'ag-theme-alpine example-wrapper show' : 'ag-theme-alpine-dark example-wrapper show'}
                    >
                        <AgGridReact
                            //@ts-ignore

                            rowData={rowData} // Row Data for Rows
                            columnDefs={columnDefs} // Column Defs for Columns
                            defaultColDef={defaultColDef} // Default Column Properties
                            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                            rowSelection='multiple' // Options - allows click selection of rows
                            enableCellChangeFlash={true}
                            //@ts-ignore
                            autoSizeStrategy={autoSizeStrategy}
                            onGridSizeChanged={onGridSizeChanged}
                            domLayout='autoHeight'
                        />
                    </div> */}







                </div>
            </div>

            {/* </div>
    //     <div className="ag-theme-alpine grid-container">
    //         <button onClick={scrambleAndRefreshAll} style={{ background: 'green' }}>
    //             Scramble &amp; Refresh All
    //         </button>
    //         <div className="flex justify-between align-middle mb-4 text-lg text-[#4b5563] ">
    //             <button
    //                 className="rounded bg-gray-200 px-3 py-1"
    //                 onClick={clearFilters}
    //             >
    //                 Clear Filters
    //             </button>
    //         </div>
    //         <AgGridReact
    //             className="ag-grid"
    //             columnDefs={columnDefs}
    //             rowData={rowData}
    //             defaultColDef={defaultColDef}
    //             onGridReady={onGridReady}
    //             pagination={true}
    //             paginationPageSize={50}
    //             onPaginationChanged={onPaginationChanged}
    //         ></AgGridReact>
    //         <style jsx global>{`
    //     .grid-container {
    //       height: 800px;
    //       width: 100%;
    //     }
    //     .ag-grid .ag-cell {
    //       padding: 0.5rem;
    //       font-size: 1.2rem;
    //       color: #4b5563;
    //       border-color: #e5e7eb;
    //       line-height: 1.5;
    //     }
    //     .ag-grid .ag-header-cell {
    //       font-weight: 600;
    //       font-size: 1.2rem;
    //       color: #374151;
    //       background-color: #f9fafb;
    //       border-color: #e5e7eb;
    //     }
    //   `}</style>
    //     </div> */}
        </>
    );
};

export default Grid;