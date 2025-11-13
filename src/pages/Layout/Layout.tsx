import "./Layout.css";
import { FaCode } from "react-icons/fa";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Outlet } from "react-router";

export default function Layout() {
    return (
        <>
            <main>
                <Outlet />
            </main>
            <footer>
                <p>Desenvolvido por Natalia Mirian Timote</p>
                <p className="footer-infos">Siga minha jornada, conheça mais sobre minha trajetória no LinkedIn ou confira meus projetos no GitHub!</p>
                <div>
                    <a href="https://www.linkedin.com/in/nataliamiriantimote" target='_blank'><SiLinkedin /></a>
                    <a href="https://www.github.com/Natalia-Timote" target='_blank'><SiGithub /></a>
                </div>
                <p className="footer-infos">Quer ver como tudo isso foi feito? Acesse o código completo deste projeto no GitHub!</p>
                <a href="https://github.com/Natalia-Timote/tamagotchi" target='_blank'><FaCode /></a>
            </footer>
        </>
    )
}