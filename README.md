# RecShorts

## Workflows

1. Dataset Collections.
2. Data Preprocessing.
3. Creating TF-idf matrix for recommandation.
4. Creating AWL Lamda function for differant services
5. Frontend
6. Backend
7. Deployment in GCP

## Data Collections

For data collection, our project leverages RSS feeds from various news sources. Specifically, we utilize RSS feeds provided by "The Hindu," a reputable news outlet. This method allows us to gather data in XML format, which includes a wide range of news categories.

**Example:**

```xml
<item>
    <title>
        <![CDATA[ Watch: Waqf Amendment bill, 1995 | What does it reveal about the state of coalitions? ]]>
    </title>
    <description>
        <![CDATA[ In this episode of Talking Politics, we discuss the implications of the Waqf Amendment Bill, 1995 on the state of political coalitions. ]]>
    </description>
    <link>
        <![CDATA[ https://www.thehindu.com/news/national/watch-waqf-amendment-bill-1995-what-does-it-reveal-about-the-state-of-coalitions/article68512757.ece ]]>
    </link>
    <guid isPermaLink="false">article-68512757</guid>
    <category>
        <![CDATA[ India ]]>
    </category>
    <pubDate>
        <![CDATA[ Sun, 11 Aug 2024 17:08:07 +0530 ]]>
    </pubDate>
    <media:content height="675" medium="image" url="https://th-i.thgim.com/public/incoming/y148h9/article68512750.ece/alternates/LANDSCAPE_1200/Nistula%20Thumb%205.png" width="1200"/>
</item>
```

By parsing these XML feeds, we capture a comprehensive dataset encompassing approximately 45 different news categories, each rich in content and context. This approach enables continuous updates and broad coverage, ensuring a robust dataset for our application.

## Data Preprocessing

During the data preprocessing phase, we consolidate information from various news categories into a structured CSV format. Each record in the single CSV file is structured with the following fields: `Category`, `Title`, `Description`, and `Image`.

Here's a brief overview of our preprocessing steps:

1. **Parsing XML Feeds:** We extract data from the XML feeds provided through RSS links. Each news item is analyzed for essential elements.
2. **Handling Missing Data:** Not all news articles come with a description. In cases where the description is missing, we assign a `NULL` value to ensure the integrity of our dataset.
3. **CSV Compilation:** After parsing and cleaning the data, we compile it into a CSV file. This file is then used for further Recommandation to user.

The structured approach to data preprocessing ensures that the dataset is clean, organized, and ready for subsequent stages of the project.

## Creating TF-IDF Matrix for Recommendation

To generate personalized content recommendations, our system utilizes the Term Frequency-Inverse Document Frequency (TF-IDF) matrix. This approach helps in quantifying the relevance of keywords found in the `Title` and `Description` fields of each news article.

### Steps to Generate the TF-IDF Matrix:

1. **Keyword Extraction:** Initially, we extract keywords from both the `Title` and `Description` columns. For this purpose, we employ the `PKE` (Python Keyphrase Extraction) library, which is adept at extracting significant terms from text.
2. **TF-IDF Computation:** We then compute the TF-IDF values for these keywords to determine their importance across different documents. The TF-IDF matrix forms the foundation of our content recommendation engine by highlighting the most distinguishing terms in each article.

### Installation of PKE Library:

The PKE library is crucial for keyword extraction in our preprocessing step. To install PKE, use the following pip command:

```bash
pip install git+https://github.com/boudinfl/pke.git
```

## Creating AWS Lambda Functions for Different Services

To automate our news recommendation process and ensure daily updates to our dataset, we utilize AWS Lambda functions. These serverless functions are scheduled to run automatically every day, performing critical tasks without manual intervention.

### Lambda Functions Setup:

1. **News Fetching Function:**
   - **Purpose:** This function is responsible for fetching new articles daily from the specified RSS feed.
   - **Operation:** It retrieves the latest news items and appends them to our existing dataset stored in an AWS S3 bucket.
2. **TF-IDF Matrix Generation Function:**
   - **Purpose:** This function updates the TF-IDF matrix based on the newly added news articles.
   - **Operation:** After the new data is fetched and stored, this function recalculates the TF-IDF values to reflect the most recent data, ensuring our recommendation system remains current and relevant.

### Automation with AWS Lambda:

- **Trigger Setup:**
  - We have configured a daily trigger using AWS Lambda's scheduling feature. This job trigger ensures that both Lambda functions execute once every 24 hours, automating the data update and matrix recalibration process.
- **Storage:**
  - All processed datasets are securely stored in an AWS S3 bucket, which provides reliable and scalable storage solutions. This setup facilitates easy access and manipulation of the data by our Lambda functions.

This configuration not only automates the entire update process but also ensures that our recommendation system is always equipped with the latest data, enhancing user experience and engagement.

## Frontend

Our project's frontend is developed using React. React allows us to create a dynamic and responsive experience for users accessing our news recommendation service.

### Key Features of Our React Frontend:

- **Component-Based Architecture:** We utilize React's component-based architecture to build reusable UI components that manage their state, making the application scalable and easy to manage.
- **State Management:** State management is handled elegantly within our components, with hooks and context to share state across the app without unnecessary props drilling.
- **Responsive Design:** The frontend is designed to be mobile-responsive, ensuring a seamless experience on both desktop and mobile devices.
- **Interactive Elements:** Interactive elements such as buttons, links, and dynamic forms enhance user engagement and ease of use.

### Development Tools and Libraries:

- **Create React App:** This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), which provides a robust setup for developing powerful single-page applications.
- **React Router:** We use React Router for handling navigation within our application, allowing for multiple pages to coexist within a single-page application framework.
- **Material-UI:** Material-UI is used to style our components, providing a sleek, modern look and feel with minimal effort.
- **Axios:** For HTTP requests to fetch data from the backend, Axios is used for its promise-based architecture that makes handling asynchronous requests straightforward.

### Running the Frontend Locally:

To run the frontend of our application locally, you can follow these steps:

```bash
cd path-to-your-project/
npm install
npm start
```

## IMAGE of Frontend
![Image Description](relative/path/to/image.png)

## Backend

The backend of our project is powered by Flask, a lightweight and flexible Python web framework that is well-suited for small to medium web applications. Flask provides the tools necessary to build a robust API that handles our application’s data operations efficiently.

### Running the Backend Locally:

To set up and run the backend server on your local machine, follow these steps:

```bash
cd backend-directory/
pip install -r requirements.txt
flask run
```

## Deployment Frontend (Vercel) and Backend (GCP)

Our project uses Vercel for deploying the React frontend and Google Cloud Platform (GCP) for the Flask backend, utilizing a YAML file for configuration and deployment settings. This setup ensures a streamlined deployment process tailored to the needs of both the user interface and server-side components.

### Deploying the Frontend on Vercel:

1. **Setup and Configuration:**

   - Connect your GitHub, GitLab, or Bitbucket repository to your Vercel account.
   - Vercel automatically detects React projects and configures build settings accordingly.

2. **Automatic Deployments:**

   - Pushes to your repository will trigger automatic deployments, with Vercel handling build and deployment processes.

3. **Custom Domains and Environment Variables:**
   - Configure custom domains through Vercel’s dashboard.
   - Manage environment variables in Vercel to securely store and access API endpoints and sensitive data.

### Deploying the Backend on Google Cloud Platform (GCP) using YAML:

1. **Configuration with YAML:**

   - Prepare a YAML file to define the configuration and deployment parameters of your Flask application. This file specifies resource allocations, scaling options, and service definitions.

2. **Using Google Kubernetes Engine (GKE) or Cloud Run:**
   Google Cloud can be configured via YAML for certain settings if integrated through CI/CD pipelines that handle containerization implicitly.

3. **Securing and Managing the Backend:**

   - Use Google Cloud’s IAM (Identity and Access Management) to manage access controls.
   - Integrate Google Cloud Secret Manager to handle sensitive information like API keys and database credentials securely.

4. **Connecting Frontend with Backend:**
   - Update the environment variables in Vercel’s dashboard to include the backend service URL exposed by GCP after deployment.
   - Configure CORS (Cross-Origin Resource Sharing) settings on your Flask application to allow requests from your frontend domain.

### Monitoring and Operations:

- **Monitoring through GCP:** Utilize Google Cloud’s monitoring tools to track the performance and health of your backend.
- **Logs and Metrics:** Access detailed logs and metrics through the Google Cloud Console to maintain and optimize application performance.

By utilizing Vercel for frontend deployments and GCP with YAML configurations for the backend, our application leverages the strengths of both platforms, ensuring efficient, scalable, and secure operations.
