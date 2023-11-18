import React, { useEffect, useState } from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import { BsPerson } from "react-icons/bs";
import { connectWalletToSite, getWalletAddress } from "../utils/wallet";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlinePersonOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { UpdateEmailDialog } from "./UpdateEmailDialog";

export const Navbar = () => {
	const [updateName, setUpdateName] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [user, setUser] = useState({});
	const open = Boolean(anchorEl);
	const navigate = useNavigate();
	const [connectedToSite, setConnectedToSite] = useState(false);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

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

	async function checkAndUpdateNameDialog(address) {
		const user = await getUser(address);
		setUser(user);
		if (!user.updatedUsername) {
			setUpdateName(true);
		}
	}

	async function getUser() {
		// TODO
	}

	useEffect(() => {
		connectSite();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Box
			sx={{
				position: "relative",
				width: "100%",
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<UpdateEmailDialog isOpen={updateName} />
			<Box
				position={"absolute"}
				right={0}
				sx={{
					backgroundColor: "white",
					backgroundPosition: "right",
					backgroundRepeat: "no-repeat",
					width: "100vw",
					height: "100vh",
					filter: "brightness(2)",
					zIndex: -1,
				}}
			></Box>
			<div className="navbar">
				<div
					onClick={() => {
						navigate("/");
					}}
					style={{ cursor: "pointer" }}
				>
					<h1 style={{ alignItems: "flex-start", display: "flex" }}>
						Nomad Info📜
					</h1>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Box className="navlist">
						<p
							onClick={() =>
								window.open("https://github.com/leostelon/dedocker", "_blank")
							}
						>
							Github
						</p>
					</Box>
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
				</div>
			</div>
		</Box>
	);
};
