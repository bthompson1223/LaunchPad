import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {

    return (
        <footer className='dev-credits'>
            <div className="meet-the-devs">Meet the devs!</div>
            <section className='individual-details'>
                <Link to='https://bthompson1223.github.io'>
                    <h3>Bryan Thompson</h3>

                </Link>
                <Link to='https://www.github.com/bthompson1223'>
                    <p> Github <FaGithub /></p>

                </Link>
                <Link to='https://www.linkedin.com/in/bryanthompsondev/'>
                    <p> LinkedIn <FaLinkedin /></p>

                </Link>
            </section>
            <section className='individual-details'>
                <Link to='https://thechee.github.io/'>
                    <h3>Chase Agee</h3>

                </Link>
                <Link to='https://github.com/thechee'>
                    <p> Github <FaGithub /></p>

                </Link>
                <Link to='https://www.linkedin.com/in/chase-agee/'>
                    <p> LinkedIn <FaLinkedin /></p>

                </Link>
            </section>
            <section className='individual-details'>
                <Link to='https://leileili1010.github.io/'>
                    <h3>Lei Li</h3>

                </Link>
                <Link to='https://github.com/leileili1010'>
                    <p> Github <FaGithub /></p>

                </Link>
                <Link to='https://www.linkedin.com/in/leileili/'>
                    <p> LinkedIn <FaLinkedin /></p>

                </Link>
            </section>
        </footer>
    );
}

export default Footer;
