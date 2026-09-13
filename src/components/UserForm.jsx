import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAddUserMutation } from "../api/usersApi";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  phone: yup
    .string()
    .required("Phone is required")
    .min(10, "Phone must be at least 10 digits"),
});

const inputClass =
  "w-full mb-1 px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-blue-600";

const UserForm = () => {
  // RTK Query mutation for submitting the form
  const [addUser, { isLoading, isSuccess, isError }] = useAddUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await addUser(data).unwrap();
      reset();
    } catch {
      // isError from RTK Query will show the message
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8"
      >
        <h1 className="text-2xl font-semibold text-slate-900 text-center mb-6">
          User Registration
        </h1>

        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          className={inputClass}
          {...register("name")}
        />
        {errors.name && (
          <p className="mb-3 text-sm text-red-600">{errors.name.message}</p>
        )}

        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className={inputClass}
          {...register("email")}
        />
        {errors.email && (
          <p className="mb-3 text-sm text-red-600">{errors.email.message}</p>
        )}

        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="phone">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="Enter your phone"
          className={`${inputClass} mb-6`}
          {...register("phone")}
        />
        {errors.phone && (
          <p className="mb-3 text-sm text-red-600">{errors.phone.message}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 rounded-lg bg-blue-700 text-white font-medium cursor-pointer hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>

        <div className="mt-4 min-h-6 text-center text-sm">
          {isLoading && <p className="text-slate-600">Submitting...</p>}
          {isSuccess && (
            <p className="text-green-700">Form submitted successfully</p>
          )}
          {isError && <p className="text-red-600">Something went wrong</p>}
        </div>
      </form>
    </div>
  );
};

export default UserForm;
