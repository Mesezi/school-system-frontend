import React from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <DashboardLayout>{children}</DashboardLayout>;
}
