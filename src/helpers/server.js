
const server = `http://localhost:8000/json`;

const parseResponse = (response) => response.json()

export const services = {
    getAll: () => fetch(server, {method: "GET"}).then(parseResponse),
    getById: (id) => fetch(`${server}/${id}`, {method: "GET"}).then(parseResponse),
    create: (task) => fetch(server, {method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(task),
    }).then(parseResponse),
    deleteById: (id) => fetch(`${server}/${id}`, {method: "DELETE"}).then(parseResponse),
}
