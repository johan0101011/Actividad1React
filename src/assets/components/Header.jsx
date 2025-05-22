function Header() {
  return (
    <header id="cabecera">
      <div id="logo">
        <img src="/img/ARTLINE.png" alt="logo" width="110px" />
      </div>
      <h1>ARTLINE</h1>
      <nav id="menu">
        <ul>
          <li><a href="#">PINTURAS</a></li>
          {/* <li><a href="#">AUTORES</a></li>
          <li><a href="#">BIOGRAFÍAS</a></li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
