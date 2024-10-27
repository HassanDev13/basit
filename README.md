# 🚀 NAME OF THE PROJECT Setup Guide

Welcome to the **NAME OF THE PROJECT** project! This guide will help you set up your development environment step by step. Get ready for a seamless experience with Laravel, Inertia.js, React, and Shadcn UI.

## Prerequisites 📋

Before we dive in, ensure you have the following installed on your machine:

- **Docker** 🐳
- **Docker Compose** ⚙️

## Installation Steps 🛠️

Follow these steps to get the project up and running:

### 1. Clone the Repository 🧬

First, clone the repository and navigate into the project directory:

```bash
git clone https://github.com/StackInTechDev/edu-platform.git
cd edu-platform
```

### 2. Configure Environment Variables 🔧

Copy the example environment file and adjust the environment variables as needed:

```bash
cp .env.example .env
```

### 3. Install PHP Dependencies with Composer 📦

Install the PHP dependencies using Composer within a Docker container:

```bash
docker run --rm \
-u "$(id -u):$(id -g)" \
-v "$(pwd):/var/www/html" \
-w /var/www/html \
laravelsail/php83-composer:latest \
composer install --ignore-platform-reqs
```

### 4. Create a Sail Alias for Convenience 🚤

Set up an alias for Sail to make it easier to run commands:

```bash
alias sail='sh $([ -f sail ] && echo sail || echo vendor/bin/sail)'
```

To ensure this alias is always available, add it to your shell configuration file (e.g., `~/.zshrc` or `~/.bashrc`) and restart your shell.

### 4.1 Start the Development Environment 🚀

Bring up the development environment using Laravel Sail:

```bash
sail up -d
```
### 5. Install JavaScript Dependencies 🌐

Install the necessary JavaScript dependencies using NPM:

```bash
sail npm install
```

### 6. Generate the Application Key 🔑

Generate a unique application key for your Laravel project:

```bash
sail artisan key:generate
```

### 7. Run Database Migrations 📂

Apply the database migrations to set up your database schema:

```bash
sail artisan migrate
```

### 8. (Optional) Seed the Database 🌱

Optionally, populate your database with initial data:

```bash
sail artisan db:seed
```

### 9. Run the dev 🌱

To see your update in realtime use

```bash
sail npm dev
```

## You're All Set! 🎉

Your development environment is now up and running! Let's build something awesome together!.

Happy coding! 💻✨

---

Feel free to reach out if you encounter any issues or have any questions.
