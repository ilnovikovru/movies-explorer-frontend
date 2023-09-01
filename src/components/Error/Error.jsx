import './Error.css';
import { Link, useNavigate } from 'react-router-dom';

function Error() {
    const navigate = useNavigate()
    return (
        <>
            <main className='main'>
                <section className='main__error'>
                    <div className='main__error-container'>
                        <h1 className='main__error-title'>404</h1>
                        <p className='main__error-text'>Страница не найдена</p>
                    </div>
                    <Link className='main__error-link' onClick={() => navigate(-1)}>Назад</Link>
                </section>
            </main>
        </>
    );
}

export default Error;