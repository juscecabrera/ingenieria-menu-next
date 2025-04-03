'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const AccountPage = () => {
  const { data: session, update } = useSession();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);

  // Cargar datos iniciales solo si el estado está vacío
  useEffect(() => {
    if (session?.user && !userData.name) {
      setUserData({
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image || ''
      });
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/register?id=${session?.user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
      }

      const updatedUser = await response.json();
      console.log("Datos devueltos por el servidor:", updatedUser);

      // Actualizar estado local
      const newUserData = {
        name: updatedUser.data.name || userData.name,
        email: updatedUser.data.email || userData.email,
        image: updatedUser.data.image || userData.image
      };
      setUserData(newUserData);

      // Actualizar la sesión
      await update({
        name: newUserData.name,
        email: newUserData.email,
        image: newUserData.image
      });

    } catch (error) {
      console.error("Error in handleEditUser:", error);
      alert(error instanceof Error ? error.message : 'Error al actualizar usuario');
      setUserData({
        name: session?.user?.name || '',
        email: session?.user?.email || '',
        image: session?.user?.image || ''
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-2xl">Cuenta</h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Nombre</legend>
            <input
              type="text"
              className="input border border-black"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Correo</legend>
            <input
              type="email"
              className="input border border-black"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Foto (URL)</legend>
            <input
              type="text"
              className="input border border-black"
              name="image"
              value={userData.image}
              onChange={handleChange}
              placeholder="URL de la imagen"
            />
          </fieldset>

          <button
            onClick={handleEditUser}
            className="btn mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            disabled={loading}
          >
            Confirmar Cambios
          </button>
        </>
      )}
    </div>
  );
};

export default AccountPage;
