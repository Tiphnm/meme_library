import { BlobServiceClient, ContainerClient} from '@azure/storage-blob';
import dotenv from "dotenv"
dotenv.config()
/*  Config Azure Blob Storage + Container */
const sasToken = process.env.REACT_APP_STORAGESASTOKEN ;
const containerName = "memes";
const storageAccountName = process.env.REACT_APP_STORAGE_STORAGERESOURCENAME;

/*  Disable upload button if the Storage is not configurated */
export const isStorageConfigured = () => {
  return (!storageAccountName || !sasToken) ? false : true;
}

/*  return list of blobs in container to display */ 

const getBlobsInContainer = async (containerClient: ContainerClient) => {
  const returnedBlobUrls: string[] = [];

  // get list of blobs in container
  for await (const blob of containerClient.listBlobsFlat()) {
    // if image is public, just construct URL
    returnedBlobUrls.push(
      `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
    );
  }
  return returnedBlobUrls;
}

/*  Create a new blob in the container */
const createBlobInContainer = async (containerClient: ContainerClient, file: File) => {
  
  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(file.name);
  console.log(file)

  // set mimetype as determined from browser with file upload control
  const options = { 
    blobHTTPHeaders: { blobContentType: file.type },
    metadata: {
      hello: "world"
    }
  };

  // upload file
  await blobClient.uploadData(file, options);
}
// </snippet_createBlobInContainer>

// <snippet_uploadFileToBlob>
const uploadFileToBlob = async (file: File | null): Promise<string[]> => {
  if (!file) return [];

  // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

  // get Container - full public read access
  const containerClient: ContainerClient = blobService.getContainerClient(containerName);
  await containerClient.createIfNotExists({
    access: 'container',
  });

  // upload file
  await createBlobInContainer(containerClient, file);

  // get list of blobs in container
  return getBlobsInContainer(containerClient);
};
export default uploadFileToBlob;