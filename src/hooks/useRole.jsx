import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading: roleLoading, data: role = "user"} = useQuery({
        queryKey: ["user-role", user?.email],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/user/${user.email}/role`);
            // console.log("checking role", res.data);
            return res.data?.role;
        }
    })

    return { role, roleLoading };
};

export default useRole;