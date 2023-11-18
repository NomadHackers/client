import "../styles/Home.css";
import "../styles/navbar.css";
import { Avatar, Box, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LeftDrawer } from "../components/LeftDrawer";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlinePersonOutline } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { connectWalletToSite, getWalletAddress } from "../utils/wallet";
import { useNavigate } from "react-router-dom";
import { Welcome } from "./Welcome";

export const Home = () => {
	const [connectedToSite, setConnectedToSite] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();
	const [isWelcomeScreen, setIsWelcomeScreen] = useState(false);

	function onCloseWelcome() {
		setIsWelcomeScreen(false);
	}

	async function connectSite() {
		await connectWalletToSite();
		const address = await getWalletAddress();
		if (address && address !== "") {
			localStorage.setItem("address", address);
			setConnectedToSite(true);
			// if (token && token !== "" && token !== "undefined") {
			// 	checkAndUpdateNameDialog(address);
			// }
		}
	}

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const data = [0, 1, 2];

	useEffect(() => {
		const isWelcome = localStorage.getItem("welcome");
		if (isWelcome !== "true") {
			setIsWelcomeScreen(true);
		}
	}, []);

	return (
		<Box>
			{isWelcomeScreen ? (
				<Welcome onCloseWelcome={onCloseWelcome} />
			) : (
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<LeftDrawer />
					<Box style={{ width: `calc(100vw - 280px)` }}>
						<Box
							sx={{
								p: 2,
								pt: 3,
								display: "flex",
								color: "#4c4848",
							}}
						>
							<Box flex={3}>
								<h1
									style={{
										fontFamily: "Bebas Neue",
									}}
								>
									Embedded forever❤️
								</h1>
								<br />
								{data.map((d) => {
									return (
										<Box
											sx={{
												color: "black",
												mb: 2,
												borderBottom: "0.5px dashed #c9c9c9",
												pb: 2,
											}}
										>
											{/* Profile */}
											<Box mb={1} display={"flex"} alignItems={"center"}>
												<Avatar sx={{ width: 32, height: 32 }} />
												<Box
													style={{
														fontSize: "12px",
														fontWeight: "500",
														color: "black",
													}}
													ml={1}
												>
													<p style={{ color: "black" }}>@leostelon</p>
													<small>4:53PM 12th Nov 2023</small>
												</Box>
											</Box>
											<Box
												sx={{
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
												}}
											>
												<Box>
													<p style={{ marginTop: "4px" }}>
														Some title of the article.
													</p>
													<p
														style={{
															color: "grey",
															marginTop: "6px",
															textAlign: "justify",
														}}
													>
														Lorem ipsum dolor sit amet consectetur adipisicing
														elit. Unde ratione nemo sit explicabo? Harum
														quibusdam provident voluptas. Quod, cumque. Laborum
														veritatis laboriosam natus eum. Perspiciatis itaque
														odio quod dolorem distinctio?
													</p>
												</Box>
												<Box
													sx={{
														minWidth: "100px",
														height: "100px",
														borderRadius: "8px",
														ml: 2,
														backgroundImage: `url(${"https://miro.medium.com/v2/resize:fit:1100/format:webp/1*Q9GGI2LPnPN-DF15FBeNiA.jpeg"})`,
														backgroundPosition: "center",
														backgroundSize: "cover",
													}}
												></Box>
											</Box>
										</Box>
									);
								})}
							</Box>
							<Box flex={1} p={1}>
								<Box>
									{!connectedToSite ? (
										<Box onClick={connectSite} className="upload-button">
											Connect Wallet
										</Box>
									) : (
										<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
											<Box className="profile-icon" onClick={handleClick}>
												<BsPerson size={30} />{" "}
											</Box>
											<Menu
												sx={{ top: "4px" }}
												id="basic-menu"
												anchorEl={anchorEl}
												open={open}
												onClose={handleClose}
												MenuListProps={{
													"aria-labelledby": "basic-button",
												}}
												anchorOrigin={{
													vertical: "bottom",
													horizontal: "right",
												}}
												transformOrigin={{
													vertical: "top",
													horizontal: "right",
												}}
											>
												<MenuItem
													onClick={() => {
														const address = localStorage.getItem("address");
														navigate("/profile/" + address);
														setAnchorEl(null);
													}}
												>
													<p
														style={{
															marginRight: "4px",
															fontSize: "14px",
														}}
													>
														Profile
													</p>
													<MdOutlinePersonOutline size={20} />
												</MenuItem>
												<MenuItem
													onClick={() => {
														localStorage.clear();
														window.location.replace("/");
														setAnchorEl(null);
													}}
												>
													<p
														style={{
															marginRight: "4px",
															fontSize: "14px",
														}}
													>
														Logout
													</p>
													<HiOutlineLogout size={20} />
												</MenuItem>
											</Menu>
										</Box>
									)}
								</Box>
								<Box
									sx={{
										p: "1",
										fontSize: "14px",
										fontWeight: "500",
									}}
								>
									{/* Content Here */}
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			)}
		</Box>
	);
};
