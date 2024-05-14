import './css/contact.css';

function SideComponent() {
  return (
  <div className="side-component">

    <h1>Meet our Team</h1>
    {/* Integrante 1 */}
    <div className="integrante">
      <img src="../images/enrique.jpg" alt="Integrante 1" />
      <div className="info">
        <h3>Enrique Andrés Campos</h3>
        <p><b>Contact:</b> thrillseekersECA@gmail.com </p>
        <p><b>Position:</b> CFO & Co-founder </p>
        
      </div>
    </div>

    {/* Integrante 2 */}
    <div className="integrante">
      <img src="../images/patricia.jpg" alt="Integrante 2" />
      <div className="info">
        <h3>Patricia Renart Carnicero </h3>
        <p><b>Contact:</b> thrillseekersPRC@gmail.com  </p>
        <p><b>Position:</b> CEO & Co-founder </p>
      </div>
    </div>

    {/* Integrante 3 */}
    <div className="integrante">
      <img src="./assets/joaquin.jpg" alt="Integrante 3" />
      <div className="info">
        <h3>Joaquín Mir Macías</h3>
        <p><b>Contact:</b> thrillseekersJMM@gmail.com  </p>
        <p><b>Position:</b> Developer & Co-founder </p>
      </div>
    </div>
  </div>
);
}
export default function ContactInfo() {
  return (
    <div className="contact-container">

      <div className="info-container">

        <div className="contactinfo">
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
                Thank you for trusting us! 🎬
            </p>
          </div>
        </div>
  
        <div className="contact-form">

        <h1>Contact Us</h1>

        <p>Fill out the form below to send us a message and we will get back to you as soon as possible!</p>

        <form action="" method="post">
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Name" required="" />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Email" required="" />
          </div>
          <div className="form-control">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" placeholder="Subject" />
          </div>
          <div className="form-control">
            <label htmlFor="message">Message</label>
            <textarea name="message" placeholder="Message" defaultValue={""} />
          </div>
          <button type="submit">Send</button>
        </form>
        </div>
      </div>

      <SideComponent />


    </div>
  );
};
