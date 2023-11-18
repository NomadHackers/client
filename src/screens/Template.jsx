import "../styles/Home.css";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { LeftDrawer } from "../components/LeftDrawer";

export const Home = () => {
	useEffect(() => {}, []);

	return (
		<Box sx={{ display: "flex" }}>
			<LeftDrawer />
			<Box style={{ width: `calc(100vw - 280px)` }}>
				<Box
					sx={{
						p: 2,
						display: "flex",
						color: "#4c4848",
					}}
				>
					<Box flex={3}>
						<h2>Home 🏠</h2>
						<br />
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
