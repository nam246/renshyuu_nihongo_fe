import { Lesson } from '@/types';
import LessonItem from '@/app/practice/_components/lesson-item';

export default function PracticeGrammarPage() {
	const lessons: Lesson[] = [
		{
			id: '1',
			lessonNumber: 1,
			grammar: [
				{
					id: 'avc',
					pattern: 'だ',
					structure: 'Danh từ + だ, [な] Tính từ + だ',
					explaination:
						'だ là một động từ trợ trong tiếng Nhật hoạt động như một cách diễn đạt sự quyết tâm, hoặc khẳng định mạnh mẽ. Nó đơn giản chỉ ra rằng một cái gì đó "là" theo một cách nhất định. Nó là một tương đương thân mật của です (một động từ trợ khác).だ luôn phải được gắn vào cuối các danh từ, hoặc các từ có thể hành xử như danh từ, chẳng hạn như な-Tính từ.',
					notes:
						"だ không bao giờ nên được gắn vào cuối Tính từ đuôi い. Trong những trường hợp này, người ta cho rằng việc gắn một tương đương lịch sự, như です, là đúng hơn. 大おおきいだ。Nó lớn. (Không tự nhiên trong tiếng Nhật)大おおきいです。Nó lớn. (Tự nhiên trong tiếng Nhật)Trong khi だ thường được coi là 'dạng' thông thường của です, điều đó thực sự là không chính xác. です là một từ trong lời nói lịch sự. Phiên bản 'trang trọng chính thức' của だ là である. Chúng ta sẽ học điểm ngữ pháp này một chút sau. である thường thấy trong các bài báo và văn viết trang trọng, trong khi です thì phổ biến hơn trong lời nói lịch sự.",
					examples:
						'アイスクリームだ。(Danh từ + だ) Nó là kem. お寺てらだ。(Danh từ + だ) Nó là một ngôi đền. 危険きけんだ。(な-Tính từ + だ) Nó là nguy hiểm. 大切たいせつだ。(な-Tính từ + だ) Nó là quan trọng.',
					level: 'N5',
				},
				{
					id: 'avc',
					pattern: 'だ',
					structure: 'Danh từ + だ, [な] Tính từ + だ',
					explaination:
						'だ là một động từ trợ trong tiếng Nhật hoạt động như một cách diễn đạt sự quyết tâm, hoặc khẳng định mạnh mẽ. Nó đơn giản chỉ ra rằng một cái gì đó "là" theo một cách nhất định. Nó là một tương đương thân mật của です (một động từ trợ khác).だ luôn phải được gắn vào cuối các danh từ, hoặc các từ có thể hành xử như danh từ, chẳng hạn như な-Tính từ.',
					notes:
						"だ không bao giờ nên được gắn vào cuối Tính từ đuôi い. Trong những trường hợp này, người ta cho rằng việc gắn một tương đương lịch sự, như です, là đúng hơn. 大おおきいだ。Nó lớn. (Không tự nhiên trong tiếng Nhật)大おおきいです。Nó lớn. (Tự nhiên trong tiếng Nhật)Trong khi だ thường được coi là 'dạng' thông thường của です, điều đó thực sự là không chính xác. です là một từ trong lời nói lịch sự. Phiên bản 'trang trọng chính thức' của だ là である. Chúng ta sẽ học điểm ngữ pháp này một chút sau. である thường thấy trong các bài báo và văn viết trang trọng, trong khi です thì phổ biến hơn trong lời nói lịch sự.",
					examples:
						'アイスクリームだ。(Danh từ + だ) Nó là kem. お寺てらだ。(Danh từ + だ) Nó là một ngôi đền. 危険きけんだ。(な-Tính từ + だ) Nó là nguy hiểm. 大切たいせつだ。(な-Tính từ + だ) Nó là quan trọng.',
					level: 'N5',
				},
				{
					id: 'avc',
					pattern: 'だ',
					structure: 'Danh từ + だ, [な] Tính từ + だ',
					explaination:
						'だ là một động từ trợ trong tiếng Nhật hoạt động như một cách diễn đạt sự quyết tâm, hoặc khẳng định mạnh mẽ. Nó đơn giản chỉ ra rằng một cái gì đó "là" theo một cách nhất định. Nó là một tương đương thân mật của です (một động từ trợ khác).だ luôn phải được gắn vào cuối các danh từ, hoặc các từ có thể hành xử như danh từ, chẳng hạn như な-Tính từ.',
					notes:
						"だ không bao giờ nên được gắn vào cuối Tính từ đuôi い. Trong những trường hợp này, người ta cho rằng việc gắn một tương đương lịch sự, như です, là đúng hơn. 大おおきいだ。Nó lớn. (Không tự nhiên trong tiếng Nhật)大おおきいです。Nó lớn. (Tự nhiên trong tiếng Nhật)Trong khi だ thường được coi là 'dạng' thông thường của です, điều đó thực sự là không chính xác. です là một từ trong lời nói lịch sự. Phiên bản 'trang trọng chính thức' của だ là である. Chúng ta sẽ học điểm ngữ pháp này một chút sau. である thường thấy trong các bài báo và văn viết trang trọng, trong khi です thì phổ biến hơn trong lời nói lịch sự.",
					examples:
						'アイスクリームだ。(Danh từ + だ) Nó là kem. お寺てらだ。(Danh từ + だ) Nó là một ngôi đền. 危険きけんだ。(な-Tính từ + だ) Nó là nguy hiểm. 大切たいせつだ。(な-Tính từ + だ) Nó là quan trọng.',
					level: 'N5',
				},
				{
					id: 'avc',
					pattern: 'だ',
					structure: 'Danh từ + だ, [な] Tính từ + だ',
					explaination:
						'だ là một động từ trợ trong tiếng Nhật hoạt động như một cách diễn đạt sự quyết tâm, hoặc khẳng định mạnh mẽ. Nó đơn giản chỉ ra rằng một cái gì đó "là" theo một cách nhất định. Nó là một tương đương thân mật của です (một động từ trợ khác).だ luôn phải được gắn vào cuối các danh từ, hoặc các từ có thể hành xử như danh từ, chẳng hạn như な-Tính từ.',
					notes:
						"だ không bao giờ nên được gắn vào cuối Tính từ đuôi い. Trong những trường hợp này, người ta cho rằng việc gắn một tương đương lịch sự, như です, là đúng hơn. 大おおきいだ。Nó lớn. (Không tự nhiên trong tiếng Nhật)大おおきいです。Nó lớn. (Tự nhiên trong tiếng Nhật)Trong khi だ thường được coi là 'dạng' thông thường của です, điều đó thực sự là không chính xác. です là một từ trong lời nói lịch sự. Phiên bản 'trang trọng chính thức' của だ là である. Chúng ta sẽ học điểm ngữ pháp này một chút sau. である thường thấy trong các bài báo và văn viết trang trọng, trong khi です thì phổ biến hơn trong lời nói lịch sự.",
					examples:
						'アイスクリームだ。(Danh từ + だ) Nó là kem. お寺てらだ。(Danh từ + だ) Nó là một ngôi đền. 危険きけんだ。(な-Tính từ + だ) Nó là nguy hiểm. 大切たいせつだ。(な-Tính từ + だ) Nó là quan trọng.',
					level: 'N5',
				},
				{
					id: 'avc',
					pattern: 'だ',
					structure: 'Danh từ + だ, [な] Tính từ + だ',
					explaination:
						'だ là một động từ trợ trong tiếng Nhật hoạt động như một cách diễn đạt sự quyết tâm, hoặc khẳng định mạnh mẽ. Nó đơn giản chỉ ra rằng một cái gì đó "là" theo một cách nhất định. Nó là một tương đương thân mật của です (một động từ trợ khác).だ luôn phải được gắn vào cuối các danh từ, hoặc các từ có thể hành xử như danh từ, chẳng hạn như な-Tính từ.',
					notes:
						"だ không bao giờ nên được gắn vào cuối Tính từ đuôi い. Trong những trường hợp này, người ta cho rằng việc gắn một tương đương lịch sự, như です, là đúng hơn. 大おおきいだ。Nó lớn. (Không tự nhiên trong tiếng Nhật)大おおきいです。Nó lớn. (Tự nhiên trong tiếng Nhật)Trong khi だ thường được coi là 'dạng' thông thường của です, điều đó thực sự là không chính xác. です là một từ trong lời nói lịch sự. Phiên bản 'trang trọng chính thức' của だ là である. Chúng ta sẽ học điểm ngữ pháp này một chút sau. である thường thấy trong các bài báo và văn viết trang trọng, trong khi です thì phổ biến hơn trong lời nói lịch sự.",
					examples:
						'アイスクリームだ。(Danh từ + だ) Nó là kem. お寺てらだ。(Danh từ + だ) Nó là một ngôi đền. 危険きけんだ。(な-Tính từ + だ) Nó là nguy hiểm. 大切たいせつだ。(な-Tính từ + だ) Nó là quan trọng.',
					level: 'N5',
				},
				{
					id: 'avc',
					pattern: 'だ',
					structure: 'Danh từ + だ, [な] Tính từ + だ',
					explaination:
						'だ là một động từ trợ trong tiếng Nhật hoạt động như một cách diễn đạt sự quyết tâm, hoặc khẳng định mạnh mẽ. Nó đơn giản chỉ ra rằng một cái gì đó "là" theo một cách nhất định. Nó là một tương đương thân mật của です (một động từ trợ khác).だ luôn phải được gắn vào cuối các danh từ, hoặc các từ có thể hành xử như danh từ, chẳng hạn như な-Tính từ.',
					notes:
						"だ không bao giờ nên được gắn vào cuối Tính từ đuôi い. Trong những trường hợp này, người ta cho rằng việc gắn một tương đương lịch sự, như です, là đúng hơn. 大おおきいだ。Nó lớn. (Không tự nhiên trong tiếng Nhật)大おおきいです。Nó lớn. (Tự nhiên trong tiếng Nhật)Trong khi だ thường được coi là 'dạng' thông thường của です, điều đó thực sự là không chính xác. です là một từ trong lời nói lịch sự. Phiên bản 'trang trọng chính thức' của だ là である. Chúng ta sẽ học điểm ngữ pháp này một chút sau. である thường thấy trong các bài báo và văn viết trang trọng, trong khi です thì phổ biến hơn trong lời nói lịch sự.",
					examples:
						'アイスクリームだ。(Danh từ + だ) Nó là kem. お寺てらだ。(Danh từ + だ) Nó là một ngôi đền. 危険きけんだ。(な-Tính từ + だ) Nó là nguy hiểm. 大切たいせつだ。(な-Tính từ + だ) Nó là quan trọng.',
					level: 'N5',
				},
				{
					id: 'avc',
					pattern: 'だ',
					structure: 'Danh từ + だ, [な] Tính từ + だ',
					explaination:
						'だ là một động từ trợ trong tiếng Nhật hoạt động như một cách diễn đạt sự quyết tâm, hoặc khẳng định mạnh mẽ. Nó đơn giản chỉ ra rằng một cái gì đó "là" theo một cách nhất định. Nó là một tương đương thân mật của です (một động từ trợ khác).だ luôn phải được gắn vào cuối các danh từ, hoặc các từ có thể hành xử như danh từ, chẳng hạn như な-Tính từ.',
					notes:
						"だ không bao giờ nên được gắn vào cuối Tính từ đuôi い. Trong những trường hợp này, người ta cho rằng việc gắn một tương đương lịch sự, như です, là đúng hơn. 大おおきいだ。Nó lớn. (Không tự nhiên trong tiếng Nhật)大おおきいです。Nó lớn. (Tự nhiên trong tiếng Nhật)Trong khi だ thường được coi là 'dạng' thông thường của です, điều đó thực sự là không chính xác. です là một từ trong lời nói lịch sự. Phiên bản 'trang trọng chính thức' của だ là である. Chúng ta sẽ học điểm ngữ pháp này một chút sau. である thường thấy trong các bài báo và văn viết trang trọng, trong khi です thì phổ biến hơn trong lời nói lịch sự.",
					examples:
						'アイスクリームだ。(Danh từ + だ) Nó là kem. お寺てらだ。(Danh từ + だ) Nó là một ngôi đền. 危険きけんだ。(な-Tính từ + だ) Nó là nguy hiểm. 大切たいせつだ。(な-Tính từ + だ) Nó là quan trọng.',
					level: 'N5',
				},
				{
					id: 'avc',
					pattern: 'だ',
					structure: 'Danh từ + だ, [な] Tính từ + だ',
					explaination:
						'だ là một động từ trợ trong tiếng Nhật hoạt động như một cách diễn đạt sự quyết tâm, hoặc khẳng định mạnh mẽ. Nó đơn giản chỉ ra rằng một cái gì đó "là" theo một cách nhất định. Nó là một tương đương thân mật của です (một động từ trợ khác).だ luôn phải được gắn vào cuối các danh từ, hoặc các từ có thể hành xử như danh từ, chẳng hạn như な-Tính từ.',
					notes:
						"だ không bao giờ nên được gắn vào cuối Tính từ đuôi い. Trong những trường hợp này, người ta cho rằng việc gắn một tương đương lịch sự, như です, là đúng hơn. 大おおきいだ。Nó lớn. (Không tự nhiên trong tiếng Nhật)大おおきいです。Nó lớn. (Tự nhiên trong tiếng Nhật)Trong khi だ thường được coi là 'dạng' thông thường của です, điều đó thực sự là không chính xác. です là một từ trong lời nói lịch sự. Phiên bản 'trang trọng chính thức' của だ là である. Chúng ta sẽ học điểm ngữ pháp này một chút sau. である thường thấy trong các bài báo và văn viết trang trọng, trong khi です thì phổ biến hơn trong lời nói lịch sự.",
					examples:
						'アイスクリームだ。(Danh từ + だ) Nó là kem. お寺てらだ。(Danh từ + だ) Nó là một ngôi đền. 危険きけんだ。(な-Tính từ + だ) Nó là nguy hiểm. 大切たいせつだ。(な-Tính từ + だ) Nó là quan trọng.',
					level: 'N5',
				},
			],
			source: 'Soumatome',
			level: 'N5',
		},
		{
			id: '2',
			lessonNumber: 2,
			grammar: [
				{
					id: 'avc',
					pattern: 'だ',
					structure: 'Danh từ + だ, [な] Tính từ + だ',
					explaination:
						'だ là một động từ trợ trong tiếng Nhật hoạt động như một cách diễn đạt sự quyết tâm, hoặc khẳng định mạnh mẽ. Nó đơn giản chỉ ra rằng một cái gì đó "là" theo một cách nhất định. Nó là một tương đương thân mật của です (một động từ trợ khác).だ luôn phải được gắn vào cuối các danh từ, hoặc các từ có thể hành xử như danh từ, chẳng hạn như な-Tính từ.',
					notes:
						"だ không bao giờ nên được gắn vào cuối Tính từ đuôi い. Trong những trường hợp này, người ta cho rằng việc gắn một tương đương lịch sự, như です, là đúng hơn. 大おおきいだ。Nó lớn. (Không tự nhiên trong tiếng Nhật)大おおきいです。Nó lớn. (Tự nhiên trong tiếng Nhật)Trong khi だ thường được coi là 'dạng' thông thường của です, điều đó thực sự là không chính xác. です là một từ trong lời nói lịch sự. Phiên bản 'trang trọng chính thức' của だ là である. Chúng ta sẽ học điểm ngữ pháp này một chút sau. である thường thấy trong các bài báo và văn viết trang trọng, trong khi です thì phổ biến hơn trong lời nói lịch sự.",
					examples:
						'アイスクリームだ。(Danh từ + だ) Nó là kem. お寺てらだ。(Danh từ + だ) Nó là một ngôi đền. 危険きけんだ。(な-Tính từ + だ) Nó là nguy hiểm. 大切たいせつだ。(な-Tính từ + だ) Nó là quan trọng.',
					level: 'N5',
				},
				{
					id: 'avc',
					pattern: 'だ',
					structure: 'Danh từ + だ, [な] Tính từ + だ',
					explaination:
						'だ là một động từ trợ trong tiếng Nhật hoạt động như một cách diễn đạt sự quyết tâm, hoặc khẳng định mạnh mẽ. Nó đơn giản chỉ ra rằng một cái gì đó "là" theo một cách nhất định. Nó là một tương đương thân mật của です (một động từ trợ khác).だ luôn phải được gắn vào cuối các danh từ, hoặc các từ có thể hành xử như danh từ, chẳng hạn như な-Tính từ.',
					notes:
						"だ không bao giờ nên được gắn vào cuối Tính từ đuôi い. Trong những trường hợp này, người ta cho rằng việc gắn một tương đương lịch sự, như です, là đúng hơn. 大おおきいだ。Nó lớn. (Không tự nhiên trong tiếng Nhật)大おおきいです。Nó lớn. (Tự nhiên trong tiếng Nhật)Trong khi だ thường được coi là 'dạng' thông thường của です, điều đó thực sự là không chính xác. です là một từ trong lời nói lịch sự. Phiên bản 'trang trọng chính thức' của だ là である. Chúng ta sẽ học điểm ngữ pháp này một chút sau. である thường thấy trong các bài báo và văn viết trang trọng, trong khi です thì phổ biến hơn trong lời nói lịch sự.",
					examples:
						'アイスクリームだ。(Danh từ + だ) Nó là kem. お寺てらだ。(Danh từ + だ) Nó là một ngôi đền. 危険きけんだ。(な-Tính từ + だ) Nó là nguy hiểm. 大切たいせつだ。(な-Tính từ + だ) Nó là quan trọng.',
					level: 'N5',
				},
				{
					id: 'avc',
					pattern: 'だ',
					structure: 'Danh từ + だ, [な] Tính từ + だ',
					explaination:
						'だ là một động từ trợ trong tiếng Nhật hoạt động như một cách diễn đạt sự quyết tâm, hoặc khẳng định mạnh mẽ. Nó đơn giản chỉ ra rằng một cái gì đó "là" theo một cách nhất định. Nó là một tương đương thân mật của です (một động từ trợ khác).だ luôn phải được gắn vào cuối các danh từ, hoặc các từ có thể hành xử như danh từ, chẳng hạn như な-Tính từ.',
					notes:
						"だ không bao giờ nên được gắn vào cuối Tính từ đuôi い. Trong những trường hợp này, người ta cho rằng việc gắn một tương đương lịch sự, như です, là đúng hơn. 大おおきいだ。Nó lớn. (Không tự nhiên trong tiếng Nhật)大おおきいです。Nó lớn. (Tự nhiên trong tiếng Nhật)Trong khi だ thường được coi là 'dạng' thông thường của です, điều đó thực sự là không chính xác. です là một từ trong lời nói lịch sự. Phiên bản 'trang trọng chính thức' của だ là である. Chúng ta sẽ học điểm ngữ pháp này một chút sau. である thường thấy trong các bài báo và văn viết trang trọng, trong khi です thì phổ biến hơn trong lời nói lịch sự.",
					examples:
						'アイスクリームだ。(Danh từ + だ) Nó là kem. お寺てらだ。(Danh từ + だ) Nó là một ngôi đền. 危険きけんだ。(な-Tính từ + だ) Nó là nguy hiểm. 大切たいせつだ。(な-Tính từ + だ) Nó là quan trọng.',
					level: 'N5',
				},
				{
					id: 'avc',
					pattern: 'だ',
					structure: 'Danh từ + だ, [な] Tính từ + だ',
					explaination:
						'だ là một động từ trợ trong tiếng Nhật hoạt động như một cách diễn đạt sự quyết tâm, hoặc khẳng định mạnh mẽ. Nó đơn giản chỉ ra rằng một cái gì đó "là" theo một cách nhất định. Nó là một tương đương thân mật của です (một động từ trợ khác).だ luôn phải được gắn vào cuối các danh từ, hoặc các từ có thể hành xử như danh từ, chẳng hạn như な-Tính từ.',
					notes:
						"だ không bao giờ nên được gắn vào cuối Tính từ đuôi い. Trong những trường hợp này, người ta cho rằng việc gắn một tương đương lịch sự, như です, là đúng hơn. 大おおきいだ。Nó lớn. (Không tự nhiên trong tiếng Nhật)大おおきいです。Nó lớn. (Tự nhiên trong tiếng Nhật)Trong khi だ thường được coi là 'dạng' thông thường của です, điều đó thực sự là không chính xác. です là một từ trong lời nói lịch sự. Phiên bản 'trang trọng chính thức' của だ là である. Chúng ta sẽ học điểm ngữ pháp này một chút sau. である thường thấy trong các bài báo và văn viết trang trọng, trong khi です thì phổ biến hơn trong lời nói lịch sự.",
					examples:
						'アイスクリームだ。(Danh từ + だ) Nó là kem. お寺てらだ。(Danh từ + だ) Nó là một ngôi đền. 危険きけんだ。(な-Tính từ + だ) Nó là nguy hiểm. 大切たいせつだ。(な-Tính từ + だ) Nó là quan trọng.',
					level: 'N5',
				},
				{
					id: 'avc',
					pattern: 'だ',
					structure: 'Danh từ + だ, [な] Tính từ + だ',
					explaination:
						'だ là một động từ trợ trong tiếng Nhật hoạt động như một cách diễn đạt sự quyết tâm, hoặc khẳng định mạnh mẽ. Nó đơn giản chỉ ra rằng một cái gì đó "là" theo một cách nhất định. Nó là một tương đương thân mật của です (một động từ trợ khác).だ luôn phải được gắn vào cuối các danh từ, hoặc các từ có thể hành xử như danh từ, chẳng hạn như な-Tính từ.',
					notes:
						"だ không bao giờ nên được gắn vào cuối Tính từ đuôi い. Trong những trường hợp này, người ta cho rằng việc gắn một tương đương lịch sự, như です, là đúng hơn. 大おおきいだ。Nó lớn. (Không tự nhiên trong tiếng Nhật)大おおきいです。Nó lớn. (Tự nhiên trong tiếng Nhật)Trong khi だ thường được coi là 'dạng' thông thường của です, điều đó thực sự là không chính xác. です là một từ trong lời nói lịch sự. Phiên bản 'trang trọng chính thức' của だ là である. Chúng ta sẽ học điểm ngữ pháp này một chút sau. である thường thấy trong các bài báo và văn viết trang trọng, trong khi です thì phổ biến hơn trong lời nói lịch sự.",
					examples:
						'アイスクリームだ。(Danh từ + だ) Nó là kem. お寺てらだ。(Danh từ + だ) Nó là một ngôi đền. 危険きけんだ。(な-Tính từ + だ) Nó là nguy hiểm. 大切たいせつだ。(な-Tính từ + だ) Nó là quan trọng.',
					level: 'N5',
				},
				{
					id: 'avc',
					pattern: 'だ',
					structure: 'Danh từ + だ, [な] Tính từ + だ',
					explaination:
						'だ là một động từ trợ trong tiếng Nhật hoạt động như một cách diễn đạt sự quyết tâm, hoặc khẳng định mạnh mẽ. Nó đơn giản chỉ ra rằng một cái gì đó "là" theo một cách nhất định. Nó là một tương đương thân mật của です (một động từ trợ khác).だ luôn phải được gắn vào cuối các danh từ, hoặc các từ có thể hành xử như danh từ, chẳng hạn như な-Tính từ.',
					notes:
						"だ không bao giờ nên được gắn vào cuối Tính từ đuôi い. Trong những trường hợp này, người ta cho rằng việc gắn một tương đương lịch sự, như です, là đúng hơn. 大おおきいだ。Nó lớn. (Không tự nhiên trong tiếng Nhật)大おおきいです。Nó lớn. (Tự nhiên trong tiếng Nhật)Trong khi だ thường được coi là 'dạng' thông thường của です, điều đó thực sự là không chính xác. です là một từ trong lời nói lịch sự. Phiên bản 'trang trọng chính thức' của だ là である. Chúng ta sẽ học điểm ngữ pháp này một chút sau. である thường thấy trong các bài báo và văn viết trang trọng, trong khi です thì phổ biến hơn trong lời nói lịch sự.",
					examples:
						'アイスクリームだ。(Danh từ + だ) Nó là kem. お寺てらだ。(Danh từ + だ) Nó là một ngôi đền. 危険きけんだ。(な-Tính từ + だ) Nó là nguy hiểm. 大切たいせつだ。(な-Tính từ + だ) Nó là quan trọng.',
					level: 'N5',
				},
				{
					id: 'avc',
					pattern: 'だ',
					structure: 'Danh từ + だ, [な] Tính từ + だ',
					explaination:
						'だ là một động từ trợ trong tiếng Nhật hoạt động như một cách diễn đạt sự quyết tâm, hoặc khẳng định mạnh mẽ. Nó đơn giản chỉ ra rằng một cái gì đó "là" theo một cách nhất định. Nó là một tương đương thân mật của です (một động từ trợ khác).だ luôn phải được gắn vào cuối các danh từ, hoặc các từ có thể hành xử như danh từ, chẳng hạn như な-Tính từ.',
					notes:
						"だ không bao giờ nên được gắn vào cuối Tính từ đuôi い. Trong những trường hợp này, người ta cho rằng việc gắn một tương đương lịch sự, như です, là đúng hơn. 大おおきいだ。Nó lớn. (Không tự nhiên trong tiếng Nhật)大おおきいです。Nó lớn. (Tự nhiên trong tiếng Nhật)Trong khi だ thường được coi là 'dạng' thông thường của です, điều đó thực sự là không chính xác. です là một từ trong lời nói lịch sự. Phiên bản 'trang trọng chính thức' của だ là である. Chúng ta sẽ học điểm ngữ pháp này một chút sau. である thường thấy trong các bài báo và văn viết trang trọng, trong khi です thì phổ biến hơn trong lời nói lịch sự.",
					examples:
						'アイスクリームだ。(Danh từ + だ) Nó là kem. お寺てらだ。(Danh từ + だ) Nó là một ngôi đền. 危険きけんだ。(な-Tính từ + だ) Nó là nguy hiểm. 大切たいせつだ。(な-Tính từ + だ) Nó là quan trọng.',
					level: 'N5',
				},
				{
					id: 'avc',
					pattern: 'だ',
					structure: 'Danh từ + だ, [な] Tính từ + だ',
					explaination:
						'だ là một động từ trợ trong tiếng Nhật hoạt động như một cách diễn đạt sự quyết tâm, hoặc khẳng định mạnh mẽ. Nó đơn giản chỉ ra rằng một cái gì đó "là" theo một cách nhất định. Nó là một tương đương thân mật của です (một động từ trợ khác).だ luôn phải được gắn vào cuối các danh từ, hoặc các từ có thể hành xử như danh từ, chẳng hạn như な-Tính từ.',
					notes:
						"だ không bao giờ nên được gắn vào cuối Tính từ đuôi い. Trong những trường hợp này, người ta cho rằng việc gắn một tương đương lịch sự, như です, là đúng hơn. 大おおきいだ。Nó lớn. (Không tự nhiên trong tiếng Nhật)大おおきいです。Nó lớn. (Tự nhiên trong tiếng Nhật)Trong khi だ thường được coi là 'dạng' thông thường của です, điều đó thực sự là không chính xác. です là một từ trong lời nói lịch sự. Phiên bản 'trang trọng chính thức' của だ là である. Chúng ta sẽ học điểm ngữ pháp này một chút sau. である thường thấy trong các bài báo và văn viết trang trọng, trong khi です thì phổ biến hơn trong lời nói lịch sự.",
					examples:
						'アイスクリームだ。(Danh từ + だ) Nó là kem. お寺てらだ。(Danh từ + だ) Nó là một ngôi đền. 危険きけんだ。(な-Tính từ + だ) Nó là nguy hiểm. 大切たいせつだ。(な-Tính từ + だ) Nó là quan trọng.',
					level: 'N5',
				},
			],
			source: 'Soumatome',
			level: 'N5',
		},
	];

	return (
		<div>
			{lessons.map((d, index) => (
				<LessonItem key={index} lesson={d} />
			))}
		</div>
	);
}
