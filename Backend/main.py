from fastapi import FastAPI

from routers.features import router as features
from fastapi.middleware.cors import CORSMiddleware

origins = [
"http://localhost",
"http://localhost:8080",
"http://localhost:3000",
"http://localhost:8000",
"http://0.0.0.0:10000",
"https://punt-partners-vishnu.onrender.com" ,
"https://punt-partners.onrender.com",
]

app = FastAPI()

app.add_middleware(
CORSMiddleware,
allow_origins=origins,
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)

app.include_router(features,prefix='',tags=['features'])

