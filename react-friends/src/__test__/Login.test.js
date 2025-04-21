import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from 'axios/dist/browser/axios.cjs';
import Login from "../Login";

jest.mock('axios');

describe('Login Component', () => {
    beforeEach(() => { // runs before every test
        jest.clearAllMocks();
        localStorage.clear();
    });

    test("Check if all components renders in the page", () => {
        render(<Login/>);

        expect(screen.getByText('Login Page')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    test("Submit with correct credentials", async () => {
        //mocking an API response.
        axios.post.mockResolvedValueOnce({
            data: { token: 'fake-token', user: { id: 1, email: 'test@example.com' } }
        });

        render(<Login />);

        //type data and submit
        userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
        userEvent.type(screen.getByLabelText('Password'), '123456');

        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

        //verify axios is called with correct data
        expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/login', {
            email: 'test@example.com',
            password: '123456'
        });

        await waitFor(() => { //verify if local storge is updated
            expect(localStorage.getItem('user')).not.toBeNull();
        });
    });
});