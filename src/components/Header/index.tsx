import { Link } from "react-router-dom";
import ImgLogo from "../../assets/logo-color.svg";

export function Header() {
  return (
    <header className="flex justify-center items-center w-full h-30">
      <Link to="/">
        <img width={250} src={ImgLogo} alt="Logo" title="Logo Cripto.dev" />
      </Link>
    </header>
  )
}