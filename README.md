# 🚀 Hybrid Cloud Architect Portfolio

A blazing-fast, highly optimized React portfolio template designed specifically for Cloud Architects, Security Engineers, and DevOps professionals.

> 🌐 **Live Demo:** Check out the template in action at [jahmed.cloud](https://jahmed.cloud)

This project utilizes a **Smart Hybrid Architecture**:
1. **Static Mode:** It can be hosted statically on GitHub Pages, reading your hardcoded career data.
2. **Container Mode:** It includes a zero-configuration Docker setup. When spun up via Docker Compose, it automatically detects environment variables and safely overwrites the UI, making it incredibly easy to deploy customized instances without touching the React code.

---

## 🏗️ Architecture & Tech Stack
* **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion (for animations), Lucide React (for icons).
* **Containerization:** Docker, Docker Compose, Nginx (Alpine).
* **CI/CD:** GitHub Actions (Automated GitHub Pages deployment).

---

## 📋 System Requirements

To fully utilize and customize this template, ensure your system has the following installed:
* [Git](https://git-scm.com/downloads) (For cloning the repository)
* [Node.js v20+](https://nodejs.org/en) & npm (For local development and building)
* [Docker](https://docs.docker.com/get-docker/) & Docker Compose (For containerized deployment)

---

## 🛠️ Phase 1: Local Setup & Deep Customization

If you want to completely overhaul the portfolio with your own custom projects, certifications, and career history, follow this developer setup.

### Step 1: Clone the Repository
Open your terminal and pull the code to your local machine:
```bash
git clone [https://github.com/jahmed-cloud/jahmed-cloud.github.io.git](https://github.com/jahmed-cloud/jahmed-cloud.github.io.git)
cd jahmed-cloud.github.io
````

### Step 2: Install Dependencies

Download all the required React packages:

```bash
npm install
```

### Step 3: Edit the Core Data (`src/App.jsx`)

To add your complex data arrays, open `src/App.jsx` in your code editor. Locate the data arrays at the top of the file and replace them with your own history.

### Step 4: Test Your Changes Locally

Run the Vite development server to see your changes in real-time:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

-----

## 🐳 Phase 2: Docker Setup (Containerized)

You can package this application into a Docker image to rapidly deploy it anywhere using environment variables.

### Option A: Build the Image Locally

If you want to build the Docker image yourself from the source code:

1.  **Build the image and tag it:**
    ```bash
    docker build -t jahmed22/react-portfolio:latest .
    ```
2.  **Run the container directly:**
    ```bash
    docker run -d -p 8080:80 \
      -e USER_NAME="Your Name" \
      -e USER_TAGLINE="Your Tagline" \
      --name my-portfolio \
      jahmed22/react-portfolio:latest
    ```

### Option B: Deploy via `docker-compose.yml` (Pull Prebuilt Image)

For easier management, or if you just want to use the pre-built template without touching the source code, use Docker Compose. This will automatically pull the image from Docker Hub.

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  portfolio:
    # Pulls the prebuilt image from Docker Hub
    image: jahmed22/react-portfolio:latest
    container_name: react-portfolio
    ports:
      - "8080:80" 
    restart: always
    environment:
      # ==========================================
      # 🛠️ DYNAMIC BRANDING VARIABLES
      # ==========================================
      - USER_NAME=Junaid Ahmed
      - USER_TAGLINE=Cloud Security & Identity Architect
      - ABOUT_ME=I design secure, resilient cloud solutions with a focus on Identity and Access Management and Zero Trust architecture.
      - EXPERTISE=Azure Security, Entra ID, Terraform, Python, DevSecOps
      
      # --- Social & Contact Links ---
      # Leave a link completely blank to automatically hide its icon!
      - LINKEDIN_URL=[https://linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
      - GITHUB_URL=[https://github.com/jahmed-cloud](https://github.com/jahmed-cloud)
      - EMAIL_ADDRESS=mailto:your.email@example.com
      - BLOG_URL=[https://jahmed.cloud](https://jahmed.cloud)
```

Run the container:

```bash
docker compose up -d
```

Your containerized portfolio is now live at `http://localhost:8080`\!

-----

## 🚀 Phase 3: GitHub Pages Deployment

If you prefer free static hosting over a Docker VPS, this repository is pre-configured with a GitHub Action to deploy your site automatically.

1.  Commit and push your local changes to the `master` branch:
    ```bash
    git add .
    git commit -m "Updated portfolio content"
    git push origin master
    ```
2.  Go to your repository on GitHub.
3.  Navigate to **Settings** \> **Pages** (on the left sidebar).
4.  Under **Build and deployment**, set the **Source** dropdown to **GitHub Actions**.
5.  The deployment will trigger automatically. You can watch the progress in the **Actions** tab.

### 🔗 Linking a Custom Domain

1.  In the **Settings \> Pages** menu, scroll down to **Custom domain**.
2.  Enter your domain (e.g., `jahmed.cloud`) and click Save.
3.  Go to your Domain Registrar (GoDaddy, Cloudflare, etc.) and add the following **A Records** pointing to GitHub's servers:
      * `185.199.108.153`
      * `185.199.109.153`
      * `185.199.110.153`
      * `185.199.111.153`
4.  Wait for the DNS check to complete on GitHub, then check the box for **Enforce HTTPS**.
5.  Create a `CNAME` file inside your local `/public` directory containing just your domain name, and push it to GitHub so the Action doesn't overwrite your settings on the next build\!

-----

## 🤝 Contributing

Contributions, issues, and feature requests are welcome\!

## 📄 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

```
```
