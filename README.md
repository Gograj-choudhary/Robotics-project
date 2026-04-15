# Prompt Image Project

A full-stack web application that generates AI-powered images from text prompts using multiple state-of-the-art models.

## 🎯 Overview

This project combines a **React frontend** with an **Express.js backend** to create an intuitive interface for text-to-image generation. Users can input text prompts and select different optimization modes to generate high-quality images using Hugging Face's inference API.

## ✨ Features

- **Text-to-Image Generation**: Convert text prompts into AI-generated images
- **Multiple AI Models**: Supports FLUX.1-schnell, FLUX.1-dev, and Stable Diffusion 2 with automatic fallback
- **Prompt Optimization Modes**:
  - **Narrow**: High-quality, detailed, sharp focus, 4K, realistic
  - **Wide**: Cinematic, ultra-realistic, 4K lighting, environment-rich scenes
  - **Denoise**: Simplified prompts by removing common phrases
- **Fast Inference**: Optimized for quick image generation
- **Error Handling**: Graceful error messages and fallback mechanisms

## 📁 Project Structure

```
prompt-image-project/
├── backend/
│   ├── server.js                 # Express server entry point
│   ├── package.json              # Backend dependencies
│   ├── .env                       # Environment variables
│   ├── config/
│   │   └── config.js             # Configuration settings
│   ├── controllers/
│   │   └── generateController.js # Request handler
│   ├── routes/
│   │   └── generateRoutes.js     # API routes
│   └── services/
│       ├── imageService.js       # Hugging Face API integration
│       └── optimizer.js          # Prompt optimization
├── frontend/
│   ├── package.json              # Frontend dependencies
│   ├── .env                       # Environment variables
│   ├── index.html                # HTML entry point
│   └── src/
│       ├── main.jsx              # React DOM render
│       ├── App.jsx               # Main app component
│       ├── api/
│       │   └── api.js            # Axios API client
│       └── components/
│           ├── InputBox.jsx      # Prompt input field
│           ├── ModeSelector.jsx  # Mode selection dropdown
│           └── ImageDisplay.jsx  # Image preview component
└── README.md
```

## 🔧 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **@huggingface/inference** - AI model access
- **CORS** - Cross-origin request handling
- **axios** - HTTP client
- **dotenv** - Environment variable management

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **axios** - HTTP client
- **React DOM** - React rendering

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Hugging Face API token (free at [huggingface.co](https://huggingface.co))

## 🚀 Installation & Setup

### 1. Clone or Extract the Project
```bash
cd prompt-image-project
```

### 2. Backend Setup
```bash
cd backend
npm install
```

#### Configure Backend Environment
Create or update `.env` file with:
```env
HF_TOKEN=your_huggingface_token_here
PORT=3000
```

Get your free Hugging Face token from: https://huggingface.co/settings/tokens

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

#### Configure Frontend Environment
The `.env` file should contain:
```env
VITE_API_URL=http://localhost:3000/
```

## ▶️ Running the Application

### Start Backend Server
```bash
cd backend
npm start
```
Server will run on `http://localhost:3000`

### Start Frontend Development Server
In another terminal:
```bash
cd frontend
npm run dev
```
Frontend will typically run on `http://localhost:5173`

Open your browser and navigate to the frontend URL to use the app.

## 📡 API Endpoints

### Generate Image
- **Endpoint**: `POST /api/generate`
- **Request Body**:
  ```json
  {
    "prompt": "a beautiful sunset over the mountains"
  }
  ```
- **Response**: PNG image (binary data)
- **Status Codes**:
  - `200`: Success (image returned)
  - `400`: Missing prompt
  - `500`: Server error (all models failed)

## 🎨 How It Works

1. User enters a text prompt in the **InputBox**
2. User selects a prompt optimization mode using **ModeSelector**
3. User clicks "Generate" button
4. Frontend sends POST request to backend API with the prompt
5. Backend receives prompt and tries models in order:
   - FLUX.1-schnell (fastest)
   - FLUX.1-dev (higher quality)
   - Stable Diffusion 2 (fallback)
6. First successful model returns image as Blob
7. Frontend converts Blob to Object URL and displays in **ImageDisplay**
8. If all models fail, error message is shown

## 🛠️ File Descriptions

### Backend

| File | Purpose |
|------|---------|
| `server.js` | Express app initialization, middleware setup, route mounting |
| `config/config.js` | Port and configuration management |
| `controllers/generateController.js` | Handles POST requests, validates input, calls image service |
| `routes/generateRoutes.js` | Defines `/api/generate` route |
| `services/imageService.js` | Hugging Face API integration and model fallback logic |
| `services/optimizer.js` | Prompt text optimization based on selected mode |

### Frontend

| File | Purpose |
|------|---------|
| `main.jsx` | React DOM root rendering |
| `App.jsx` | Main component with state management (input, mode, image, loading, error) |
| `api/api.js` | Axios instance for API calls |
| `components/InputBox.jsx` | Input field component for prompt text |
| `components/ModeSelector.jsx` | Dropdown for "narrow", "wide", "denoise" modes |
| `components/ImageDisplay.jsx` | Displays generated image with fixed width |

## 🔄 Workflow

```
User Input (Prompt + Mode)
    ↓
Frontend InputBox + ModeSelector
    ↓
Click "Generate"
    ↓
axios.post() to /api/generate
    ↓
Backend Controller validates prompt
    ↓
Image Service tries models in order
    ↓
First successful model returns image
    ↓
Backend sends PNG image as response
    ↓
Frontend converts to Object URL
    ↓
ImageDisplay shows the image
```

## 🚨 Troubleshooting

### "Failed to generate image" Error
- **Cause**: All models are currently unavailable or API quota exceeded
- **Solution**: Check Hugging Face token validity and API status

### CORS Error in Browser Console
- **Cause**: Backend not running or wrong VITE_API_URL
- **Solution**: 
  - Ensure backend server is running on port 3000
  - Check frontend `.env` has correct `VITE_API_URL`

### Port 3000 Already in Use
- **Solution**: Change PORT in backend `.env` or kill existing process
  ```bash
  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  ```

### API Token Error
- **Cause**: Invalid or missing HF_TOKEN
- **Solution**: 
  - Create new token at https://huggingface.co/settings/tokens
  - Update backend `.env` with new token

## 📝 Environment Variables

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `HF_TOKEN` | Hugging Face API token (required) | `hf_xxxxx...` |
| `PORT` | Server port | `3000` |

### Frontend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3000/` |

## 🎓 Learning Points

- **Full-stack JavaScript**: React + Node.js/Express
- **API Integration**: Using Hugging Face Inference API
- **Error Handling**: Fallback mechanisms and graceful degradation
- **State Management**: React hooks (useState)
- **HTTP Requests**: Axios for API communication
- **CORS**: Handling cross-origin requests
- **Build Tools**: Vite for modern frontend development

## 🚀 Future Enhancements

- Add image save/download functionality
- Implement image history and favorites
- Add more prompt optimization modes
- Include loading progress indicators
- Add image metadata display (model used, generation time)
- Implement caching for repeated prompts
- Add user authentication
- Support batch image generation
- Add image editing/refinement options

## 📄 License

This project is provided as-is for educational and personal use.

## 🤝 Support

For issues or questions:
1. Check Hugging Face API status
2. Verify environment variables are correctly set
3. Ensure backend and frontend are running on correct ports
4. Check browser console and server logs for error details

---

**Happy image generating! 🎨**
