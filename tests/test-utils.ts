import 'dotenv/config';
import 'dotenv';

const PORT = process.env.PORT || 5000;

const server = `http://localhost:${PORT}`;

const logResponse = (status: number, body: any) => {
    console.log('Server response:', status, body);
}

export { server, logResponse };