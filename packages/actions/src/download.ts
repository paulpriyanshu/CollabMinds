import { downloadFileWithProgress } from "./downloadProgress";
export const download=async (array:any,setProgress:any) => {
  console.log("hit the data")
    if (array && array.length > 0) {
        const downloadPromises = array.map((filename:string) =>
          downloadFileWithProgress(filename, (fileProgress) => {
            setProgress((prevProgress:any) => ({
              ...prevProgress,
              [filename]: fileProgress,
            }));
          })
        );
    
        await Promise.all(downloadPromises);
      }
}