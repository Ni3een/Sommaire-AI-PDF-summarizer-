import {outFileRouter} from "./core"
import {createRouteHandler} from "uploadthing/next";

export const {GET,POST}=createRouteHandler({
    router:outFileRouter,
    config: {
        callbackUrl: process.env.UPLOADTHING_URL ? `${process.env.UPLOADTHING_URL}/api/uploadthing` : undefined,
    }
})