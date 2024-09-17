import LinkComp from "./LinkComp";
import type { IUser } from "@/app/interfaces";

const Sidebar = ({ user }: { user: IUser }) => {
  return (
    <aside className="fixed top-0 w-48 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full px-4 pt-24 pb-4 overflow-y-auto bg-accent-light dark:bg-primary-dark text-primary-light">
        <ul className="space-y-2 font-medium">
          <li>
            <LinkComp
              icon="home"
              span="Inicio"
              to={user.role === "ADMIN" ? "/admin/home" : "/auth/home"}
            />
          </li>
          {user.role === "ADMIN" && (
            <li>
              <LinkComp icon="sales" span="Ventas" to="/admin/sales" />
            </li>
          )}
          <li>
            <LinkComp
              icon="orders"
              span="Pedidos"
              to={user.role === "ADMIN" ? "/admin/orders" : "/auth/orders"}
            />
          </li>
          {user.role === "ADMIN" && (
            <>
              <li>
                <LinkComp
                  icon="products"
                  span="Productos"
                  to="/admin/products"
                />
              </li>
              <li>
                <LinkComp
                  icon="providers"
                  span="Proveedores"
                  to="/admin/providers"
                />
              </li>
            </>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
