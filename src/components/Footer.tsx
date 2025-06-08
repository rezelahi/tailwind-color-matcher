import { Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="font-mono font-medium">
      Made with <Heart className="inline" size={14} /> by{" "}
      <a
        href="https://github.com/rezelahi"
        target="_blank"
        className="underline font-bold"
      >
        Reza Elahi
      </a>{" "}
    </footer>
  );
}

export default Footer;
