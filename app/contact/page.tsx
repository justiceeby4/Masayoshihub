import { ContactForm } from "@/components/Forms";

export default function Contact() {
  return (
    <main className="page">
      <div className="container narrow">
        <div className="page-head">
          <span className="section-kicker">
            SUPPORT
          </span>

          <h1>Contact us</h1>

          <p>
            Send a message using the working demo form below.
          </p>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
