# Hybrid Cloud Architect Portfolio

A blazing-fast, highly optimized React portfolio template designed specifically for Cloud Architects, Security Engineers, and DevOps professionals.

This project utilizes a **Smart Hybrid Architecture**:
1. **Static Mode:** It can be hosted statically on GitHub Pages, reading your hardcoded career data.
2. **Container Mode:** It includes a zero-configuration Docker setup. When spun up via Docker Compose, it automatically detects environment variables and safely overwrites the UI, making it incredibly easy to deploy customized instances without touching the React code.

---

## Architecture & Tech Stack
* **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion (for animations), Lucide React (for icons).
* **Containerization:** Docker, Docker Compose, Nginx (Alpine).
* **CI/CD:** GitHub Actions (Automated GitHub Pages deployment).

---

## System Requirements

To fully utilize and customize this template, ensure your system has the following installed:
* [Git](https://git-scm.com/downloads) (For cloning the repository)
* [Node.js v20+](https://nodejs.org/en) & npm (For local development and building)
* [Docker](https://docs.docker.com/get-docker/) & Docker Compose (For containerized deployment)

---

## Phase 1: Local Setup & Deep Customization

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

To add your complex data arrays (which are too large for simple Docker environment variables), open `src/App.jsx` in your code editor.

Locate the data arrays at the top of the file and replace them with your own history.

**Example - Updating Certifications:**

```javascript
const MY_CERTIFICATIONS = [
  { name: "CISM (Certified Information Security Manager)", issuer: "ISACA" },
  { name: "Azure Solutions Architect Expert (AZ-305)", issuer: "Microsoft" }
];
```

**Example - Updating Experience:**

```javascript
const MY_EXPERIENCE = [
  { 
    role: "Cloud Security Architect", 
    company: "Enterprise Corp", 
    period: "2023 - Present", 
    description: "Designed and implemented SSO architecture utilizing OneLogin as the primary Identity Provider, securing access across 50+ internal applications." 
  }
];
```

### Step 4: Test Your Changes Locally

Run the Vite development server to see your changes in real-time:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`. Every time you save a file, the browser will automatically refresh.

-----

## Phase 2: Docker Setup (The Containerized Way)

Once your base code is ready, you can package it into a Docker image. This allows you (or anyone in the community) to rapidly deploy the site and change the high-level branding purely through configuration.

### Step 1: Build the Docker Image

From the root of your project directory, build the image and tag it with your Docker Hub username:

```bash
docker build -t yourusername/react-portfolio:latest .
```

### Step 2: Push to Docker Hub (Optional)

If you want to make this publicly available, push it to your repository:

```bash
docker push yourusername/react-portfolio:latest
```

### Step 3: Deploy via `docker-compose.yml`

Create a `docker-compose.yml` file on your server (or share this with the community). You can dynamically change your Name, Tagline, About Me, Expertise, and Social Links right here without rebuilding the image\!

```yaml
version: '3.8'

services:
  portfolio:
    image: yourusername/react-portfolio:latest
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
      - BLOG_URL=[https://yourblog.com](https://yourblog.com)
```

### Step 4: Run the Container

```bash
docker compose up -d
```

Your containerized portfolio is now live at `http://localhost:8080`\!

-----

## Phase 3: GitHub Pages Deployment

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
3.  Wait for the DNS check to complete, then check the box for **Enforce HTTPS**.
4.  Create a `CNAME` file inside your local `/public` directory containing just your domain name, and push it to GitHub so the Action doesn't overwrite your settings on the next build\!

-----

## Contributing

Contributions, issues, and feature requests are welcome\!

## License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

```
```
