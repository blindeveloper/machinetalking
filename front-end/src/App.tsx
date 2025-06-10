import './App.css';

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
        {/* <section>
            <button onclick="sendData()">Send</button>

            <script>
                function sendData() {
                    const data = {
                        "longitude": [-121.95],
                        "latitude": [37.11],
                        "housing_median_age": [21.0],
                        "total_rooms": [2387.0],
                        "total_bedrooms": [357.0],
                        "population": [913.0],
                        "households": [341.0],
                        "median_income": [7.736],
                        "ocean_proximity": ["<1H OCEAN"]
                    };

                    fetch("https://q790y4een3.execute-api.eu-central-1.amazonaws.com/predict", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    })
                    .then(res => res.json())
                    .then(response => console.log(response))
                    .catch(err => console.error(err));
                }
            </script>
        </section> */}
    </main>
    </div>
  );
};

export default App;
