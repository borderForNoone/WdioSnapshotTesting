import axios from 'axios';
import { expect } from '@wdio/globals';

const API_URL = 'https://your-api-endpoint.com';
const PARABANK_API_URL = 'https://parabank.parasoft.com/parabank';

async function registerUser(customerId: number) {
    const newAccountType = 1; // 1 - CHECKING, 2 - SAVINGS, 3 - LOAN 
    const fromAccountId = 67890;
    
    const response = await axios.post(`${API_URL}/createAccount`, null, {
        params: { customerId, newAccountType, fromAccountId }
    });
    
    expect(response.status).toBe(200);
    return response.data;
}

async function loginUser(username: string, password: string) {
    const response = await axios.get(`${PARABANK_API_URL}/services/bank/login/${username}/${password}`);
    expect(response.status).toBe(200);
    return response.data;
}

describe('API Tests', () => {
    it('Register with valid data', async () => {
        const response = await registerUser(12345);
        console.log('Response:', response);
    });

    it('Login with valid data', async () => {
        const username = 'john';
        const password = 'demo';
        
        const response = await loginUser(username, password);
        console.log('Login Response:', response);
    });

    async function createAccount(customerId: any, newAccountType: number, fromAccountId: number) {
        const response = await axios.post(`${API_URL}/services/bank/createAccount`, null, {
            params: { customerId, newAccountType, fromAccountId }
        });
        expect(response.status).toBe(200);
        return response.data;
    }

    it('Create new account', async () => {
        const username = 'john';
        const password = 'demo';
        
        const customerId = await loginUser(username, password);
        expect(customerId).toBeDefined();
        
        const newAccountType = 1; // CHECKING
        const fromAccountId = 67890;
        
        const response = await createAccount(customerId, newAccountType, fromAccountId);
        console.log('Account Creation Response:', response);
    });

    async function transferFunds(fromAccountId: any, toAccountId: any, amount: number) {
        const response = await axios.post(`${API_URL}/services/bank/transfer`, null, {
            params: { fromAccountId, toAccountId, amount }
        });
        expect(response.status).toBe(200);
        return response.data;
    }

    it('Transfer funds between accounts', async () => {
        const username = 'john';
        const password = 'demo';
        
        const customerId = await loginUser(username, password);
        expect(customerId).toBeDefined();
        
        const newAccountType = 1; // CHECKING
        const fromAccountId = await createAccount(customerId, newAccountType, 67890);
        const toAccountId = await createAccount(customerId, newAccountType, fromAccountId);
        
        const amount = 100.0;
        const response = await transferFunds(fromAccountId, toAccountId, amount);
        console.log('Transfer Response:', response);
    });
});