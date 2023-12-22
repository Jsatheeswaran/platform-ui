import axios from "axios";

export const ActionApi = async ({ module, entity, data = {} }) => {
	try {
		const response = await axios.post(`http://localhost:8080/${module}/${entity}`, data);
		if (response?.data) {
			return response?.data;
		}
	} catch (error) {
		console.error("Error fetching data:", error);
	} finally {
		// setLoading(false);
	}
};
export const QueryApi = async ({ module, entity }) => {
	try {
		const response = await axios.get(`http://localhost:8080/${module}/${entity}`);
		if (response?.data) {
			return response?.data;
		}
	} catch (error) {
		console.error("Error fetching data:", error);
	} finally {
		// setLoading(false);
	}
};
