import './Home.css';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <div className='page-container'>
      <section className="page-section">
        <p>Imagine a place where you can bring your machine learning ideas to life, where data meets creativity and innovation</p>
      </section>
      <section className="page-section">
        <p>A place where complex ML problems turn into elegant, working solutions — models, predictions, and insights crafted for your goals.</p>
      </section>
      <section className="page-section">
        <p>A place where your vision is understood, experiments are handled with care, and results are clear, actionable, and reliable.</p>
      </section>
      <section className="page-section">
        <p>Welcome to MachineTalking — where we collaborate to turn your ML ideas into reality. Let’s deliver solutions for you.</p>
      <ContactForm />
    </section>
    </div>
  );
}