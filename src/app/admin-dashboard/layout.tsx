import React from "react";
import AdminLayout from "@/components/AdminLayout";

export default function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <AdminLayout>{children}</AdminLayout>;
}
