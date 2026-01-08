import { Lesson, Level, Vocabulary } from './types';

// Nên đổi tên thành data-server. maybe?
// Để data-client cho client components only
const API_URL = process.env.API_URL;

export async function getLessons(params?: string) {
	try {
		const res = await fetch(`${API_URL}/lesson?level=${params}`);
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
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
