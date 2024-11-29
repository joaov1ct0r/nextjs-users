import LoginForm from "@/app/signin/components/sign-in-form";
import { ToastContainer, Bounce } from "react-toastify";

export default function Home() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={0}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <main className="h-screen w-screen overflow-hidden">
        <LoginForm />
      </main>
    </div>
  );
}
