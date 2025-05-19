import React, { useState, useEffect, Suspense } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { AppLayout, DrawerToggle, Icon, SideNav, SideNavItem } from '@vaadin/react-components';
import { createMenuItems, useViewConfig } from '@vaadin/hilla-file-router/runtime.js';
import { effect, signal } from '@vaadin/hilla-react-signals';

// Signal para el título del documento
const documentTitleSignal = signal('');
effect(() => {
  document.title = documentTitleSignal.value;
});
// Solución para TypeScript: usa "as any"
(window.Vaadin as any) = window.Vaadin || {};
(window.Vaadin as any).documentTitleSignal = documentTitleSignal;

export default function MainLayout() {
  const currentTitle = useViewConfig()?.title;
  const navigate = useNavigate();
  const location = useLocation();

  // Estado para el modo oscuro
  const [darkMode, setDarkMode] = useState(() =>
    document.documentElement.getAttribute('theme') === 'dark'
  );

  // Estado para el modo vintage (greyscale)
  const [vintageMode, setVintageMode] = useState(false);

  // Actualiza el título del documento cuando cambia la vista
  useEffect(() => {
    if (currentTitle) {
      documentTitleSignal.value = currentTitle;
    }
  }, [currentTitle]);

  // Sincroniza el atributo 'theme' de <html> con el estado darkMode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('theme');
    }
  }, [darkMode]);

  // Aplica o quita la clase vintage al <html>
  useEffect(() => {
    if (vintageMode) {
      document.documentElement.classList.add('vintage-mode');
    } else {
      document.documentElement.classList.remove('vintage-mode');
    }
  }, [vintageMode]);

  return (
    <AppLayout primarySection="drawer">
      <div slot="drawer" className="flex flex-col justify-between h-full p-m">
        <header className="flex flex-col gap-m">
          <span className="font-semibold text-l">Viuda de Agapito</span>
          <SideNav onNavigate={({ path }) => { if (path) navigate(path); }} location={location}>
            {createMenuItems().map(({ to, title, icon }) => (
              <SideNavItem path={to} key={to}>
                {icon ? <Icon src={icon} slot="prefix"></Icon> : null}
                {title}
              </SideNavItem>
            ))}
          </SideNav>
        </header>
      </div>

      <div slot="navbar" className="flex items-center justify-between w-full">
        <DrawerToggle aria-label="Menu toggle" />
        <h1 className="text-l m-0">{documentTitleSignal.value}</h1>
        {/* Botón para alternar el modo claro/oscuro */}
        <button
          className="vaadin-button"
          type="button"
          onClick={() => setDarkMode((prev) => !prev)}
          style={{
            marginLeft: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--lumo-border-radius-m)',
            border: 'none',
            background: 'var(--lumo-primary-color)',
            color: 'var(--lumo-base-color)',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {darkMode ? 'Modo claro' : 'Modo oscuro'}
        </button>
        {/* Botón para activar/desactivar el modo vintage */}
        <button
          className="vaadin-button"
          type="button"
          onClick={() => setVintageMode((prev) => !prev)}
          style={{
            marginLeft: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--lumo-border-radius-m)',
            border: 'none',
            background: '#bfae82',
            color: '#222',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {vintageMode ? 'Quitar vintage' : 'Modo vintage'}
        </button>
      </div>

      <Suspense>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}
