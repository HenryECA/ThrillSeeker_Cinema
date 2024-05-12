export default function ContactInfo() {
  return (
    <div className="container">
      <h1>¿Who are we?</h1>
      <div className="info">
        <h2 id="title">The three musketeers</h2>
        <p>
        We are a company founded by three university enthusiasts passionate about movies and good stories.
        We specialize in providing personalized movie recommendations to meet our customers' tastes.
        </p>
        <p>
            You can contact us anytime using the following form or visit our platform to discover our latest recommendations.
        </p>
        <p>
            We are also available by phone at 91606066 from 9am to 6pm, Monday to Friday.
        </p>
        <p>
            Thank you for trusting us! 🎬
        </p>

      </div>
      <div className="contact-form">
        <form action="" method="post">
          <div className="form-control">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" placeholder="Nombre" required="" />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Email" required="" />
          </div>
          <div className="form-control">
            <label htmlFor="subject">Asunto</label>
            <input type="text" id="subject" placeholder="Asunto" />
          </div>
          <div className="form-control">
            <label htmlFor="message">Mensaje</label>
            <textarea name="message" placeholder="Mensaje" defaultValue={""} />
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};
