from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
import models
from routes import skills
from routes import auth
from routes import profile
from routes import projects
from routes import proposals
from routes import messages
from routes import reviews
from routes import client_profile
from routes import portfolio
from routes import notifications
# Create SQLite tables
Base.metadata.create_all(bind=engine)


app = FastAPI(title="Skillora API")


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
        "https://skillora-nu.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Home
@app.get("/")
def home():
    return {
        "message": "Skillora Backend is Running 🚀"
    }


# Test API
@app.get("/api/test")
def test():
    return {
        "success": True,
        "message": "SQLite Backend connected successfully!"
    }


# Auth routes
app.include_router(
    auth.router,
    prefix="/api/auth",
    tags=["Authentication"]
)
app.include_router(
    profile.router,
    prefix="/api/profile",
    tags=["Student Profile"]
)
app.include_router(
    skills.router,
    prefix="/api/skills",
    tags=["Student Skills"]
)
app.include_router(
    projects.router,
    prefix="/api/projects",
    tags=["Projects"]
)
app.include_router(
    proposals.router,
    prefix="/api/proposals",
    tags=["Proposals"]
)
app.include_router(
    messages.router,
    prefix="/api/messages",
    tags=["Messages"]
)
app.include_router(
    reviews.router,
    prefix="/api/reviews",
    tags=["Reviews"]
)
app.include_router(
    client_profile.router,
    prefix="/api/client-profile",
    tags=["Client Profile"]
)
app.include_router(
    portfolio.router,
    prefix="/api/portfolio",
    tags=["Portfolio"]
)
app.include_router(
    notifications.router,
    prefix="/api/notifications",
    tags=["Notifications"]
)