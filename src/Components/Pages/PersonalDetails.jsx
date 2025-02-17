import React, { useState, useEffect } from "react";
import { use } from "react";
import { useSelector, useDispatch } from "react-redux"
import { set, useForm } from "react-hook-form"

const PersonalDetails = () => {
  // fetching details and displaying them in the form
  const [details, setDetails] = useState({});
  const [emNa, setEmNa] = useState({});

  const id = useSelector((state) => state.id.value);

  const fetchDetails = async () => {
    const data = { id: id };
    const dataSend = await fetch("https://monitre-backend.onrender.com/personal-details", { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify(data) });
    const response = await dataSend.text();
    setDetails(JSON.parse(response)[0]);
  }

  const fetchEmNa = async ()=>{
    const data = { id: id };
    const dataSend = await fetch("https://monitre-backend.onrender.com/emna-details", { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify(data) });
    const response = await dataSend.text();
    setEmNa(JSON.parse(response));
  }

  useEffect(() => {
    fetchDetails();
    fetchEmNa();
  },[id]);

  // updating information to the backend
  const dispatch = useDispatch();
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
        let dataSend = await fetch("https://monitre-backend.onrender.com/user-details-update", { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify(dataWithId) });
        let response = await dataSend.text();
        if (response === "User Details Updated") {
            reset();
            fetchDetails();
        }
      }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-[#04AD83] mb-6">
        Personal Details
      </h1>

      {/* Form Start */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-semibold">Name:</label>
          <input
            type="text"
            placeholder={emNa.name}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-semibold">Email:</label>
          <input
            type="text"
            placeholder={emNa.email}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-semibold">Phone</label>
          <input
            type="number"
            placeholder={details.phone}
            className="w-full border border-gray-300 p-2 rounded-lg"
            {...register("phone", { required: true, min: 1000000000, max: 9999999999 })}
          />
        </div>

        {/* PAN */}
        <div>
          <label className="block text-gray-700 font-semibold">PAN</label>
          <input
            type="text"
            placeholder={details.pan}
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
            placeholder={details.income}
            className="w-full border border-gray-300 p-2 rounded-lg"
            {...register("income", { required: true, min: 20000, max: 1000000000 })}
          />
        </div>

        {/* Monthly Expenses */}
        <div>
          <label className="block text-gray-700 font-semibold">Monthly Expenses:</label>
          <input
            type="number"
            placeholder={details.expense}
            className="w-full border border-gray-300 p-2 rounded-lg"
            {...register("expense", { required: true, min: 15000, max: 500000000 })}
          />
        </div>

        {/* Savings */}
        <div>
          <label className="block text-gray-700 font-semibold">Savings:</label>
          <input
            type="number"
            placeholder={details.saving}
            className="w-full border border-gray-300 p-2 rounded-lg"
            {...register("saving", { required: true, min: 5000, max: 500000000 })}
          />
        </div>

        {/* Financial Goals */}
        <div>
          <label className="block text-gray-700 font-semibold">Financial Goals:</label>
          <textarea
            placeholder={details.goals}
            className="w-full border border-gray-300 p-2 rounded-lg"
            {...register("goals", { required: true, minLength: 3, maxLength: 10000 })}
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="mt-4 w-full bg-[#04AD83] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#038b66]"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default PersonalDetails;
