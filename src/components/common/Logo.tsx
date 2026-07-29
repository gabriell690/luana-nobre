import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

interface LogoProps {
  className?: string;
}

export default function Logo({
  className = "h-24",
}: LogoProps) {
  return (
    <Link to="/" className="flex items-center select-none">
      <img
  src={logo}
  alt="Luana Nobre Perfumaria"
  className={`${className} w-auto max-w-none object-contain`}
/>
    </Link>
  );
}