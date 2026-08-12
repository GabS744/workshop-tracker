import { Link, useLocation, useNavigate } from "react-router-dom";

function getAuthInfo() {
  const token = localStorage.getItem("@WorkshopTracker:token");

  if (!token) {
    return { role: null };
  }

  try {
    const payload = token.split(".")[1];
    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const paddedPayload = normalizedPayload.padEnd(
      normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4),
      "=",
    );
    const decodedPayload = JSON.parse(atob(paddedPayload));

    const role =
      decodedPayload.role ||
      decodedPayload.Role ||
      decodedPayload[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ] ||
      null;

    return { role };
  } catch {
    return { role: null };
  }
}

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const authInfo = getAuthInfo();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Colaboradores", path: "/colaboradores" },
    { name: "Workshops", path: "/workshops" },
  ];

  return (
    <nav className="h-16 lg:px-46.5 bg-[#161c2a] border-b border-[#252f45] w-full flex items-center justify-between px-6 font-['Inter'] shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#5c6dff] rounded-md flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
          </svg>
        </div>

        <span className="text-white font-semibold text-lg tracking-wide">
          Workshop Tracker
        </span>
      </div>

      <div className="flex items-center gap-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-[#1a2540] text-[#4d8aff]"
                  : "text-[#7a88a4] hover:text-white hover:bg-[#1a2540]/50"
              }`}
            >
              {item.name}
            </Link>
          );
        })}

        <Link
          to="/login"
          className="px-3 py-2 rounded-md text-xs font-semibold tracking-wide uppercase border border-[#252f45] text-[#7a88a4] hover:text-white hover:bg-[#1a2540] transition-colors duration-200"
          title="Ir para a tela de login"
        >
          {authInfo.role === "Admin" ? "Admin" : "User"}
        </Link>

        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("@WorkshopTracker:token");
            navigate("/login");
          }}
          className="px-4 py-2 rounded-md text-sm font-medium bg-[#1a2540] text-[#e2e8f4] hover:bg-[#ef4444] hover:text-white transition-colors duration-200"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}
