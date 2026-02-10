import { Lesson, Level, Vocabulary } from '../types/types';

// Nên đổi tên thành data-server. maybe?
// Để data-client cho client components only
const API_URL = process.env.API_URL;

export async function getLessons(params?: string) {
	try {
		const res = await fetch(`${API_URL}/lesson?level=${params}`);
		if (!res.ok) {
			if (res.status === 404) {
				throw new Error(
					params ? `No lessons found for level ${params}` : 'No lessons found',
				);
			}
			throw new Error(`Failed to fetch lessons: ${res.statusText}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getVocabularies(): Promise<Vocabulary[]> {
	try {
		const res = await fetch(`${API_URL}/vocabulary`);
		if (!res.ok) {
			if (res.status === 404) {
				throw new Error('No vocabularies found');
			}
			throw new Error(`Failed to fetch vocabularies: ${res.statusText}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getVocabularyById(id: string): Promise<Vocabulary> {
	try {
		const res = await fetch(`${API_URL}/vocabulary/${id}`);
		if (!res.ok) {
			if (res.status === 404) {
				throw new Error(`Vocabulary with ID ${id} not found`);
			}
			throw new Error(`Failed to fetch vocabulary: ${res.statusText}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getGrammars() {
	try {
		const res = await fetch(`${API_URL}/grammar`);
		if (!res.ok) {
			if (res.status === 404) {
				throw new Error('No grammars found');
			}
			throw new Error(`Failed to fetch grammars: ${res.statusText}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getGrammarById(id: string) {
	try {
		const res = await fetch(`${API_URL}/grammar/${id}`);
		if (!res.ok) {
			if (res.status === 404) {
				throw new Error(`Grammar with ID ${id} not found`);
			}
			throw new Error(`Failed to fetch grammar: ${res.statusText}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getKanjis() {
	try {
		const res = await fetch(`${API_URL}/kanji`);
		if (!res.ok) {
			if (res.status === 404) {
				throw new Error('No kanjis found');
			}
			throw new Error(`Failed to fetch kanjis: ${res.statusText}`);
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
