import {mutation, query} from "./_generated/server";
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

export const GetFileInfo = query({
    args: {
        fileId: v.string(),
    },
    handler: async (ctx, args) => {
        console.log('Fetching file info for fileId:', args.fileId);

        try {
            // Query the database for the file
            const result = await ctx.db.query('pdfFiles')
                .filter((q) => q.eq(q.field('fileId'), args.fileId))
                .collect();

            // Log query results for debugging
            console.log('Query result:', result);

            // Handle case where no file is found
            if (result.length === 0) {
                console.warn(`No file found for fileId: ${args.fileId}`);
                throw new Error('File not found');
            }

            // Return the first file (assuming fileId is unique)
            return result[0];
        } catch (error) {
            // Log detailed error information for debugging
            console.error('Error fetching file info:', {
                message: error.message,
                stack: error.stack,
                fileId: args.fileId,
            });

            // Throw a clean error message
            throw new Error('Failed to fetch file info. Please try again later.');
        }
    },
});
