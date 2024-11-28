interface Props {
  className?: string;
}

const Footer = ({ className }: Props) => {
  return (
    <footer
      className={` h-auto mt-auto  text-center italic z-10 md:text-xl lg:text-2xl xl:text-xl ${className}`}
    >
      <h3> &copy; 2024 | Designed by Giacomo Giovannetti</h3>
    </footer>
  );
};

export default Footer;
