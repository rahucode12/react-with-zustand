import { fetchUsers } from '@/lib/api';
import CreateUserForm from '../_component/users/CreateUserForm';
import UserData from './UserData';
import { Suspense } from 'react';

export default async function UsersPage() {
    const users = await fetchUsers();

    return (
        <div>
            <Suspense fallback={<div>Loading users...</div>}>
                <UserData />
            </Suspense>

            <h2>Create a New User</h2>
            <CreateUserForm />
        </div>
    );
}