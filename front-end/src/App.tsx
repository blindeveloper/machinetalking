import './App.css';
import SubmitForm from './components/SubmitForm';

const App = () => {
  return (
    <div className="content">
        <header>
            <h1>ML AI Projects 👾</h1>
        </header>
        <main>
            <section class="project">
                <h2>Project 1: Image Classification</h2>
                <p>Description: A project to classify images using a convolutional neural networks.</p>
                <p>Results: Achieved 95% accuracy on the test dataset.</p>
            </section>
            <section class="project">
                <h2>Project 2: Sentiment Analysis</h2>
                <p>Description: A project to analyze the sentiment of text data using natural language processing.</p>
                <p>Results: Achieved 90% accuracy on the sentiment analysis task.</p>
            </section>
            <section>
                <SubmitForm />
            </section>
        </main>
    </div>
  );
};

export default App;
