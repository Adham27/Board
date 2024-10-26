import React from 'react';
interface AddMemberFormProps {
    formData: {
        name: string;
        title: string;
        age: number;
        email: string;
        mobileNumber: string;
    };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const AddMemberForm: React.FC<AddMemberFormProps> = ({
    formData,
    handleInputChange,
    handleSubmit,
}) => {
    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg p-6 mb-4"
        >
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
                Add New Patient
            </h2>
            <div className="mb-4">
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cae5f7] text-gray-700"
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="mb-4">
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cae5f7] text-gray-700"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="mb-4">
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cae5f7] text-gray-700"
                    type="number"
                    placeholder="Age"
                    name="age"
                    value={formData.age || ''}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="mb-4">
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cae5f7] text-gray-700"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="mb-6">
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cae5f7] text-gray-700"
                    type="tel"
                    placeholder="Mobile Number"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="flex items-center justify-center">
                <button
                    className="bg-[#cae5f7] hover:bg-blue-400 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow"
                    type="submit"
                >
                    Add Patient
                </button>
            </div>
        </form>
    );
};

export default AddMemberForm;
