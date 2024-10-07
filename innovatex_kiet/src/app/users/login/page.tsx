// import React from 'react'

// const login = () => {
//   return (
//     <div>
//         LOGIN PAGE
//     </div>
//   )
// }

// export default login




"use client"; // Mark this component as a Client Component

import { useState } from 'react'; // Import useState to manage component state
import { useRouter } from 'next/navigation'; // Import useRouter for client-side routing

// Define the Login component
export default function login() {
  // Create a router instance for navigation
  const router = useRouter();

  // Initialize state for form data, error messages, and loading status
  const [formData, setFormData] = useState({
    email: '', // Email input field
    password: '', // Password input field
  });
  const [error, setError] = useState<string | null>(null); // State for storing error messages
  const [loading, setLoading] = useState(false); // State for loading status during submission

  // Handle input field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    setFormData({
      ...formData, // Retain existing form data
      [name]: value, // Update the specific field with the new value
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true
    setError(null); // Clear any existing error messages

    try {
      // Make a POST request to the login API endpoint
      const res = await fetch('/api/users/login', {
        method: 'POST', // Specify the request method
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(formData), // Convert form data to JSON string and send it in the request body
      });

      const data = await res.json(); // Parse the response data

      // Check if the response is not OK (indicates an error)
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong'); // Throw an error with the error message from the response or a default message
      }

      // Alert success message and redirect to the homepage or dashboard
      alert('Logged in successfully');
      router.push('/users/profile'); // Navigate to the home page or dashboard
    } catch (error: any) {
      setError(error.message); // Set the error state to the error message
    } finally {
      setLoading(false); // Set loading state to false after the request is complete
    }
  };

  // Render the component
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      {/* Container for the form */}
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md ">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1> {/* Form title */}

        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message if any */}

        {/* Form element */}
        <form onSubmit={handleSubmit}>
          {/* Email input field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 ">
              Email
            </label>
            <input
              type="email" // Input type is email
              name="email" // Name attribute for identification
              id="email" // ID for accessibility
              value={formData.email} // Bind input value to email state
              onChange={handleInputChange} // Call handleInputChange on input change
              required // Make this field mandatory
              className="mt-1 block w-full p-2 border border-gray-300 dark:bg-gray-900 dark:text-white rounded" // Tailwind CSS classes for styling
            />
          </div>

          {/* Password input field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password" // Input type is password
              name="password" // Name attribute for identification
              id="password" // ID for accessibility
              value={formData.password} // Bind input value to password state
              onChange={handleInputChange} // Call handleInputChange on input change
              required // Make this field mandatory
              className="mt-1 block w-full p-2 border border-gray-300 dark:bg-gray-900 dark:text-white rounded" // Tailwind CSS classes for styling
            />
          </div>

          {/* Submit button */}
          <button
            type="submit" // Button type is submit
            disabled={loading} // Disable button when loading
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} // Tailwind CSS classes for styling
          >
            {loading ? 'Logging in...' : 'Login'} {/* Display loading message or login text */}
          </button>
        </form>

        {/* Link to signup page */}
        <p className="mt-4 text-center">
          Don't have an account? <a href="/users/signup" className="text-blue-500">Sign up</a>
        </p>
      </div>
    </div>
  );

  // return(
  //   <div>
  //   <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //     <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
  //       <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
  //       <form>
  //         <div className="mb-4">
  //           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
  //             Email
  //           </label>
  //           <input
  //             type="email"
  //             id="email"
  //             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
  //             placeholder="you@example.com"
  //             required
  //           />
  //         </div>
  //         <div className="mb-4">
  //           <label htmlFor="password" className="block text-sm font-medium text-gray-700">
  //             Password
  //           </label>
  //           <input
  //             type="password"
  //             id="password"
  //             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
  //             required
  //           />
  //         </div>
  //         <button
  //           type="submit"
  //           className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded transition duration-200"
  //         >
  //           Log In
  //         </button>
  //       </form>
  //       <div className="mt-4 text-center">
  //         <p className="text-sm text-gray-600">Or continue with</p>
  //         <div className="flex justify-center space-x-4 mt-2">
  //           <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200">
  //             <img src="/google-icon.svg" alt="Google" className="w-6 h-6" />
  //           </button>
  //           <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200">
  //             <img src="/facebook-icon.svg" alt="Facebook" className="w-6 h-6" />
  //           </button>
  //           <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200">
  //             <img src="/apple-icon.svg" alt="Apple" className="w-6 h-6" />
  //           </button>
  //         </div>
  //       </div>
  //       <p className="mt-4 text-sm text-center text-gray-600">
  //         Don't have an account? <a href="#" className="text-pink-500">Sign Up here</a>
  //       </p>
  //     </div>
  //   </div>
  //   </div>
  // )


  // return(
  // <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //     {/* Left Image Section */}
  //     <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/path/to/your/image.png')" }}>
  //       {/* You can replace '/path/to/your/image.png' with the actual path to your image */}
  //     </div>
  //     {/* Right Form Section */}
  //     <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
  //       <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
  //       <form>
  //         <div className="mb-4">
  //           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
  //             Email
  //           </label>
  //           <input
  //             type="email"
  //             id="email"
  //             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
  //             placeholder="you@example.com"
  //             required
  //           />
  //         </div>
  //         <div className="mb-4">
  //           <label htmlFor="password" className="block text-sm font-medium text-gray-700">
  //             Password
  //           </label>
  //           <input
  //             type="password"
  //             id="password"
  //             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
  //             required
  //           />
  //         </div>
  //         <button
  //           type="submit"
  //           className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded transition duration-200"
  //         >
  //           Log In
  //         </button>
  //       </form>
  //       <div className="mt-4 text-center">
  //         <p className="text-sm text-gray-600">Or continue with</p>
  //         <div className="flex justify-center space-x-4 mt-2">
  //           <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200">
  //             <img src="/google-icon.svg" alt="Google" className="w-6 h-6" />
  //           </button>
  //           <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200">
  //             <img src="/facebook-icon.svg" alt="Facebook" className="w-6 h-6" />
  //           </button>
  //           <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200">
  //             <img src="/apple-icon.svg" alt="Apple" className="w-6 h-6" />
  //           </button>
  //         </div>
  //       </div>
  //       <p className="mt-4 text-sm text-center text-gray-600">
  //         Don't have an account? <a href="#" className="text-pink-500">Sign Up here</a>
  //       </p>
  //     </div>
  //   </div>
  // );
}
