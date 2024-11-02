@echo off

REM Step 1: Create README.md file with content
echo # Meeting Room Booking System > README.md
echo. >> README.md
echo This project is a meeting room booking system with live deployment, built using TypeScript and ES6. It allows users to view available meeting rooms, book them for specific time slots, and prevents double bookings for the same time. Only admins can manage bookings and users, with secure JWT authentication. Swagger documentation is included for easy access to backend services. >> README.md
echo. >> README.md
echo ## Features >> README.md
echo - **Live Deployment**: Accessible with a live PostgreSQL database. >> README.md
echo - **Room Availability**: Displays all available meeting rooms and time slots. >> README.md
echo - **Flexible Booking**: Prevents overlapping bookings by time. >> README.md
echo - **JWT Authentication**: Allows only admin users to manage bookings and users. >> README.md
echo - **Swagger Integration**: Visible API documentation for backend services. >> README.md
echo. >> README.md
echo ## Installation >> README.md
echo. >> README.md
echo 1. Clone the repository: >> README.md
echo \`\`\`bash >> README.md
echo git clone https://github.com/your-username/meeting-room-booking.git >> README.md
echo \`\`\` >> README.md
echo. >> README.md
echo 2. Navigate to the project directory: >> README.md
echo \`\`\`bash >> README.md
echo cd meeting-room-booking >> README.md
echo \`\`\` >> README.md
echo. >> README.md
echo 3. Install dependencies: >> README.md
echo \`\`\`bash >> README.md
echo npm install >> README.md
echo \`\`\` >> README.md
echo. >> README.md
echo 4. Set up your environment variables by creating a \`.env\` file with database credentials, JWT secret, and Swagger URL. >> README.md
echo. >> README.md
echo ## Running the Project >> README.md
echo. >> README.md
echo To start the development server, run: >> README.md
echo \`\`\`bash >> README.md
echo npm run dev >> README.md
echo \`\`\` >> README.md
echo. >> README.md
echo The server will start on the specified port, and Swagger documentation will be available at \`http://localhost:[PORT]/api-docs\`. >> README.md

REM Step 2: Initialize Git (if not already initialized)
if not exist ".git" (
    git init
)

REM Step 3: Add README.md to Git
git add README.md

REM Step 4: Commit changes
git commit -m "Automated: Add README.md file"

REM Step 5: Add GitHub remote if not already added
git remote show origin > nul 2>&1
if errorlevel 1 (
    REM Replace <aman7100> and <Meeting-Room-Booking> with your details
    git remote add origin https://github.com/aman7100/Meeting-Room-Booking.git
)

REM Step 6: Push to GitHub
git push -u origin main
