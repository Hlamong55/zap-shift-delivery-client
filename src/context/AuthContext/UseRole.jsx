import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseRole = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: role = 'user' } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            return res.data;
        }
    })

    return {role, isLoading};
};

export default UseRole;