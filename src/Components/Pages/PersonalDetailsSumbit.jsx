import React from 'react'
import { set, useForm } from "react-hook-form"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'

const PersonalDetailsSumbit = () => {
    const id = useSelector((state) => state.id.value);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setError,
        reset,
    } = useForm()

    const onSubmit = async (data) => {
        const dataWithId = await { ...data, id };
        let dataSend = await fetch("https://monitre-backend.onrender.com/user-details", { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify(dataWithId) });
        let response = await dataSend.text();
        if (response === "User Details Set") {
            reset();
            navigate("/dashboard");
        }
    }

    return (
        <div>
            <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-center text-[#04AD83] mb-6">
                    Personal Details
                </h1>

                {/* Form Start */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Phone Number*/}
                    <div>
                        <label className="block text-gray-700 font-semibold">Phone Number:</label>
                        <input
                            type="number"
                            placeholder="Enter your mobile number"
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            {...register("phone", { required: true, min: 1000000000, max: 9999999999 })}
                        />
                    </div>
                    {/* PAN Number*/}
                    <div>
                        <label className="block text-gray-700 font-semibold">PAN Number:</label>
                        <input
                            type="text"
                            placeholder="Enter your PAN number"
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            {...register("pan", {
                                required: true,
                                pattern: {
                                    value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                                    message: "Invalid PAN number format",
                                },
                            })}
                        />
                    </div>
                    {/* Monthly Income */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Monthly Income:</label>
                        <input
                            type="number"
                            placeholder="Enter your monthly income"
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            {...register("income", { required: true, min: 20000, max: 1000000000 })}
                        />
                    </div>

                    {/* Monthly Expenses */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Monthly Expenses:</label>
                        <input
                            type="number"
                            placeholder="Enter your monthly expenses"
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            {...register("expense", { required: true, min: 15000, max: 500000000 })}
                        />
                    </div>

                    {/* Savings */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Savings:</label>
                        <input
                            type="number"
                            placeholder="Enter your current savings"
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            {...register("saving", { required: true, min: 5000, max: 500000000 })}
                        />
                    </div>

                    {/* Financial Goals */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Financial Goals:</label>
                        <textarea
                            placeholder="Enter your financial goals (e.g., Buy a house, Save for a car)"
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            {...register("goals", { required: true, minLength: 3, maxLength: 10000 })}
                        />
                    </div>

                    {/* Save Button */}
                    <button
                        type="submit"
                        className="mt-4 w-full bg-[#04AD83] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#038b66]"
                    >
                        Save Details
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PersonalDetailsSumbit
