const baseURL = "http://localhost:3001";
const headers: Record<string, string> = { "Content-Type": "application/json" };
const timeout = 10000;

async function fetchAPIInstace<T>(url: string, options?: RequestInit): Promise<{ data: T; status: number; }> {
    const controller = new AbortController();
    const signal = controller.signal;
    setTimeout(() => controller.abort(), timeout);

    const token = localStorage.getItem("auth_token");

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(baseURL + url, { signal, headers, ...options });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();

        return { data, status: response.status };
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                throw new Error('Request timed out');
            }    
        }
        
        throw error;
    }
}

export { fetchAPIInstace };