import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { action } from "./_generated/server";
import {v} from "convex/values"; // Adjust the import based on your project structure

export const ingest = action({
    args: {
        splitText:v.any(),
        fileId:v.string(),
    },
    handler: async (ctx,args) => {
        try {
            const embeddings = new GoogleGenerativeAIEmbeddings({
                apiKey:"AIzaSyBuCVQi_8I3hHxLyIKl32OMusmO3LiW82o", // Ensure this is set in your environment
                model: "text-embedding-004",
                taskType: TaskType.RETRIEVAL_DOCUMENT,
                title: "Document title"
            });

            await ConvexVectorStore.fromTexts(
                args.splitText,
                args.fileId,
                embeddings,
                { ctx }
            );

            console.log("Texts ingested successfully!");
        } catch (error) {
            console.error("Failed to ingest texts:", error);
            throw error; // Re-throw the error to ensure it's logged by Convex
        }
    }
});



export const search = action({
    args: {
        query: v.string(),
        fileId: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            // Initialize the vector store with Google Generative AI embeddings
            const vectorStore = new ConvexVectorStore(
                new GoogleGenerativeAIEmbeddings({
                    apiKey: "AIzaSyBuCVQi_8I3hHxLyIKl32OMusmO3LiW82o", // Use environment variable
                    model: "text-embedding-004",
                    taskType: "RETRIEVAL_DOCUMENT", // Ensure this is a valid task type
                    title: "Document title", // Optional
                }),
                { ctx }
            );

            console.log(args.fileId)

            // Perform similarity search
            const results = await vectorStore.similaritySearch(args.query, 10); // Adjust the number of results as needed

            // Filter results by fileId
            const filteredResults = results.filter(
                (q) => q.metadata.fileId === args.fileId
            );

            console.log("filter Result", filteredResults);

            // Return the filtered results as a JSON string
            return JSON.stringify(filteredResults);
        } catch (error) {
            console.error("Failed to search texts:", error);
            // Return a meaningful error response
            return JSON.stringify({ error: "Failed to perform search", details: error.message });
        }
    },
});