# How to Deploy SkyCast to Vercel 🚀

You can deploy your app to Vercel in less than 2 minutes. Here are the two best ways:

## Option 1: The Easy Way (Vercel CLI)
This method uploads your code directly from your terminal.

1.  **Open Terminal** in your project folder:
    ```bash
    cd weather-app
    ```

2.  **Run the deploy command**:
    ```bash
    npx vercel
    ```

3.  **Follow the prompts**:
    - Set up and deploy? **Y**
    - Which scope? (Select your account)
    - Link to existing project? **N**
    - Project name? **skycast** (or press Enter)
    - In which directory is your code located? **./** (Press Enter)
    - Want to modify these settings? **N**

4.  **Wait for build**: Vercel will install dependencies, build your React app, and give you a **Production URL** (e.g., `https://skycast-app.vercel.app`).

---

## Option 2: The Git Way (Recommended for Updates)
This method connects your GitHub repo to Vercel, so every time you `git push`, it updates automatically.

1.  **Push your code to GitHub** (if you haven't already).
2.  Go to [Vercel.com](https://vercel.com) and log in.
3.  Click **"Add New..."** -> **"Project"**.
4.  Select your **Weather-app** repository.
5.  Click **Deploy**.
6.  Vercel detects it's a React app and handles the rest!

## Important Note
Since we removed the backend requirement and switched to Open-Meteo (Free API), you **do NOT** need to set any Environment Variables! The app is fully static and client-side.
