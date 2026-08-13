const API_URL = "http://localhost:3000";

export async function login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensaje || "Error al iniciar sesión");
    }

    return data;
}

export async function obtenerServicios(token) {
    const response = await fetch(`${API_URL}/servicios`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensaje || "Error al obtener servicios");
    }

    return data;
}

export async function crearServicio(token, servicio) {
    const response = await fetch(`${API_URL}/servicios`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(servicio),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensaje || "Error al crear servicio");
    }

    return data;
}

export async function actualizarServicio(token, id, servicio) {
    const response = await fetch(`${API_URL}/servicios/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(servicio),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensaje || "Error al actualizar servicio");
    }

    return data;
}

export async function eliminarServicio(token, id) {
    const response = await fetch(`${API_URL}/servicios/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensaje || "Error al eliminar servicio");
    }

    return data;
}

export async function obtenerClientes(token) {
    const response = await fetch(`${API_URL}/clientes`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.mensaje || "Error al obtener clientes"
        );
    }

    return data;
}

export async function crearCliente(token, cliente) {
    const response = await fetch(`${API_URL}/clientes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cliente),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.mensaje || "Error al crear cliente"
        );
    }

    return data;
}

export async function actualizarCliente(
    token,
    id,
    cliente
) {
    const response = await fetch(
        `${API_URL}/clientes/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(cliente),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.mensaje ||
                "Error al actualizar cliente"
        );
    }

    return data;
}

export async function eliminarCliente(
    token,
    id
) {
    const response = await fetch(
        `${API_URL}/clientes/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.mensaje ||
                "Error al eliminar cliente"
        );
    }

    return data;
}

export async function obtenerTurnos(token) {
    const response = await fetch(`${API_URL}/turnos`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.mensaje || "Error al obtener turnos"
        );
    }

    return data;
}

export async function crearTurno(token, turno) {
    const response = await fetch(`${API_URL}/turnos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(turno),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.mensaje || "Error al crear turno"
        );
    }

    return data;
}

export async function actualizarTurno(
    token,
    id,
    turno
) {
    const response = await fetch(
        `${API_URL}/turnos/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(turno),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.mensaje ||
                "Error al actualizar turno"
        );
    }

    return data;
}

export async function cambiarEstadoTurno(
    token,
    id,
    estado
) {
    const response = await fetch(
        `${API_URL}/turnos/${id}/estado`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                estado,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.mensaje ||
                "Error al cambiar estado del turno"
        );
    }

    return data;
}

export async function eliminarTurno(
    token,
    id
) {
    const response = await fetch(
        `${API_URL}/turnos/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.mensaje ||
                "Error al eliminar turno"
        );
    }

    return data;
}