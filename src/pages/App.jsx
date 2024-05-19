import NavbarComponent from '../components/ui/Navbar'

function App() {
  return (
    <div className="w-full h-[90vh]">
      <NavbarComponent />
      <div className="w-full h-full p-5 flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl font-bold text-[#6350dd]">
          Prueba Técnica - Fullstack Developer
        </h1>
        <h2 className="text-2xl">Proyecto: Ubicaciones de Tiendas</h2>
        <h2 className="text-1xl">
          <span className="font-bold">Por:</span> Pablo Cesar Cordova Tapia
        </h2>
      </div>
    </div>
  )
}

export default App
