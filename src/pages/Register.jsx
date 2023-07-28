import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthState } from "../context/AuthProvider";
import { Notify } from '../utils'
// import IMAGES from "../assets";

const Register = () => {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setimagePreview] = useState(null); // Default image for preview

    const { setAuth } = AuthState();
    const navigate = useNavigate();

    const handleCredentials = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleProfilePic = async (e) => {
        setIsLoading(true);
        const profilePic = e.target.files[0]; // Get the file

        // Check file type
        if (
            profilePic.type !== "image/jpeg" &&
            profilePic.type !== "image/jpg" &&
            profilePic.type !== "image/png"
        ) {
            e.target.value = null; // Clear upload field
            // setimagePreview(IMAGES.user);
            setIsLoading(false);
            return Notify("Only .jpeg, .jpg and .png supported", "warn");
        }

        // Check file size
        if (profilePic.size > 1 * 1024 * 1024) {
            e.target.value = null; // Clear upload field
            // setimagePreview(IMAGES.user);
            setIsLoading(false);
            return Notify("Please upload image under 1 MB", "warn");
        }

        // Save the image in FormData object
        const formData = new FormData();
        formData.append("file", profilePic); // Contains the file
        formData.append(
            "upload_preset",
            `${import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET}`
        ); // Upload preset in Cloudinary
        formData.append(
            "cloud_name",
            `${import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME}`
        ); // Cloud name in Cloudinary

        try {
            // Upload image to cloudinary if user selected an image
            const cloudinaryResponse = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const cloudinaryData = await cloudinaryResponse.json();

            // If profile pic is uploaded, set the image URL for registration
            setCredentials({
                ...credentials,
                profilePic: cloudinaryData.secure_url.toString(),
            });

            // Image preview logic
            const reader = new FileReader();
            reader.readAsDataURL(profilePic);
            reader.onload = () => setimagePreview(reader.result);

            setIsLoading(false);
            return Notify("Profile pictute uploaded", "success");
        } catch (error) {
            e.target.value = null; // Clear upload field
            // setimagePreview(IMAGES.user);
            setIsLoading(false);
            return Notify("Internal server error", "error");
        }
    };

    const registerHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // If any field is missing
        if (
            !credentials.name ||
            !credentials.email ||
            !credentials.password ||
            !credentials.confirmPassword
        ) {
            setIsLoading(false);
            return Notify("Please Fill all the Feilds", "warn");
        }

        // If password and confirm password doesn't match
        if (credentials.password !== credentials.confirmPassword) {
            setIsLoading(false);
            return Notify("Passwords Do Not Match", "warn");
        }

        // If password is less than 8 characters
        if (credentials.password.length < 8) {
            setIsLoading(false);
            return Notify("Password must be at least 8 characters", "warn");
        }

        try {
            // Register user
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    profilePic: credentials.profilePic,
                }),
            });
            const data = await response.json();
            console.log(data);
            if (data.success) {
                localStorage.setItem("auth", JSON.stringify(data)); // Save auth details in local storage
                setAuth(data);
                setIsLoading(false);
                navigate("/"); // Go to home page
                return Notify("Your account has been successfully created", "success");
            } else {
                setIsLoading(false);
                return Notify(data.error, "error");
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error)
            return Notify("Internal server error", "error");
        }
    };

    return (
        <form className=" p-4 mx-auto max-w-md border rounded shadow-lg" onSubmit={registerHandler}>
            <h2 className="text-center mb-5 text-xl font-md">Create new account</h2>

            {imagePreview && (
                <div className="mb-3 d-flex justify-content-center">
                    <img
                        src={imagePreview}
                        alt="Profile image"
                        className="rounded-circle"
                        style={{ width: "150px", height: "150px" }}
                    />
                </div>
            )}

            <div className="mb-3">
                <label htmlFor="name" className="block mb-1">Full Name</label>
                <input
                    type="text"
                    name="name"
                    tabIndex="1"
                    placeholder="Full name"
                    value={credentials.name}
                    onChange={handleCredentials}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="block mb-1">Email address</label>
                <input
                    type="email"
                    name="email"
                    tabIndex="2"
                    placeholder="Enter email"
                    value={credentials.email}
                    onChange={handleCredentials}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="block mb-1">Password</label>
                <input
                    type="password"
                    name="password"
                    tabIndex="3"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleCredentials}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    tabIndex="4"
                    placeholder="Confirm password"
                    value={credentials.confirmPassword}
                    onChange={handleCredentials}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="profilePic" className="block mb-1">Upload profile picture</label>
                <input
                    type="file"
                    accept="image/jpeg, image/jpg, image/png"
                    name="profilePic"
                    tabIndex="5"
                    onChange={handleProfilePic}
                />
            </div>

            <button
                tabIndex="6"
                type="submit"
                className={`w-full p-2 bg-green-500 rounded text-white disabled:opacity-50 ${isLoading ? 'cursor-not-allowed' : 'hover:bg-green-600'
                    }`}
                disabled={isLoading}
            >
                {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="mt-3 text-center">
                <span>
                    Already have an account?&nbsp;
                    <Link to="/login" tabIndex="7" className="text-blue-500 hover:underline">
                        Log in
                    </Link>
                </span>
            </div>
        </form>
    );
};

export default Register;
