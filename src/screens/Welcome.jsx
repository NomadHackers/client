import "./Welcome.css";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import Sculp1 from "../assets/1-sculp.png";
import Sculp2 from "../assets/2-sculp.png";
import Sculp3 from "../assets/3-sculp.png";
import Sculp4 from "../assets/4-sculp.png";
import Sculp5 from "../assets/5-sculp.png";
import Crumbled from "../assets/old-crumpled-paper-texture-background_118047-12865.jpg";
import { IoChevronForwardOutline } from "react-icons/io5";

export const Welcome = ({ onCloseWelcome }) => {
	useEffect(() => {
		localStorage.setItem("welcome", true);
	}, []);

	return (
		<Box
			sx={{
				position: "relative",
				height: "100vh",
				width: "100vw",
				maxWidth: "100vw",
				overflow: "hidden",
				backgroundColor: "white",
				backgroundImage: `url(${Crumbled})`,
				backgroundPosition: "center",
				backgroundSize: "cover",
			}}
		>
			<img src={Sculp1} alt="1-sculp" className="emoji-design unicorn" />
			<img src={Sculp2} alt="2-sculp" className="emoji-design dog" />
			<img src={Sculp3} alt="3-sculp" className="emoji-design heart" />
			<img
				src={Sculp4}
				height={"200px"}
				alt="4-sculp"
				className="emoji-design rocket"
			/>
			<img src={Sculp5} alt="5-sculp" className="emoji-design cat" />
			<Box
				p={3}
				sx={{ display: "flex", flexDirection: "column", height: "100%" }}
			>
				<Box position={"relative"} className="content-container">
					{/* <Box className="gradient-container"></Box> */}
					<Box className="main-title">
						<p>Forever history,</p>
						<p>Preserved forever.</p>
						{/* <p>
							<span className="nft-title">Spheron & Polybase</span>
						</p> */}
					</Box>
					<Box className="welcome-button-container">
						<Box className="continue-button" onClick={onCloseWelcome}>
							<p>Continue</p>
							<Box pr={1}></Box>
							<IoChevronForwardOutline />
						</Box>
						<p className="continue-button-subtitle">
							*Built for EthGlobal Istanbul 2023, things might brake😄
						</p>
					</Box>
				</Box>
			</Box>

			{/* Image */}
			<Box
				sx={{
					position: "absolute",
					bottom: { xs: -10, md: -120 },
					width: "100vw",
				}}
				className="planesculpt"
			>
				{/* <img
					style={{
						// width: "110vw",
						width: "100%",
					}}
					src={PlaneScult}
					alt="planescultp"
				/> */}
			</Box>
		</Box>
	);
};
