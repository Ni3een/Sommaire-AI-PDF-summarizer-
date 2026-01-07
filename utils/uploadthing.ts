import {outFileRouter} from "@/app/api/uploadthing/core";
import {generateReactHelpers} from "@uploadthing/react";

export const {useUploadThing}=generateReactHelpers<typeof outFileRouter>();

