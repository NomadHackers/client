import "../styles/Home.css";
import { Box, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LeftDrawer } from "../components/LeftDrawer";
import { toast } from "react-toastify";
import { RiImageEditLine } from "react-icons/ri";
import styled from "@emotion/styled";
import MDEditor from "@uiw/react-md-editor";
import { NftStorageHttpService } from "../utils/nftStorage";

export const Create = () => {
	const [title, setTitle] = useState("");
	const [loading, setLoading] = useState(false);
	const [thumbnailFile, setThumbnailFile] = useState();
	const [thumbnailFilePreview, setThumbnailFilePreview] = useState();
	const [value, setValue] = useState("");
	const nftStorageHttpService = new NftStorageHttpService();

	async function uploadToIpfs() {
		if (!title) return alert("Please ensure everything is filled.");
		setLoading(true);

		// 1. Upload file to ipfs
		const assetUrl = await nftStorageHttpService.pinFileToIPFS(thumbnailFile);

		// 2. Upload data to ipfs
		const metaDataUrl = await nftStorageHttpService.pinJSONToIPFS({
			markdown: value,
			title,
			image: assetUrl,
		});
	}

	useEffect(() => {
		if (thumbnailFile) {
			const objectUrl = URL.createObjectURL(thumbnailFile);
			setThumbnailFilePreview(objectUrl);

			return () => URL.revokeObjectURL(objectUrl);
		}
	}, [thumbnailFile]);

	return (
		<Box
			// sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
			sx={{ display: "flex" }}
		>
			<LeftDrawer />
			<Box
				style={{
					// width: `80vw`,
					// maxWidth: "1280px",
					width: `calc(100vw - 280px)`,
				}}
			>
				<Box
					sx={{
						p: 2,
						display: "flex",
						color: "#4c4848",
					}}
				>
					<Box flex={3}>
						<h2>Create</h2>
						<br />
						<Box>
							{/* Image */}
							<Box mb={2}>
								{thumbnailFilePreview ? (
									<Box
										sx={{
											width: "360px",
											height: "240px",
											borderRadius: "10px",

											backgroundImage: `url(${thumbnailFilePreview})`,
											backgroundRepeat: "no-repeat",
											backgroundSize: "cover",
											backgroundPosition: "center",

											display: "flex",
											justifyContent: "flex-end",

											mt: 1,
										}}
									>
										<IconButtonHolder
											sx={{ m: 1 }}
											component="label"
											onChange={(e) => {
												if (e.target.files[0]?.type?.split("/")[0] !== "image")
													return toast(
														"Please select a file with type image!",
														{
															type: "info",
														}
													);
												if (e.target.files[0]?.type?.split("/")[1] !== "png")
													return toast("Please only upload png images!", {
														type: "info",
													});
												setThumbnailFile(e.target.files[0]);
											}}
										>
											<RiImageEditLine />
											<input type="file" hidden />
										</IconButtonHolder>
									</Box>
								) : (
									<Button
										component="label"
										onChange={(e) => {
											console.log(e.target.files[0]?.type);
											if (e.target.files[0]?.type?.split("/")[0] !== "image")
												return toast("Please select a file with type image!", {
													type: "info",
												});
											if (e.target.files[0]?.type?.split("/")[1] !== "png")
												return toast("Please only upload png images!", {
													type: "info",
												});
											setThumbnailFile(e.target.files[0]);
										}}
										sx={{ paddingLeft: "0px", width: "100%" }}
									>
										<input type="file" hidden />

										<FileUploadContainer />
									</Button>
								)}
							</Box>
							{/* Title */}
							<Box
								className="param search-container"
								sx={{ width: "100%" }}
								mb={2}
							>
								<input
									type="text"
									id={`title`}
									placeholder="Title"
									value={title}
									onInput={(e) => {
										setTitle(e.target.value);
									}}
								/>
							</Box>
							<div data-color-mode="light">
								<MDEditor value={value} onChange={setValue} />
							</div>
							<Box>
								<Button onClick={() => uploadToIpfs()}>Upload</Button>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

const IconButtonHolder = styled(IconButton)({
	color: "white",
	backgroundColor: "#191C22",
	borderRadius: "5px",

	width: "40px",
	height: "40px",

	marginRight: "8px",
});

const FileUploadContainer = (props) => {
	return (
		<Box
			sx={{
				border: "1.5px dashed darkgrey",
				borderRadius: "10px",
				height: "200px",

				display: "flex",
				flex: 1,
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",

				bgcolor: "#c6c6c61c",
				cursor: "pointer",
			}}
			{...props}
		>
			<h4 style={{ color: "darkgrey" }}>Cover Image</h4>
			<input type="file" hidden />
		</Box>
	);
};
