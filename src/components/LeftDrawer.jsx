import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	AiFillDatabase,
	AiFillHome,
	AiFillPlusCircle,
	AiOutlineDatabase,
	AiOutlineHome,
	AiOutlinePlusCircle,
} from "react-icons/ai";
import { MdNotifications, MdNotificationsActive } from "react-icons/md";

const drawerWidth = 260;

const mainList = [
	{
		text: "Home",
		i: () => <AiOutlineHome />,
		ai: () => <AiFillHome />,
		path: "/",
	},
	{
		text: "Notifications",
		i: () => <MdNotifications />,
		ai: () => <MdNotificationsActive />,
		path: "/notifications",
	},
	{
		text: "Your Posts",
		i: () => <AiOutlineDatabase />,
		ai: () => <AiFillDatabase />,
		path: "/datasets",
	},
	{
		text: "Create Post",
		i: () => <AiOutlinePlusCircle />,
		ai: () => <AiFillPlusCircle />,
		path: "/create",
	},
];

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	borderRight: "none !important",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

const open = true;

export function LeftDrawer({ smaller }) {
	const location = useLocation();
	const navigate = useNavigate();
	const [index, setIndex] = useState(0);

	function updateIndex(path) {
		switch (path.split("/")[1]) {
			case "home":
				return setIndex(0);
			case "jobs":
				return setIndex(1);
			case "datasets":
				return setIndex(2);
			case "models":
				return setIndex(3);
			case "marketplace":
				return setIndex(4);
			default:
				setIndex(0);
		}
	}

	useEffect(() => {
		updateIndex(location.pathname);
	}, [location.pathname]);

	return (
		<Drawer
			variant="permanent"
			open={smaller ? false : open}
			sx={{
				mt: 2,
				borderRight: "none",
			}}
		>
			<Box
				sx={{
					backgroundColor: "white",
					display: "flex",
					justifyContent: "space-between",
					flexDirection: "column",
					height: "100%",
					color: "#4c4848",
					p: 3,
				}}
			>
				<Box>
					{/* Logo */}
					<Box sx={{ mb: 6, display: "flex", alignItems: "center" }}>
						<h2 style={{ paddingTop: "8px" }}>Forever.</h2>
					</Box>

					{/* Menu List */}
					<Box>
						{mainList.map(({ text, i, ai, path }, ind) => (
							<Box
								key={text}
								onClick={() => navigate(path)}
								sx={{
									backgroundColor: index === ind ? "#444444" : "",
									borderRadius: "8px",
									p: 1,
									py: 1.5,
									mb: 0.4,
									cursor: "pointer",
									"&:hover": {
										background: index === ind ? "" : "rgb(38 38 38 / 35%)",
										color: "white",
									},
								}}
							>
								<Box
									sx={{
										justifyContent: open ? "initial" : "center",
										color: index === ind ? "white" : "#444444",
										alignItems: "center",
										display: "flex",
										"&:hover": {
											color: "white",
										},
									}}
								>
									<Box
										sx={{
											mr: 2,
											fontSize: "20px",
											display: "flex",
										}}
									>
										{index === ind ? ai() : i()}
									</Box>
									<Box
										sx={{
											opacity: open ? 1 : 0,
										}}
									>
										{text}
									</Box>
								</Box>
							</Box>
						))}
					</Box>
				</Box>
			</Box>
		</Drawer>
	);
}
