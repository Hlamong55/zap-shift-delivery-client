import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const AdminRoute = () => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || roleLoading) {
    return (
      <div className="text-center py-24">
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
   }

   if(role !== "admin"){
    return
   }

    return (
        <div>
            
        </div>
    );
};

export default AdminRoute;