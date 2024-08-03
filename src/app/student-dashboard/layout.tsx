import React from 'react'
import StudentLayout from '@/components/StudentLayout'

export default function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <StudentLayout>{children}</StudentLayout>;
}

