import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FormValues = {
    username: string;
    email: string;
    message: string;
}

const schema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    message: yup.string().required("Message is required"),
}).required();

const MyForm = () => {
    const form = useForm<FormValues>({
        resolver: yupResolver(schema)
    });

    const { register, handleSubmit, reset } = form;
    const { errors } = form.formState;

    const handleSetValue = () => {
    }

    const onSubmit = (data: FormValues) => {
        console.log("hello", data)
        handleSetValue();
        reset();
    }

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        {...register("username")}
                    />
                    <p className="mt-2 text-sm text-red-600">{errors.username?.message}</p>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        {...register("email")}
                    />
                    <p className="mt-2 text-sm text-red-600">{errors.email?.message}</p>
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        id="message"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        {...register("message")}
                    />
                    <p className="mt-2 text-sm text-red-600">{errors.message?.message}</p>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default MyForm
