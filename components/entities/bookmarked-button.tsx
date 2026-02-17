'use client';
import { Bookmark } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { toast as sonnerToast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { useCurrentUser } from '@/hooks/use-currentUser';

type ItemType = 'vocabulary' | 'grammar' | 'kanji';

interface BookmarkResponse {
	isBookmarked: boolean;
}

export function BookmarkedButton({
	itemId,
	itemType,
	isBookmarked: initialIsBookmarked = false,
	onBookmarkChange,
}: {
	itemId: string;
	itemType: ItemType;
	isBookmarked?: boolean;
	onBookmarkChange?: (isBookmarked: boolean) => void;
}) {
	const { user } = useCurrentUser();
	const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
	const [isLoading, setIsLoading] = useState(false);
	const [isCheckingStatus, setIsCheckingStatus] = useState(true);

	// Fetch bookmark status when component mounts
	useEffect(() => {
		if (!user) {
			setIsCheckingStatus(false);
			return;
		}

		const fetchBookmarkStatus = async () => {
			try {
				const response = await apiClient.get<BookmarkResponse>(
					`/bookmark/status/${user.id}/${itemId}/${itemType}`,
				);
				setIsBookmarked(response.isBookmarked);
			} catch (error) {
				console.error('Error checking bookmark status:', error);
				setIsBookmarked(initialIsBookmarked);
			} finally {
				setIsCheckingStatus(false);
			}
		};

		fetchBookmarkStatus();
	}, [user, itemId, itemType, initialIsBookmarked]);

	const handleToggleBookmark = useCallback(async () => {
		if (!user) {
			sonnerToast.error('Vui lòng đăng nhập để sử dụng tính năng này');
			return;
		}

		setIsLoading(true);
		try {
			const bookmarkData = {
				userId: user.id,
				[`${itemType}Id`]: itemId,
			};

			const response = await apiClient.post<BookmarkResponse>(
				`/bookmark/toggle`,
				bookmarkData,
			);

			const newBookmarkState = response.isBookmarked;
			setIsBookmarked(newBookmarkState);

			sonnerToast.success(
				newBookmarkState ? 'Đã thêm bookmark' : 'Đã bỏ bookmark',
				{
					description: newBookmarkState
						? 'Bookmark thành công'
						: 'Xoá bookmark thành công',
				},
			);

			onBookmarkChange?.(newBookmarkState);
		} catch (error) {
			console.error('Bookmark toggle error:', error);
			sonnerToast.error('Lỗi khi thao tác bookmark', {
				description: 'Vui lòng thử lại',
			});
		} finally {
			setIsLoading(false);
		}
	}, [user, itemId, itemType, onBookmarkChange]);

	return (
		<Button
			variant='outline'
			size='icon-sm'
			onClick={handleToggleBookmark}
			disabled={isLoading || !user || isCheckingStatus}
			className='hover:bg-gray-100 transition-colors'
			title={isBookmarked ? 'Bỏ bookmark' : 'Thêm bookmark'}
		>
			<Bookmark
				className={
					isBookmarked ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'
				}
			/>
		</Button>
	);
}
