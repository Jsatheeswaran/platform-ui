import axios from "axios";

export const ActionApi = async ({ module, entity, data = {} }) => {
	try {
		const response = await axios.post(`http://localhost:8080/${module}/${entity}`, data);
		if (response?.data) {
			return response?.data;
		}
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};
export const ActionApiByPk = async ({ module, entity, id, data = {} }) => {
	try {
		const response = await axios.put(`http://localhost:8080/${module}/${entity}/${id}`, data);
		if (response?.data) {
			return response?.data;
		}
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};
export const QueryApi = async ({ module, entity, ...rest }) => {
	try {
		const response = await axios.get(`http://localhost:8080/${module}/${entity}`);
		if (response?.data) {
			return response?.data;
		}
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};
export const ListApi = async ({ module, entity, limit, page, ...rest }) => {
	try {
		const response = await axios.get(`http://localhost:8080/${module}/${entity}/${limit}/${page}`);
		if (response?.data) {
			return response?.data;
		}
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};
export const QueryApiByPk = async ({ module, entity, id, ...rest }) => {
	try {
		const response = await axios.get(`http://localhost:8080/${module}/${entity}/${id}`);
		if (response?.data) {
			return response?.data;
		}
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

export const DeleteApiByPk = async ({ module, entity, id, ...rest }) => {
	try {
		const response = await axios.delete(`http://localhost:8080/${module}/${entity}/${id}`);
		if (response?.data) {
			return response?.data;
		}
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};
