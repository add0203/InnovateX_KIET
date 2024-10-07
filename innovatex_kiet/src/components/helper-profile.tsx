import React, { useState } from 'react';

interface Experience {
  company: string;
  role: string;
  duration: string;
}

interface ProfileProps {
  name: string;
  email: string;
  registerNumber: string;
  degree: string;
  batch: number;
  college: string;
  profileImage: string;
  level: number;
  experiences?: Experience[]; // Optional experiences prop
}

const Profile: React.FC<ProfileProps> = ({
  name,
  email,
  registerNumber,
  degree,
  batch,
  college,
  profileImage,
  level,
  experiences = [], // Default to an empty array if experiences is undefined
}) => {
  const [newExperience, setNewExperience] = useState<Experience>({
    company: '',
    role: '',
    duration: '',
  });

  const [experienceList, setExperienceList] = useState<Experience[]>(experiences);

  // Handle adding a new experience
  const addExperience = () => {
    if (newExperience.company && newExperience.role && newExperience.duration) {
      setExperienceList([...experienceList, newExperience]);
      setNewExperience({ company: '', role: '', duration: '' }); // Reset form
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
        <p className="text-sm text-gray-500">
          Last Updated on 22/09/2024 | 04:18 PM
        </p>
      </div>
      <div className="relative mt-6">
        <img
          src="/images/banner.jpg"
          alt="Profile Banner"
          className="w-full h-32 rounded-t-lg object-cover"
        />
        <div className="absolute -bottom-12 left-6 w-24 h-24">
          <img
            src={profileImage}
            alt={name}
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>
      <div className="mt-16 text-center">
        <h3 className="text-3xl font-bold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600">{email}</p>
        <div className="flex justify-center mt-4 text-gray-700 space-x-6">
          <p>
            <span className="font-semibold">Register Number :</span>{' '}
            {registerNumber}
          </p>
          <p>
            <span className="font-semibold">Degree :</span> {degree}
          </p>
          <p>
            <span className="font-semibold">Batch :</span> {batch}
          </p>
          <p>
            <span className="font-semibold">College :</span> {college}
          </p>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div>
            <span className="px-4 py-2 bg-green-100 text-green-700 text-sm rounded-full">
              Beginner
            </span>
            <div className="text-center">
              <span className="text-xl font-bold text-gray-800">Level {level}</span>
              <p className="text-xs text-gray-500">of 5</p>
            </div>
          </div>
          
          {/* Experience Section */}
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Experience</h3>
            {experienceList.length > 0 ? (
              <ul>
                {experienceList.map((exp, index) => (
                  <li key={index} className="bg-gray-100 p-4 rounded-lg shadow mb-2">
                    <p className="font-semibold">{exp.company}</p>
                    <p className="text-sm">{exp.role}</p>
                    <p className="text-xs text-gray-500">{exp.duration}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No experience added yet.</p>
            )}

            {/* Add Experience Form */}
            <div className="mt-6">
              <input
                type="text"
                placeholder="Company"
                value={newExperience.company}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, company: e.target.value })
                }
                className="border p-2 rounded w-full mb-2"
              />
              <input
                type="text"
                placeholder="Role"
                value={newExperience.role}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, role: e.target.value })
                }
                className="border p-2 rounded w-full mb-2"
              />
              <input
                type="text"
                placeholder="Duration"
                value={newExperience.duration}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, duration: e.target.value })
                }
                className="border p-2 rounded w-full mb-2"
              />
              <button
                onClick={addExperience}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition">
                Add Experience
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
