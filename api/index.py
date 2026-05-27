from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from aiogram import Bot

import os
import dotenv

dotenv.load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN")
ADMIN_CHAT_ID = int(os.getenv("ADMIN_CHAT_ID"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # В ідеалі впиши сюди свій https://yourusername.github.io
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



bot = Bot(token=BOT_TOKEN)

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

@app.post("/api/send-message")
async def send_to_telegram(data: ContactForm):
    text = (
        "🔔 **Нове повідомлення з сайту!**\n\n"
        f"👤 **Ім'я:** {data.name}\n"
        f"📧 **Email:** {data.email}\n"
        f"💬 **Повідомлення:** {data.message}"
    )
    try:
        await bot.send_message(chat_id=ADMIN_CHAT_ID, text=text, parse_mode="Markdown")
        return {"status": "success", "message": "Повідомлення успішно надіслано"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Помилка ТГ: {str(e)}")

@app.on_event("shutdown")
async def shutdown():
    await bot.session.close()

