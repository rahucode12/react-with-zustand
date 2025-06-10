import { fetchUsers } from '@/lib/api';


export default async function UserData() {
    const users = await fetchUsers();

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user: { id: number; name: string; email: string }) => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>


        </div>
    );
}