import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

import { API_ENDPOINTS } from "@/data/api/api.config";
import { apiClient } from "@/data/api/axios.config";
import type {
	ISentQuoteRequestBody,
	ISentQuoteRequestResponse,
} from "@/core/notification/quote";

export const useNotificationsMutations = () => {
	const sentQuoteRequestMutation = useMutation({
		mutationFn: async (
			body: ISentQuoteRequestBody,
		): Promise<ISentQuoteRequestResponse> => {
			const API_URL = `${API_ENDPOINTS.STATS.SENT_QUOTE_REQUEST}`;
			const response = await apiClient.post(API_URL, body);
			return response.data;
		},
		onSuccess: () => {
			toast.success("Tu solicitud se envió correctamente.");
		},
		onError: (_error: AxiosError) => {
			toast.error("No se pudo completar la solicitud. Inténtalo de nuevo.");
		},
	});

	return {
		sentQuoteRequestMutation,
	};
};