import React from 'react';

function Card() {
    return (
        <div className="card">
            <div className="content">
                <span></span>
                <div className="imagenPresentacion">
                    <img src="assets/perfil.png" alt="" />
                </div>
                <h4>Ignacio Tosini</h4>
                <h6>Front-end Developer</h6>
                <p>
                    Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Dolor quae accusamus deserunt
                </p>
            </div>
            <div className="links">
                <a target="_blank" rel='noreferrer' href="#">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a target="_blank" rel='noreferrer' href="https://www.linkedin.com/in/ignacio-tosini/">
                    <i className="fab fa-linkedin"></i>
                </a>
                <a target="_blank" rel='noreferrer' href="https://github.com/IgnacioTosini?tab=repositories">
                    <i className="fab fa-github"></i>
                </a>
                <a target="_blank" rel='noreferrer' href="#">
                    <i className="fab fa-whatsapp"></i>
                </a>
            </div>
        </div>
    );
}

export default Card;
