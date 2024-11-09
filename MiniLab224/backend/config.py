#from pydantic import BaseSettings, PostgresDsn
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    VERSION: str = '0.1.0'
    CORS_ORIGINS: List[str] = ['*']
    PORT: int = 5000
    URL_PREFIX: str = '/api/v1'

    # НЕЛЬЗЯ ЗАПУШИТЬ ЭТОТ ИЛИ ДРУГИЕ ТОКЕНЫ НА ГИТХАБ. ДОБАВЬТЕ config.py в gitignore!
    GITHUB_API_TOKEN: str = "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"

    # OpenWeather API Key
    OPENWEATHER_API_KEY: str = "05398db4da5df13840f4a8260cfd1d02"

settings = Settings()
