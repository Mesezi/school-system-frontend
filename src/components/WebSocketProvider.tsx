"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { socket } from "@/app/socket";

const WebSocketProvider = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const authUser =
		typeof window !== "undefined" && sessionStorage.getItem("schoolSystemUser")
			? JSON.parse(sessionStorage.getItem("schoolSystemUser") ?? "")
			: null;
	const [isConnected, setIsConnected] = useState(socket.connected);

	useEffect(() => {
		if (authUser) {
			socket.connect();
			socket.emit("joinRoom", authUser?.user?.schoolId);
		}
	}, []);

	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
		}
		function onDisconnect() {
			setIsConnected(false);
		}

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		socket.on("notification", (message) => console.log(message));

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
			socket.off("notification");
		};
	}, []);

	function connect() {
		socket.connect();
	}

	function disconnect() {
		socket.disconnect();
	}

	const emitEventToServer = () => {
		// socket.emit('joinRoom', {schoolId: "test"});
		socket.emit("hello", "Hey");
		console.log("test");
	};

	return (
		<div>
			<div className='flex gap-4 p-2'>
				{/* <button onClick={connect}>Connect</button>
				<button onClick={disconnect}>Disconnect</button>
				<button onClick={emitEventToServer}>Emit</button> */}
			</div>
			{children}
		</div>
	);
};

export default WebSocketProvider;
