/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
// Fetch Client
export class ApiClient {
	private baseUrl: string;

	constructor(baseUrl?: string) {
		this.baseUrl =
			baseUrl || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
	}

	private getHeaders(headers?: Record<string, string>) {
		const token = this.getToken();
		const defaultHeaders: Record<string, string> = {
			'Content-Type': 'application/json',
		};

		if (token) {
			defaultHeaders['Authorization'] = `Bearer ${token}`;
		}

		return { ...defaultHeaders, ...headers };
	}

	private getToken(): string | null {
		if (typeof window === 'undefined') return null;
		return localStorage.getItem('access_token');
	}

	async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			method: 'GET',
			headers: this.getHeaders(headers),
		});

		if (!response.ok) {
			throw new Error(`API error: ${response.statusText}`);
		}

		return response.json();
	}

	async post<T>(
		endpoint: string,
		body?: Record<string, any>,
		headers?: Record<string, string>,
	): Promise<T> {
		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			method: 'POST',
			headers: this.getHeaders(headers),
			body: body ? JSON.stringify(body) : undefined,
		});

		if (!response.ok) {
			throw new Error(`API error: ${response.statusText}`);
		}

		return response.json();
	}

	async put<T>(
		endpoint: string,
		body?: Record<string, any>,
		headers?: Record<string, string>,
	): Promise<T> {
		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			method: 'PUT',
			headers: this.getHeaders(headers),
			body: body ? JSON.stringify(body) : undefined,
		});

		if (!response.ok) {
			throw new Error(`API error: ${response.statusText}`);
		}

		return response.json();
	}

	async delete<T>(
		endpoint: string,
		headers?: Record<string, string>,
	): Promise<T> {
		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			method: 'DELETE',
			headers: this.getHeaders(headers),
		});

		if (!response.ok) {
			throw new Error(`API error: ${response.statusText}`);
		}

		return response.json();
	}
}

export const apiClient = new ApiClient();


// Axios Client
import axios from 'axios';

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem('accessToken');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default api;