const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 p-5 mt-10">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} v1.upow.network All rights reserved.
        </p>
        <p>
          Follow us on
          <a
            href="https://twitter.com/Upow_ai"
            className="text-white hover:text-gray-300 ml-2"
          >
            X
          </a>
          ,
          <a
            href="https://discord.gg/f2Vy5SpdB2"
            className="text-white hover:text-gray-300 ml-2"
          >
            Discord
          </a>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
