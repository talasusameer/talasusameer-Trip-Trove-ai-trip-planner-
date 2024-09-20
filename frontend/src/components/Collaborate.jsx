import React, { useState, useEffect } from 'react';
import pb from "../pocketbase/pocketbase.js";
import { toast } from "react-toastify";

const CollaborateComponent = ({ tripId }) => {
  const [email, setEmail] = useState('');
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const trip = await pb.collection('trips').getOne(tripId);

        if (trip.collaborate && trip.collaborate.length > 0) {
          const users = await Promise.all(
            trip.collaborate.map((userId) =>
              pb.collection('users').getOne(userId)
            )
          );
          setCollaborators(users);
        }
      } catch (error) {
        console.error('Error fetching collaborators:', error);
      }
    };

    fetchCollaborators();
  }, [tripId]);

  const handleAddCollaborator = async () => {
    try {
      const user = await pb.collection('users').getFirstListItem(`email="${email}"`);

      if (user) {
        const updatedTrip = await pb.collection('trips').update(tripId, {
          collaborate: [...collaborators.map(c => c.id), user.id],
        });

        setCollaborators([...collaborators, user]);
        toast.success('Collaborator added successfully!');
        setEmail('');
      } else {
        toast.error('User not found!');
      }
    } catch (error) {
      toast.error('An error occurred!');
      console.error('Error adding collaborator:', error);
    }
  };

  const handleRemoveCollaborator = async (collaboratorId) => {
    try {
      const updatedCollaborators = collaborators.filter(c => c.id !== collaboratorId);

      await pb.collection('trips').update(tripId, {
        collaborate: updatedCollaborators.map(c => c.id),
      });

      setCollaborators(updatedCollaborators);
      toast.success('Collaborator removed successfully!');
    } catch (error) {
      toast.error('An error occurred while removing the collaborator!');
      console.error('Error removing collaborator:', error);
    }
  };

  return (
    <div className="ml-64  bg-gray-900 text-white p-6 rounded-lg shadow-md w-screen mx-auto">
        <div className={'max-w-md'}>
      <h2 className="text-2xl font-bold mb-4">Collaborate on this Trip</h2>
      <div className="mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email to collaborate"
          className="w-full p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddCollaborator}
          className="mt-2 w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
        >
          Add Collaborator
        </button>
      </div>
      <h3 className="text-xl font-semibold mb-2">Collaborators:</h3>
      <ul className="space-y-2">
        {collaborators.length > 0 ? (
          collaborators.map((collaborator) => (
            <li key={collaborator.id} className="flex items-center justify-between bg-gray-800 p-2 rounded-md">
              <span>{collaborator.name} - {collaborator.email}</span>
              <button
                onClick={() => handleRemoveCollaborator(collaborator.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))
        ) : (
          <li className="text-gray-400">No collaborators yet.</li>
        )}
      </ul>
            </div>
    </div>
  );
};

export default CollaborateComponent;
