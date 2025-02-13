import { useState, useEffect } from "react";

const API_BASE_URL = "https://localhost:7154/api/Customers"; // Adjust based on your API

const App = () => {
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        occupation: "",
        boughtUnits: 0,
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await fetch(API_BASE_URL);
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = editingId
                ? `${API_BASE_URL}/${editingId}?${new URLSearchParams(formData).toString()}`
                : `${API_BASE_URL}?${new URLSearchParams(formData).toString()}`;

            const method = editingId ? "PATCH" : "POST";

            const response = await fetch(url, { method });
            const responseData = await response.json();

            if (response.ok) {
                fetchCustomers();
                setFormData({ name: "", email: "", contact: "", occupation: "", boughtUnits: 0 });
                setEditingId(null);
            } else {
                console.error("Error saving customer:", responseData);
                alert(responseData.message || "An error occurred while saving the customer.");
            }
        } catch (error) {
            console.error("Error saving customer:", error);
            alert("An unexpected error occurred.");
        }
    };

    const handleEdit = (customer) => {
        setEditingId(customer.customerId);
        setFormData({
            name: customer.name,
            email: customer.email,
            contact: customer.contact,
            occupation: customer.occupation,
            boughtUnits: customer.boughtUnits,
        });
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
            if (response.ok) fetchCustomers();
            else console.error("Error deleting customer:", await response.text());
        } catch (error) {
            console.error("Error deleting customer:", error);
        }
    };

    return (
        <div
            style={{
                width: "100vw",
                padding: "20px",
                boxSizing: "border-box",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
                Customer Management
            </h1>
            <form
                onSubmit={handleSubmit}
                style={{
                    marginBottom: "20px",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    background: "#f9f9f9",
                }}
            >
                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                        Name:
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                        required
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                        Email:
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                        required
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                        Contact:
                    </label>
                    <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                        required
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                        Occupation:
                    </label>
                    <input
                        type="text"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                        Bought Units:
                    </label>
                    <input
                        type="number"
                        name="boughtUnits"
                        value={formData.boughtUnits}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                        required
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        background: "#007bff",
                        color: "white",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    {editingId ? "Update" : "Add"} Customer
                </button>
            </form>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    textAlign: "left",
                }}
            >
                <thead>
                    <tr>
                        {["Name", "Email", "Contact", "Occupation", "Bought Units", "Actions"].map(
                            (heading) => (
                                <th
                                    key={heading}
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "10px",
                                        background: "#f4f4f4",
                                    }}
                                >
                                    {heading}
                                </th>
                            )
                        )}
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.customerId}>
                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                                {customer.name}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                                {customer.email}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                                {customer.contact}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                                {customer.occupation}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                                {customer.boughtUnits}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                                <button
                                    onClick={() => handleEdit(customer)}
                                    style={{
                                        background: "#ffc107",
                                        color: "white",
                                        padding: "5px 10px",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        marginRight: "5px",
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(customer.customerId)}
                                    style={{
                                        background: "#dc3545",
                                        color: "white",
                                        padding: "5px 10px",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;
