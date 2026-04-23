export const API_CONFIG = {
	SERVER: {
		baseURL: import.meta.env.VITE_SERVER_URL,
		timeout: 60000,
	} as const,
};

export const API_VERSION_1 = "/v1";

export const API_ENDPOINTS = {
	STATS: {
		SENT_QUOTE_REQUEST: "/v1/notifications/quote-requests",
	
	}
};