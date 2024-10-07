// src/services/finnhubService.ts
import axios from 'axios';

// Set your Finnhub API key
const apiKey = 'cs1ibc9r01qsperuavigcs1ibc9r01qsperuavj0'; // Replace with your actual API key

const finnhubApi = axios.create({
    baseURL: 'https://finnhub.io/api/v1',
    params: {
        token: apiKey,
    },
});

// Function to get stock quote
export const getStockQuote = async (symbol: string) => {
    try {
        const response = await finnhubApi.get(`/quote`, {
            params: { symbol },
        });
        return response.data; // returns the stock quote
    } catch (error) {
        console.error('Error fetching stock quote:', error);
        throw error; // re-throw the error to handle it later
    }
};
