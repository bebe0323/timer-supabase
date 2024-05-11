"use client";

interface AuthFormProps {
  action: (formData: FormData) => Promise<void>;
  buttonText: string;
  title: string;
}

export default function AuthForm({ action, buttonText, title }: AuthFormProps) {
  return (
    <form className="flex flex-col">
      <div className="flex w-full justify-center">
        <p className="text-3xl mb-6 font-bold">{title}</p>
      </div>
      <label htmlFor="email" className="mb-2 text-slate-500">
        Email address
      </label>
      <input
        className="auth-input"
        id="email"
        name="email"
        type="email"
        placeholder="Your email address"
        required
      />
      <label htmlFor="password" className="mb-2 text-slate-500">
        Password
      </label>
      <input
        className="auth-input"
        id="password"
        name="password"
        type="password"
        placeholder="Your password"
        required
      />
      <button
        className="auth-button border rounded-lg bg-green-400 hover:bg-green-500 py-3"
        formAction={action}
      >
        {buttonText}
      </button>
    </form>
  );
}
