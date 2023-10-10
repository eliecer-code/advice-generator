import axios from "axios";

const url = "https://api.adviceslip.com/advice";

export const fetchData = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(`Ha sucedido un error: ${error}`);
    }
};
