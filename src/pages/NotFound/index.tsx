import { HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <h2 className="text-amber-400 text-9xl font-bold">404</h2>
      <p className="text-gray-500 text-xl mb-6">Ops! houve um problema, não encontramos está página!</p>
      <Link className="flex items-center gap-2 bg-amber-300 text-gray-800 py-2 px-6 rounded-md font-bold cursor-pointer hover:bg-amber-400 duration-300" to="/">
        <HomeIcon className="size-5" />
        <span>Voltar para a página inicial</span>
      </Link>
    </div>
  )
}