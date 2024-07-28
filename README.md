# RT-Recommendation-Project-Main
# Project Installation Guide

This guide will help you set up and run your project, which consists of three Node.js servers and one Python server.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 16.x or higher)
- **npm** (version 8.x or higher)
- **Python** (version 3.12 or higher)
- **pip** (version 24.x or higher)
- **Virtualenv** (recommended for Python environment management)
- **MySQL** (version 8.x or higher)
- **MySQL Workbench** (for database management)
- **Apache Kafka** (version 2.7.x or higher)

## MySQL Database Setup

### Installation

1. Install MySQL Server:
    - On Ubuntu:
      ```bash
      sudo apt update
      sudo apt install mysql-server
      ```
    - On macOS using Homebrew:
      ```bash
      brew install mysql
      ```

2. Secure the MySQL installation:
    ```bash
    sudo mysql_secure_installation
    ```

3. Log in to the MySQL root account:
    ```bash
    mysql -u root -p
    ```

### Database and User Setup

1. Create a new database:
    ```sql
    CREATE DATABASE books_db_v1;
    ```

2. Create a new user and grant permissions:
    ```sql
    CREATE USER 'your_username'@'localhost' IDENTIFIED BY 'your_password';
    GRANT ALL PRIVILEGES ON books_db_v1.* TO 'your_username'@'localhost';
    FLUSH PRIVILEGES;
    ```

### Import Backup using MySQL Workbench

1. Open **MySQL Workbench**.

2. Connect to your MySQL server.

3. Go to the **Server** menu and select **Data Import**.

4. In the **Import** tab, select **Import from Folder**.

5. Browse to the location of your backup folder and select it.

6. In the **Default Schema to be Imported To** drop-down, select the `books_db_v1`.

7. Click **Start Import**.

## Apache Kafka Setup

### Installation

1. Download the latest version of Apache Kafka from the [official website](https://kafka.apache.org/downloads).

2. Extract the downloaded file:
    ```bash
    tar -xzf kafka_2.13-2.7.0.tgz
    cd kafka_2.13-2.7.0
    ```

### Start Zookeeper

Kafka uses Zookeeper to manage distributed brokers. Start the Zookeeper server:

1. Start Zookeeper:
    ```bash
    bin/zookeeper-server-start.sh config/zookeeper.properties
    ```

### Start Kafka Server

1. Open a new terminal and navigate to the Kafka directory.

2. Start the Kafka server:
    ```bash
    bin/kafka-server-start.sh config/server.properties
    ```



## Node.js Servers Setup

### Server 1: `NODE.JS Ecommerce server`

1. Navigate to the `server1` directory:
    ```bash
    cd path/to/Books-Ecommerce-Backend
    ```

2. Install the required Node.js packages:
    ```bash
    npm install
    ```

3. Start the server:
    ```bash
    npm start
    ```

### Server 2: `NODE.JS Kafka server`

1. Navigate to the `server2` directory:
    ```bash
    cd path/to/Books-Ecommerce-Kafka
    ```

2. Install the required Node.js packages:
    ```bash
    npm install
    ```

3. Start the server:
    ```bash
    npm start
    ```

## Vite + ReactJS Server Setup

### Server 3: `(Vite + ReactJS) Frontend server` 

1. Navigate to the `server3` directory:
    ```bash
    cd path/to/Books-Ecommerce-Frontend
    ```

2. Install the required Node.js packages:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

4. To build the project for production:
    ```bash
    npm run build
    ```

5. To preview the production build:
    ```bash
    npm run serve
    ```

## Python Server Setup

### Server 4: `PYTHON - Recommendation server`

1. Navigate to the `python_server` directory:
    ```bash
    cd path/to/Books-Recommendation-Backend-v2
    ```

2. Create a virtual environment:
    ```bash
    virtualenv venv
    ```

3. Activate the virtual environment:
    - On Windows:
      ```bash
      venv\Scripts\activate
      ```
    - On macOS/Linux:
      ```bash
      source venv/bin/activate
      ```

4. Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```

5. Start the server:
    ```bash
    python server.py --env pro
    ```

## Environment Variables

Ensure that each server is configured with the necessary environment variables. You can create a `.env` file in each server directory with the required variables. Below is an example template for the `.env` file

Update the values as needed for each server.

## Running the Servers

After setting up all servers, you can start them as described above. Make sure all servers are running concurrently. You can use tools like `pm2` for managing Node.js processes and `screen` or `tmux` for managing terminal sessions.

## Troubleshooting

- **Node.js Issues**: Ensure that the correct version of Node.js and npm are installed. You can use `nvm` (Node Version Manager) to manage Node.js versions.
- **Python Issues**: Make sure the virtual environment is activated before installing packages or running the server. Check that all required packages are installed correctly.
- **Environment Variables**: Verify that all necessary environment variables are set correctly in the `.env` files.

For additional help or questions, please refer to the project documentation or contact the project maintainers.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. This project is a part of the coursework at Ho Chi Minh University of Science (HCMUS).

## Authors

This project is developed by Bookada Team. The team members are:

- **Pham Quoc Vuong (leader)**
- **Dong My Linh**
- **Vo Thi Kim Ngan**

## Acknowledgements

We would like to express our sincere gratitude to our supervisors, Pham Nguyen Cuong, Luong Han Co , for the continuous support, guidance, and encouragement throughout the course of this project. Your expertise and valuable feedback have been instrumental in the successful completion of this project.