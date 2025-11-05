import FormLogin from "@/components/dashboards/FormLogin";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="bg-white border border-gray-300 shadow-md rounded-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-12">
          Login to Your Account
        </h1>

        <FormLogin />
      </div>
    </div>
  );
}
