import React from "react";

export default function HomeView() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          backgroundColor: "#f4f4f4",
          padding: "20px",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        }}
      >
        <h2>Alquileres Viuda de Agapito e Hijas</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <a href="/" style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "10px" }}>🏠</span> Home
              </a>
            </li>
            <li>
              <a href="/crear-delegacion" style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "10px" }}>🏢</span> Crear Delegación
              </a>
            </li>
            <li>
              <a href="/crear-coche" style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "10px" }}>🚗</span> Crear Coche
              </a>
            </li>
            <li>
              <a href="/crear-usuario" style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "10px" }}>👤</span> Crear Usuario
              </a>
            </li>
            <li>
              <a href="/crear-booking" style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "10px" }}>📅</span> Crear Booking
              </a>
            </li>
            <li>
              <a href="/bookings" style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "10px" }}>📖</span> Bookings
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      {/* This is where the main content of the app will be rendered */}import React from "react";

      export default function HomeView() {
        return (

              <h2>Alquileres Viuda de Agapito e Hijas</h2>
              <img
                src="../imagenes/ViudaEHijas"
                alt="Viuda e Hijas"
                style={{ width: "100%", marginTop: "10px", borderRadius: "5px" }}
              />
              <nav>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li>
                    <a href="/" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>🏠</span> Home
                    </a>
                  </li>
                  <li>
                    <a href="/crear-delegacion" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>🏢</span> Crear Delegación
                    </a>
                  </li>
                  <li>
                    <a href="/crear-coche" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>🚗</span> Crear Coche
                    </a>
                  </li>
                  <li>
                    <a href="/crear-usuario" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>👤</span> Crear Usuario
                    </a>
                  </li>
                  <li>
                    <a href="/crear-booking" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>📅</span> Crear Booking
                    </a>
                  </li>
                  <li>
                    <a href="/bookings" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>📖</span> Bookings
                    </a>
                  </li>
                </ul>
              </nav>
            </aside>

            {/* Main Content */}
            {/* This is where the main content of the app will be rendered */}
            <main style={{ flex: 1, padding: "20px" }}>
              <h1>Bienvenido a Alquileres Viuda de Agapito e Hijas</h1>
              <p>Selecciona una opción del menú para comenzar.</p>
            </main>
          </div>
        );
      }import React from "react";

      export default function HomeView() {
        return (
          <div style={{ display: "flex", height: "100vh" }}>
            {/* Sidebar */}
            <aside
              style={{
                width: "250px",
                backgroundColor: "#f4f4f4",
                padding: "20px",
                boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
              }}
            >
              <h2>Alquileres Viuda de Agapito e Hijas</h2>
              <img
                src="/imagenes/ViudaEHijas.jpg"
                alt="Viuda e Hijas"
                style={{ width: "100%", marginTop: "10px", borderRadius: "5px" }}
              />
              <nav>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li>
                    <a href="/" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>🏠</span> Home
                    </a>
                  </li>
                  <li>
                    <a href="/crear-delegacion" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>🏢</span> Crear Delegación
                    </a>
                  </li>
                  <li>
                    <a href="/crear-coche" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>🚗</span> Crear Coche
                    </a>
                  </li>
                  <li>
                    <a href="/crear-usuario" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>👤</span> Crear Usuario
                    </a>
                  </li>
                  <li>
                    <a href="/crear-booking" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>📅</span> Crear Booking
                    </a>
                  </li>
                  <li>
                    <a href="/bookings" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>📖</span> Bookings
                    </a>
                  </li>
                </ul>
              </nav>
            </aside>

            {/* Main Content */}
            {/* This is where the main content of the app will be rendered */}
            <main style={{ flex: 1, padding: "20px" }}>
              <h1>Bienvenido a Alquileres Viuda de Agapito e Hijas</h1>
              <p>Selecciona una opción del menú para comenzar.</p>
            </main>
          </div>
        );
      }import React from "react";

      export default function HomeView() {
        return (
          <div style={{ display: "flex", height: "100vh" }}>
            {/* Sidebar */}
            <aside
              style={{
                width: "250px",
                backgroundColor: "#f4f4f4",
                padding: "20px",
                boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
              }}
            >
              <h2>Alquileres Viuda de Agapito e Hijas</h2>
              <img
                src="/imagenes/ViudaEHijas.jpg"
                alt="Viuda e Hijas"
                style={{ width: "100%", marginTop: "10px", borderRadius: "5px" }}
              />
              <nav>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li>
                    <a href="/" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>🏠</span> Home
                    </a>
                  </li>
                  <li>
                    <a href="/crear-delegacion" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>🏢</span> Crear Delegación
                    </a>
                  </li>
                  <li>
                    <a href="/crear-coche" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>🚗</span> Crear Coche
                    </a>
                  </li>
                  <li>
                    <a href="/crear-usuario" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>👤</span> Crear Usuario
                    </a>
                  </li>
                  <li>
                    <a href="/crear-booking" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>📅</span> Crear Booking
                    </a>
                  </li>
                  <li>
                    <a href="/bookings" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>📖</span> Bookings
                    </a>
                  </li>
                </ul>
              </nav>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: "20px" }}>
              <h1>Bienvenido a Alquileres Viuda de Agapito e Hijas</h1>
              <p>Selecciona una opción del menú para comenzar.</p>
            </main>
          </div>
        );
      }import React from "react";

      export default function HomeView() {
        return (
          <div style={{ display: "flex", height: "100vh" }}>
            {/* Sidebar */}
            <aside
              style={{
                width: "250px",
                backgroundColor: "#f4f4f4",
                padding: "20px",
                boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
              }}
            >
              <h2>Alquileres Viuda de Agapito e Hijas</h2>
              <nav>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li>
                    <a href="/" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>🏠</span> Home
                    </a>
                  </li>
                  <li>
                    <a href="/crear-delegacion" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>🏢</span> Crear Delegación
                    </a>
                  </li>
                  <li>
                    <a href="/crear-coche" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>🚗</span> Crear Coche
                    </a>
                  </li>
                  <li>
                    <a href="/crear-usuario" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>👤</span> Crear Usuario
                    </a>
                  </li>
                  <li>
                    <a href="/crear-booking" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>📅</span> Crear Booking
                    </a>
                  </li>
                  <li>
                    <a href="/bookings" style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginRight: "10px" }}>📖</span> Bookings
                    </a>
                  </li>
                </ul>
              </nav>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: "20px", textAlign: "center" }}>
              <img
                src="/imagenes/ViudaEHijas.jpg"
                alt="Emblema de la empresa"
                style={{ width: "200px", marginBottom: "20px", borderRadius: "50%" }}
              />
              <h1>Bienvenido a Alquileres Viuda de Agapito e Hijas</h1>
              <p>Selecciona una opción del menú para comenzar.</p>
            </main>
          </div>
        );
      }
      <main style={{ flex: 1, padding: "20px" }}>
        <h1>Bienvenido a Alquileres Viuda de Agapito e Hijas</h1>
        <p>Selecciona una opción del menú para comenzar.</p>

      </main>
    </div>
  );
}