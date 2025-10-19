import { useEffect, useState } from "react";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  company: {
    name: string;
  };
}

export default function DataTable() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error(`Http Error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Fetch Data into table</h1>
      <div className="table-container">
        <table
          border={1}
          cellPadding={10}
          style={{
            width: "80%",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Company Name</th>
            </tr>
          </thead>

          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
