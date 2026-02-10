'use client';
import { Bookmark } from 'lucide-react';
import { useState, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { toast as sonnerToast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { useCurrentUser } from '@/hooks/use-currentUser';

type ItemType = 'vocabulary' | 'grammar' | 'kanji';

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

	const handleToggleBookmark = useCallback(async () => {
		if (!user) {
			sonnerToast.error('Vui lòng đăng nhập để sử dụng tính năng này');
			return;
		}

		setIsLoading(true);
		try {
			if (isBookmarked) {
				// Remove bookmark - delete all bookmarks that match this item
				const bookmarks = await apiClient.get<any>('/bookmark');
				const bookmarkToDelete = bookmarks.find(
					(b: any) =>
						b.userId === user.id &&
						((itemType === 'vocabulary' && b.vocabularyId === itemId) ||
							(itemType === 'grammar' && b.grammarId === itemId) ||
							(itemType === 'kanji' && b.kanjiId === itemId))
				);

				if (bookmarkToDelete) {
					await apiClient.delete(`/bookmark/${bookmarkToDelete.id}`);
					setIsBookmarked(false);
					sonnerToast.success('Đã bỏ bookmark', {
						description: `Xoá bookmark thành công`,
					});
				}
			} else {
				// Create bookmark
				const bookmarkData: Record<string, any> = {
					userId: user.id,
				};

				if (itemType === 'vocabulary') {
					bookmarkData.vocabularyId = itemId;
				} else if (itemType === 'grammar') {
					bookmarkData.grammarId = itemId;
				} else if (itemType === 'kanji') {
					bookmarkData.kanjiId = itemId;
				}

				await apiClient.post(`/bookmark/${user.id}`, bookmarkData);
				setIsBookmarked(true);
				sonnerToast.success('Đã thêm bookmark', {
					description: 'Bookmark thành công',
				});
			}

			onBookmarkChange?.(!isBookmarked);
		} catch (error) {
			console.error('Bookmark toggle error:', error);
			sonnerToast.error('Lỗi khi thao tác bookmark', {
				description: 'Vui lòng thử lại',
			});
		} finally {
			setIsLoading(false);
		}
	}, [isBookmarked, user, itemId, itemType, onBookmarkChange]);

	return (
		<Button
			variant='outline'
			onClick={handleToggleBookmark}
			disabled={isLoading || !user}
			className='hover:bg-gray-100 transition-colors'
			title={isBookmarked ? 'Bỏ bookmark' : 'Thêm bookmark'}
		>
			{isBookmarked ? (
				<Bookmark className=' text-yellow-500' />
			) : (
				<Bookmark className='text-gray-400' />
			)}
		</Button>
	);
}
