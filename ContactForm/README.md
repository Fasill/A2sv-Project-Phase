# MyForm Component

This project contains a simple, beautiful form component built with React, React Hook Form, Yup for validation, and styled with Tailwind CSS.

## Description

The `MyForm` component allows users to input their username, email, and a message. The form includes validation to ensure all fields are filled out correctly, providing instant feedback to the user.

## Features

- Form validation using React Hook Form and Yup.
- Responsive and accessible form design.
- Styled using Tailwind CSS for a modern and clean look.

## Installation

1. Clone the repository:
    ```sh
   git clone https://github.com/your-username/myform-component.git](https://github.com/Fasill/A2sv-Project-Phase/tree/main/ContactForm
    ```
2. Navigate to the project directory:
    ```sh
    cd myform-component
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the development server:
    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000` to see the form in action.

## Code Overview

The `MyForm` component is defined in `src/MyForm.tsx`. It uses React Hook Form for handling form state and validation, and Yup for defining validation schemas. Tailwind CSS is used to style the form.

### MyForm Component

```jsx
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

    const { register, handleSubmit, setValue, reset } = form;
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

export default MyForm;
```
![Screenshot from 2024-08-01 15-18-04](https://github.com/user-attachments/assets/dcee7b47-02fc-4087-b567-140d40d2f690)
![Screenshot from 2024-08-01 15-18-28](https://github.com/user-attachments/assets/3861e339-a320-498d-bbdd-80807e4b0b48)
![Screenshot from 2024-08-01 15-17-40](https://github.com/user-attachments/assets/adbe4e71-f05c-4809-8324-8b847eb74683)


