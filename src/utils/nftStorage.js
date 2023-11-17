import axios from "axios";

export class NftStorageHttpService {
    baseURL = "https://api.nft.storage";

    async pinFileToIPFS(file) {
        try {
            if (!file) return;
            const formData = new FormData();
            formData.append("file", file);
            const ipfsFile = await axios.post(this.baseURL + "/upload", formData, {
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEVBNzU5QjEyNzdiQzc3OWY2Yzg5RjAzN0IyNjhCMWE1ZTcxMzVDMDQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MjgyNDk0NTE3MCwibmFtZSI6IkRldmVsb3BtZW50IEtleSJ9.Rj6LQpCLvz0Tn9Jm3OdVQFuAw1H9Gop1X2a0Bp5Cxkg`,
                },
            });
            const data = ipfsFile.data.value;
            const assetUrl = `${process.env.REACT_APP_IPFS_BASE_URL}/${data.cid}/${data.files[0].name}`;
            return assetUrl;
        } catch (error) {
            console.log(error);
        }
    }

    async pinJSONToIPFS(data, assetUrl) {
        try {
            const jsonIpfs = await axios.post(this.baseURL + "/upload", data, {
                headers: {
                    "Content-Type": `application/json`,
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEVBNzU5QjEyNzdiQzc3OWY2Yzg5RjAzN0IyNjhCMWE1ZTcxMzVDMDQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MjgyNDk0NTE3MCwibmFtZSI6IkRldmVsb3BtZW50IEtleSJ9.Rj6LQpCLvz0Tn9Jm3OdVQFuAw1H9Gop1X2a0Bp5Cxkg`,
                },
            });
            const url = `${process.env.REACT_APP_IPFS_BASE_URL}/${jsonIpfs.data.value.cid}`;

            return url;
        } catch (error) {
            console.log(error);
        }
    }
}