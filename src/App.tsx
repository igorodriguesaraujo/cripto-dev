import { RouterProvider } from "react-router-dom";
import { router } from "./Roues";

export function App() {
  return (
    <main className="bg-gray-900 text-slate-300 min-h-screen w-full">
      <RouterProvider router={router} />
    </main>
  )
}