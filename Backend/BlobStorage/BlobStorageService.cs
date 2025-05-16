using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace Backend.BlobStorage
{
    public class BlobStorageService
    {
        private readonly BlobContainerClient _containerClient;

        public BlobStorageService(IConfiguration config)
        {
            var connectionString = config["AzureBlobStorageConnectionString"];
            var containerName = config["AzureBlobStorageContainerName"];

            _containerClient = new BlobContainerClient(connectionString, containerName);
        }

        public async Task<string> UploadFileAsync(IFormFile file, string prefix, string ext)
        {
            // 1. Delete existing blobs with the same prefix
            await foreach (var blobItem in _containerClient.GetBlobsAsync(prefix: prefix))
            {
                var existingBlobClient = _containerClient.GetBlobClient(blobItem.Name);
                await existingBlobClient.DeleteIfExistsAsync();
            }

            var blobName = $"{prefix}{ext}";
            var blobClient = _containerClient.GetBlobClient(blobName);
            using var stream = file.OpenReadStream();
            await blobClient.UploadAsync(stream, overwrite: true);
            return blobClient.Uri.ToString();
        }

        public async Task<Stream?> DownloadFileByPrefixAsync(string prefix)
        {
            await foreach (BlobItem blobItem in _containerClient.GetBlobsAsync(prefix: prefix))
            {
                // Just take the first matching blob
                var blobClient = _containerClient.GetBlobClient(blobItem.Name);
                var response = await blobClient.DownloadAsync();
                return response.Value.Content; // Returns the blob content as a stream
            }

            return null; // No blob matched the prefix
        }
    }
}
