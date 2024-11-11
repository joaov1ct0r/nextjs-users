import LoginForm from "@/app/signin/components/sign-in-form";
import { ToastContainer, Bounce } from "react-toastify";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header>
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
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <LoginForm />
      </main>
    </div>
  );
}
