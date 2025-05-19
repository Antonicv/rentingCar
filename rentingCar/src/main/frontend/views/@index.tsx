import { ViewConfig } from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = { menu: { order: 0, icon: 'line-awesome/svg/home-solid.svg' }, title: 'home' };

export default function HomeView() {
  return (
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
     <div  className="logo-container"></div>

      <h1>Vehículos a pupilaje</h1>
    </div>
  );
}
