import axios from 'axios';

export const API_URL = 'http://localhost:3000'; 

export type StatusType =
    | 'UNCLAIMED'
    | 'FIRST_CONTACT'
    | 'PREPARING_WORK_OFFER'
    | 'SEND_TO_THERAPIST';

export interface Member {
    id: string;
    name: string;
    title: string;
    age: number;
    email: string;
    mobileNumber: string;
    status: StatusType;
}

export const getMembers = async (): Promise<Member[]> => {
    const response = await axios.get(`${API_URL}/members`);
    return response.data;
};

export const createMember = async (
    member: Omit<Member, 'id'>
): Promise<Member> => {
    const response = await axios.post(`${API_URL}/members`, member);
    return response.data;
};

export const updateMember = async (
    id: string,
    member: Partial<Member>
): Promise<Member> => {
    const response = await axios.put(`${API_URL}/members/${id}`, member);
    return response.data;
};

export const deleteMember = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/members/${id}`);
};
