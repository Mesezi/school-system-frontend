import React from "react";
import { ClassProvider } from "@/Providers/ClassContext";

function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <ClassProvider>{children}</ClassProvider>;
}

export default layout;
