import {NextResponse} from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";


import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";



const pdfUrl = "https://sincere-meadowlark-90.convex.cloud/api/storage/4df85cb9-66f1-46c2-a33e-492a8b9e36df"
export async function GET(req){


    const reqUrl = req.url;
    const {searchParams} = new URL(reqUrl);

    const pdfUrl = searchParams.get("pdfUrl");

    ///load the pdf
    const response = await fetch(pdfUrl);
    const data = await response.blob();
    const loader = new WebPDFLoader(data);
    const docs = await  loader.load()


    let pdfTextContent;
    docs.forEach((doc) => {
        pdfTextContent=pdfTextContent+doc.pageContent;
    })

    // splite the text into smaller chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
    });
    const texts = await  textSplitter.createDocuments([pdfTextContent])



    let splitterList =[];

    texts.forEach(text => {
        splitterList.push(text.pageContent)
    })

    return NextResponse.json({
        result: splitterList,
    })
}