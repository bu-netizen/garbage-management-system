import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const ManageDriver = () => {
  const [drivers, setDrivers] = useState(() => {
    const savedDrivers = localStorage.getItem("drivers");
    return savedDrivers ? JSON.parse(savedDrivers) : [];
  });

  const [editingDriver, setEditingDriver] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      vehicle: "",
      licenseNumber: "",
    },
  });

  useEffect(() => {
    localStorage.setItem("drivers", JSON.stringify(drivers));
  }, [drivers]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5001/api/drivers/add", data);
      
      const newDriver = response.data.driver; // assuming the backend returns { driver: {...} }
  
      setDrivers((prevDrivers) => {
        const updatedDrivers = [...prevDrivers, newDriver];
        localStorage.setItem("drivers", JSON.stringify(updatedDrivers)); // optional, if not handled by useEffect
        return updatedDrivers;
      });
  
       reset(); // Uncomment this if you're using react-hook-form 's useForm()
    } catch (error) {
      console.error("Failed to add driver:", error);
      alert("Failed to add driver. Please try again.");
    }
  };

  const removeDriver = (id) => {
    setDrivers(drivers.filter((driver) => driver.id !== id));
  };

  const startEdit = (driver) => {
    setEditingDriver(driver);
    setValue("name", driver.name);
    setValue("phone", driver.phone);
    setValue("vehicle", driver.vehicle);
    setValue("licenseNumber", driver.licenseNumber);
  };

  return (
    <div className="w-full min-h-screen text-center font-sans bg-cover bg-center p-5"
      style={{
        backgroundImage:
          "url('https://media.licdn.com/dms/image/v2/C5112AQHfbj9Uve3J2Q/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1533013630729?e=2147483647&v=beta&t=Rn_zLwVbe__q-R-e_oiEIFszNSIqR8180vEdWlEnITk')",
      }}
    >
      <h1 className="text-3xl text-[#002a54ef] mb-4 font-bold drop-shadow-[5px_3px_5px_rgba(236,159,159,1)]">
        Manage Drivers
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap justify-center gap-3 mb-6"
      >
        <input
          {...register("name")}
          placeholder="Driver Name"
          className="p-2 border border-gray-300 rounded-md w-52"
        />
        <input
          {...register("phone")}
          placeholder="Phone Number"
          className="p-2 border border-gray-300 rounded-md w-52"
        />
        <input
          {...register("vehicle")}
          placeholder="Vehicle Assigned"
          className="p-2 border border-gray-300 rounded-md w-52"
        />
        <input
          {...register("licenseNumber")}
          placeholder="License Number"
          className="p-2 border border-gray-300 rounded-md w-52"
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded-md text-white ${
            editingDriver ? "bg-yellow-500" : "bg-green-600"
          }`}
        >
          {editingDriver ? "Update Driver" : "Add Driver"}
        </button>
      </form>

      <table style={{ width: "88%", borderCollapse: "collapse", marginTop: "20px", backgroundColor: "rgba(66, 240, 167, 0.3)", borderRadius: "10px", padding: "10px" }}>
        <thead>
          <tr style={{ backgroundColor: "rgba(250, 33, 196, 0.3)",padding: "10px" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Vehicle</th>
            <th>License Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td><strong>{driver.id}</strong></td>
              <td><strong>{driver.name}</strong></td>
              <td><strong>{driver.phone}</strong></td>
              <td><strong>{driver.vehicle}</strong></td>
              <td><strong>{driver.licenseNumber}</strong></td>
              <td>
                <button onClick={() => startEdit(driver)} style={{ padding: "5px 10px", backgroundColor: "#ffc107", border: "none", cursor: "pointer", borderRadius: "5px", marginRight: "5px" }}>Edit</button>
                <button onClick={() => removeDriver(driver.id)} style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDriver;
