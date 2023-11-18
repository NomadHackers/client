import Web3 from "web3";

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export const SERVER_URL_X = process.env.REACT_APP_SERVER_URL_X;

export const PrimaryGrey = "#828488";

export const ChainsConfig = {
	POLYGON_TESTNET: {
		chainId: Web3.utils.toHex(80001),
		rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
		chainName: "Polygon Testnet",
		nativeCurrency: {
			name: "tMATIC",
			symbol: "tMATIC",
			decimals: 18,
		},
		blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
		contract_address: "0x252175dE02aA10Cf2efEa91b5FD57D937228bb51",
	},
};

export const CHAIN = ChainsConfig["POLYGON_TESTNET"];