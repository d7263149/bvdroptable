import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import * as agGrid from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useTheme } from "next-themes";
import { useMediaQuery } from 'react-responsive'
interface RowData {
    athlete: string;
    age: number;
    country: string;
    year: number;
    date: string;
    sport: string;
    gold: number;
    silver: number;
    bronze: number;
    total: number;
}

const Grid: React.FC = () => {
    const { theme: nextTheme } = useTheme()
    const [theme, setTheme] = useState<string | null>(null)
    useEffect(() => {
        if (nextTheme) {
            setTheme(nextTheme)
        }
    }, [nextTheme])
    const isMobile = useMediaQuery({ query: '(max-width: 960px' })
    const [rowData, setRowData] = useState<RowData[]>([]);
    const [gridApi, setGridApi] = useState<agGrid.GridApi | null>(null);
    const [gridColumnApi, setGridColumnApi] = useState<agGrid.ColumnApi | null>(
        null
    );
    const [myCarChain, setMyCarChain] = useState('all');
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    useEffect(() => {
        // fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        //     .then((response) => response.json())
        //     .then((data) => console.log(data));

        let ss = [{
            "athlete": "Olena Sadovnycha",
            "age": 32,
            "country": "Ukraine",
            "year": 2000,
            "date": "01/10/2000",
            "sport": "Archery",
            "gold": 0,
            "silver": 1,
            "bronze": 0,
            "total": 1
        },
        {
            "athlete": "Kateryna Serdiuk",
            "age": 17,
            "country": "Ukraine",
            "year": 2000,
            "date": "01/10/2000",
            "sport": "Archery",
            "gold": 0,
            "silver": 1,
            "bronze": 0,
            "total": 1
        },
        {
            "athlete": "Wietse van Alten",
            "age": 21,
            "country": "Netherlands",
            "year": 2000,
            "date": "01/10/2000",
            "sport": "Archery",
            "gold": 0,
            "silver": 0,
            "bronze": 1,
            "total": 1
        },
        {
            "athlete": "Sandra Wagner-Sachse",
            "age": 31,
            "country": "Germany",
            "year": 2000,
            "date": "01/10/2000",
            "sport": "Archery",
            "gold": 0,
            "silver": 0,
            "bronze": 1,
            "total": 1
        },
        {
            "athlete": "Rod White",
            "age": 23,
            "country": "United States",
            "year": 2000,
            "date": "01/10/2000",
            "sport": "Archery",
            "gold": 0,
            "silver": 0,
            "bronze": 1,
            "total": 1
        }
        ]
        setRowData(ss)
    }, []);

    const columnDefs: agGrid.ColDef[] = [
        { field: "athlete", filter: "agTextColumnFilter" },
        { field: "age", filter: "agNumberColumnFilter" },
        { field: "country", filter: "agSetColumnFilter" },
        { field: "year", filter: "agNumberColumnFilter" },
        { field: "date", filter: "agDateColumnFilter" },
        { field: "sport", filter: "agTextColumnFilter" },
        { field: "gold", filter: "agNumberColumnFilter" },
        { field: "silver", filter: "agNumberColumnFilter" },
        { field: "bronze", filter: "agNumberColumnFilter" },
        { field: "total", filter: "agNumberColumnFilter" },
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

    const scramble = () => {
        rowData.forEach(scrambleItem);
        console.log('working');
        // topRowData.forEach(scrambleItem);
        // bottomRowData.forEach(scrambleItem);
    };

    const scrambleItem = (item: any) => {
        // ['a'].forEach((colId) => {
        //   // skip 50% of the cells so updates are random
        //   if (Math.random() > 0.5) {
        //     return;
        //   }
        //   item[colId] = Math.floor(Math.random() * 100);
        // });
        item['age'] = 0;
    };


    const scrambleAndRefreshAll = () => {
        scramble();
        var params = {
            force: true,
            suppressFlash: true,
        };
        // gridRef.current.api.refreshCells(params);
        if (gridApi) {
            console.log('gridApi', gridApi)
            gridApi.refreshCells(params);
        }
    };





    const autoSizeStrategy: any = useMemo(() => {
        return {
            type: 'fitGridWidth',
        };
    }, []);
    const onGridSizeChanged = useCallback((params: any) => {
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
        console.log(event.target.value, myCarChain);
        // rowDataold

        if ('all' == event.target.value) {
            // setRowData(rowDataold);
            return;
        }

        let newarray = [];


        if (myCarChain == 'all' || !myCarChain) {

            // for (let index = 0; index < rowDataold.length; index++) {
            //     const element = rowDataold[index];
            //     console.log(element);
            //     if (element?.mintType == event.target.value) {
            //         newarray.push(element)
            //     }

            // }

        } else {


            // for (let index = 0; index < rowDataold.length; index++) {
            //     const element = rowDataold[index];
            //     console.log(element);
            //     if (element?.chain == myCarChain && element?.mintType == event.target.value) {
            //         newarray.push(element)
            //     }

            // }





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




    //////////////////mobile and desktop//////////////////////

    return isMobile ? (
        <>
            <div style={containerStyle}>




                <div id="grid-wrapper" style={{ width: '100%', height: '100%' }}>

                    <select style={{
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
                        {/* <option value="5">Goerli</option> */}
                        {/* <option value="11155111">Sepolia</option> */}
                        <option value="8453">Base</option>
                        {/* <option value="80001"> Mumbai</option> */}
                        <option value="56">BNB Smart Chain</option>
                        <option value="43114">Avalanche</option>
                        <option value="42170">Nova Arbitrum</option>

                    </select>

                    <button onClick={scrambleAndRefreshAll} style={{ background: 'green' }}>
                        Scramble &amp; Refresh All
                    </button>


                    <div
                        style={gridStyle}
                        className={theme == 'light' ? 'ag-theme-alpine example-wrapper hide' : 'ag-theme-alpine-dark example-wrapper '}
                    >
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
        </>
    ) : (
        <>
            <div style={containerStyle}>




                <div id="grid-wrapper" style={{ width: '100%', height: '100%' }}>

                    <select style={{
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
                        {/* <option value="5">Goerli</option> */}
                        {/* <option value="11155111">Sepolia</option> */}
                        <option value="8453">Base</option>
                        {/* <option value="80001"> Mumbai</option> */}
                        <option value="56">BNB Smart Chain</option>
                        <option value="43114">Avalanche</option>
                        <option value="42170">Nova Arbitrum</option>

                    </select>

                    <button onClick={scrambleAndRefreshAll} style={{ background: 'green' }}>
                        Scramble &amp; Refresh All
                    </button>



                    <div
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
                    </div>







                </div>
            </div>
        </>
    )



















};

export default Grid;