# Meeting Room Booking System 
 
This project is a meeting room booking system with live deployment, built using TypeScript and ES6. It allows users to view available meeting rooms, book them for specific time slots, and prevents double bookings for the same time. Only admins can manage bookings and users, with secure JWT authentication. Swagger documentation is included for easy access to backend services. 
 
## Features 
- **Live Deployment**: Accessible with a live PostgreSQL database. 
- **Room Availability**: Displays all available meeting rooms and time slots. 
- **Flexible Booking**: Prevents overlapping bookings by time. 
- **JWT Authentication**: Allows only admin users to manage bookings and users. 
- **Swagger Integration**: Visible API documentation for backend services. 
 
## Installation 
 
1. Clone the repository: 
\`\`\` 
git clone https://github.com/aman7100/Meeting-Room-Booking.git
\`\`\` 
 
2. Install dependencies: 
\`\`\` 
npm install 
\`\`\` 
 
3. Set up your environment variables by creating a \`.env\` file with database credentials, JWT secret, and Swagger URL. 
 
## Running the Project 
 
To start the development server, run: 
\`\`\` 
npm run dev 
\`\`\` 
 
The server will start on the specified port, and Swagger documentation will be available at \`http://localhost:[PORT]/api-docs\`. 
