import { mutation } from "./_generated/server";
import {useMutation} from "convex/react";
import {v} from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const AddFileToDB =mutation({
    args:{
        fileId:v.string(),
        storageId:v.string(),
        fileName:v.string(),
        fileUrl:v.string(),
        createdBy:v.string()
    },
    handler:async (ctx,args) => {
         const result = await ctx.db.insert('pdfFiles',{
             storageId:args.storageId,
             fileName:args.fileName,
             fileId: args.fileId,
             fileUrl: args.fileUrl,
             createdBy:args.createdBy,
         })
    }
})

export const getFileUrl=mutation({
    args:{
        storageId:v.string(),
    },
    handler:async (ctx,args) => {
        const result = await  ctx.storage.getUrl(args.storageId);
        return result;
    }

})