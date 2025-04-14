import React, { useState, useEffect } from "react";

const ManageBin = () => {
  const [bins, setBins] = useState(() => {
    const savedBins = localStorage.getItem("bins");
    return savedBins ? JSON.parse(savedBins) : [];
  });

  const [newBin, setNewBin] = useState({ name: "", type: "", location: "" });
  const [editingBin, setEditingBin] = useState(null);

  useEffect(() => {
    localStorage.setItem("bins", JSON.stringify(bins));
  }, [bins]);

  const handleChange = (e) => {
    setNewBin({ ...newBin, [e.target.name]: e.target.value });
  };

  const addBin = () => {
    if (newBin.name && newBin.type && newBin.location) {
      setBins([...bins, { id: bins.length + 1, ...newBin }]);
      setNewBin({ name: "", type: "", location: "" });
    }
  };

  const removeBin = (id) => {
    setBins(bins.filter((bin) => bin.id !== id));
  };

  const startEdit = (bin) => {
    setEditingBin(bin);
    setNewBin(bin);
  };

  const updateBin = () => {
    setBins(
      bins.map((bin) => (bin.id === editingBin.id ? { ...editingBin, ...newBin } : bin))
    );
    setEditingBin(null);
    setNewBin({ name: "", type: "", location: "" });
  };

  return (
    <div style={{ width: "100%", textAlign: "center", padding: "20px" }}>
      <h1 style={{ color: "#035992" }}>Manage Bins</h1>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
        <input type="text" name="name" placeholder="Bin Name" value={newBin.name} onChange={handleChange} />
        <select name="type" value={newBin.type} onChange={handleChange}>
          <option value="">Select Type</option>
          <option value="recycling">Recycling</option>
          <option value="general">General Waste</option>
          <option value="compost">Compost</option>
        </select>
        <input type="text" name="location" placeholder="Location" value={newBin.location} onChange={handleChange} />
        {editingBin ? (
          <button onClick={updateBin} style={{ backgroundColor: "#ffc107" }}>Update Bin</button>
        ) : (
          <button onClick={addBin} style={{ backgroundColor: "#28a745", color: "white" }}>Add Bin</button>
        )}
      </div>
      <table style={{ width: "80%", margin: "auto", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#ddd" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bins.map((bin) => (
            <tr key={bin.id}>
              <td>{bin.id}</td>
              <td>{bin.name}</td>
              <td>{bin.type}</td>
              <td>{bin.location}</td>
              <td>
                <button onClick={() => startEdit(bin)} style={{ backgroundColor: "#ffc107", marginRight: "5px" }}>Edit</button>
                <button onClick={() => removeBin(bin.id)} style={{ backgroundColor: "#dc3545", color: "white" }}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBin;
