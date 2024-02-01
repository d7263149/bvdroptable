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
    useEffect(() => {
        if (nextTheme) {
            setTheme(nextTheme)
        }
    }, [nextTheme])



    ///////////////////////////////////start firebase ///////////




    useEffect(() => {



        //  let dogsCol = collection(db, 'autoManualFeatureCollections');
        const dogsCol = query(collection(db, "manualFeatureCollections"), where("chain", "==", '42161'));


        const unSubscribe = onSnapshot(dogsCol, dogsSnap => {
            const dogsArray = dogsSnap.docs.map(dogSnap => {
                //@ts-ignore
                const dog = dogSnap.data() as Dog;
                dog.id = dogSnap.id;
                return dog;
            });
            console.log('dogsArray',dogsArray);



        });

        return () => unSubscribe();
    }, []);











    return (
        <Layout>
     
        <></>
        </Layout>
    )
}

export default IndexPage
