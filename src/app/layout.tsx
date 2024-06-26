import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WebSocketProvider from "@/components/WebSocketProvider";
import StoreProvider from "@/lib/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "School",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<WebSocketProvider>
					<StoreProvider>{children}</StoreProvider>
				</WebSocketProvider>
			</body>
		</html>
	);
}
