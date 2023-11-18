import { Avatar, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LeftDrawer } from "../components/LeftDrawer";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { switchChain } from "../utils/wallet";
import Web3 from "web3";
import Wiki from "../contracts/Wikipedia.json";
import { CHAIN } from "../constant";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";

export const Article = () => {
	const { id } = useParams();
	const [article, setArticle] = useState({});

	async function getArticle(id) {
		try {
			await switchChain();
			const web3 = new Web3(window.ethereum);
			const contract = new web3.eth.Contract(Wiki.abi, CHAIN.contract_address);

			const article = await contract.methods.articlesById(id).call();
			console.log(article);
			setArticle(article);
			// article.imageHash - Image of the article
			// article.title - Title of the article

			const response = await axios.get(article.ipfsHash);
			console.log(response.data);
			// response.data.markdown =  Markdown content
		} catch (error) {
			toast(error.message);
		}
	}

	useEffect(() => {
		getArticle(id);
	}, [id]);

	return (
		<Box sx={{ display: "flex" }}>
			<LeftDrawer />
			<Box display={"flex"} style={{ width: `calc(100vw - 280px)` }}>
				<Box
					sx={{
						p: 2,
						display: "flex",
						flexDirection: "column",
						color: "#4c4848",
						flex: 3,
					}}
				>
					{/* Profile */}
					<Box mb={1} display={"flex"} alignItems={"center"}>
						<Avatar sx={{ width: 32, height: 32 }} />
						<Box
							style={{ fontSize: "12px", fontWeight: "500", color: "black" }}
							ml={1}
						>
							<p style={{ color: "black" }}>{article.author}</p>
							<small>4:53PM 12th Nov 2023</small>
						</Box>
					</Box>
					<Box
						sx={{
							width: "100%",
							height: "240px",
							borderRadius: "8px",
							backgroundImage: `url(${article.imageHash})`,
							backgroundRepeat: "no-repeat",
							backgroundPosition: "center",
							backgroundSize: "contain",
							mb: 1,
						}}
					></Box>
					<h2>{article.title}</h2>
					<br />
					<div data-color-mode="light">
						<MDEditor
							hideToolbar={true}
							contentEditable={false}
							preview="preview"
							draggable={false}
							style={{
								border: "none",
							}}
							value={`ome contentcdcd\n\nddsc`}
						/>
					</div>
				</Box>
				<Box flex={1} p={1}>
					<Box
						sx={{
							p: "1",
							fontSize: "14px",
							fontWeight: "500",
						}}
					>
						Latest articles
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
