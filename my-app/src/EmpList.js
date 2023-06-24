import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmpList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://reqres.in/api/users?page=2');
      setEmployees(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const FindData = (e) => {
    setSearch(e.target.value);
  };

  const filterEmp = employees.filter((employee) =>
    employee.first_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="search first name"
        value={search}
        onChange={FindData}
      />
    {filterEmp.map((employee) => (
        <div key={employee.id}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img src={employee.avatar} alt={employee.first_name} />
            <span
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: '#fff',
                padding: '2px 5px',
                borderRadius: '3px',
                fontSize: '12px',
              }}
            >
              ID: {employee.id}
            </span>
          </div>
          <p>{employee.first_name}</p>
        </div>
      ))}

    </div>
  );
};

export default EmpList;
