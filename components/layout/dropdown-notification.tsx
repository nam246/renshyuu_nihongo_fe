"use client";

import { useState } from "react";
import {
	Bell,
	BellOff,
	Check,
	CheckCheck,
	CircleAlert,
	CircleCheck,
	Info,
	TriangleAlert,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type NotificationType = "info" | "success" | "warning" | "error";

export interface Notification {
	id: string;
	title: string;
	description?: string;
	type: NotificationType;
	createdAt: string; // ISO string
	read: boolean;
}

const typeConfig: Record<
	NotificationType,
	{ icon: React.ElementType; className: string }
> = {
	info: { icon: Info, className: "text-blue-500" },
	success: { icon: CircleCheck, className: "text-green-500" },
	warning: { icon: TriangleAlert, className: "text-yellow-500" },
	error: { icon: CircleAlert, className: "text-red-500" },
};

function timeAgo(iso: string) {
	const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
	if (seconds < 60) return "Vừa xong";
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return `${minutes} phút trước`;
	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours} giờ trước`;
	return `${Math.floor(hours / 24)} ngày trước`;
}

interface NotificationDropdownProps {
	initialNotifications?: Notification[];
}

export function NotificationDropdown({
	initialNotifications = [],
}: NotificationDropdownProps) {
	const [notifications, setNotifications] =
		useState<Notification[]>(initialNotifications);

	const unreadCount = notifications.filter((n) => !n.read).length;

	const markAsRead = (id: string) =>
		setNotifications((prev) =>
			prev.map((n) => (n.id === id ? { ...n, read: true } : n))
		);

	const markAllAsRead = () =>
		setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="relative">
					<Bell className="h-5 w-5" />
					{unreadCount > 0 && (
						<Badge
							variant="destructive"
							className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full px-1 text-[10px]"
						>
							{unreadCount > 9 ? "9+" : unreadCount}
						</Badge>
					)}
					<span className="sr-only">Thông báo</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-80 p-0">
				<DropdownMenuLabel className="flex items-center justify-between px-4 py-3">
					<span>Thông báo</span>
					{unreadCount > 0 && (
						<Button
							variant="ghost"
							size="sm"
							className="h-auto px-2 py-1 text-xs"
							onClick={markAllAsRead}
						>
							<CheckCheck className="mr-1 h-3.5 w-3.5" />
							Đọc tất cả
						</Button>
					)}
				</DropdownMenuLabel>
				<DropdownMenuSeparator className="m-0" />

				{notifications.length === 0 ? (
					<div className="flex flex-col items-center gap-2 py-10 text-muted-foreground">
						<BellOff className="h-8 w-8" />
						<p className="text-sm">Chưa có thông báo nào</p>
					</div>
				) : (
					<ScrollArea className="max-h-96">
						{notifications.map((n) => {
							const { icon: Icon, className } = typeConfig[n.type];
							return (
								<DropdownMenuItem
									key={n.id}
									// giữ dropdown mở khi bấm vào item
									onSelect={(e) => {
										e.preventDefault();
										markAsRead(n.id);
									}}
									className={cn(
										"flex cursor-pointer items-start gap-3 rounded-none px-4 py-3",
										!n.read && "bg-muted/50"
									)}
								>
									<Icon className={cn("mt-0.5 h-4 w-4 shrink-0", className)} />
									<div className="flex-1 space-y-1">
										<p
											className={cn(
												"text-sm leading-tight",
												!n.read && "font-medium"
											)}
										>
											{n.title}
										</p>
										{n.description && (
											<p className="line-clamp-2 text-xs text-muted-foreground">
												{n.description}
											</p>
										)}
										<p className="text-xs text-muted-foreground">
											{timeAgo(n.createdAt)}
										</p>
									</div>
									{n.read ? (
										<Check className="h-4 w-4 shrink-0 text-muted-foreground" />
									) : (
										<span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
									)}
								</DropdownMenuItem>
							);
						})}
					</ScrollArea>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}