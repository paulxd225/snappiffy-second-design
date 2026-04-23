import axios from "axios";

import { API_CONFIG } from "./api.config";

export const apiClient = axios.create(API_CONFIG.SERVER);
